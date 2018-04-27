"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = functions.config().algolia.path_index_name;

const algoliasearch = require("algoliasearch");
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// Update the search index every time a path is written.
exports.onPathChange = functions.firestore
  .document("paths/{pathId}")
  .onWrite((change, context) => {
    const path = change.after.exists ? change.after.data() : null;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    if (!path) {
      console.log(`deleting path ${context.params.pathId} from search index`);
      return index.deleteObject(context.params.pathId);
    }

    // Add an 'objectID' field which Algolia requires
    path.objectID = context.params.pathId;
    console.log(`updating path ${path.objectID} in search index`);
    return index.saveObject(path);
  });

exports.aggregateRatingsOnCreate = functions.firestore
  .document("paths/{pathId}/ratings/{ratingId}")
  .onCreate((event, context) => {
    // Get value of the newly added rating
    const newData = event.data();
    var ratingVal = newData.rating;

    let firestore = admin.firestore();

    // Get a reference to the path
    var pathRef = firestore.collection("paths").doc(context.params.pathId);

    // Update aggregations in a transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(pathRef).then(pathDoc => {
        // Compute new number of ratings
        let newDocData = pathDoc.data();
        let newNumRatings = (newDocData.numRatings || 0) + 1;

        // Compute new average rating
        let oldRatingTotal = newDocData.avgRating * newDocData.numRatings;
        oldRatingTotal = oldRatingTotal || 0;
        let newAvgRating = (oldRatingTotal + ratingVal) / newNumRatings;
        if (newAvgRating > 5) {
          newAvgRating = 5;
        }
        if (newAvgRating < 0) {
          newAvgRating = 0;
        }
        // Update paths info
        return transaction.update(pathRef, {
          avgRating: newAvgRating,
          numRatings: newNumRatings
        });
      });
    });
  });

exports.aggregateRatingsOnUpdate = functions.firestore
  .document("paths/{pathId}/ratings/{ratingId}")
  .onUpdate((change, context) => {
    // Get value of the newly added rating
    const newData = change.after.data();
    const oldData = change.before.data();

    var ratingVal = newData.rating;
    const previousValue = oldData.rating;

    console.log(`UPDATE RATING ${previousValue} to ${ratingVal}`);

    let firestore = admin.firestore();

    // Get a reference to the path
    var pathRef = firestore.collection("paths").doc(context.params.pathId);

    // Update aggregations in a transaction
    return firestore.runTransaction(transaction => {
      return transaction.get(pathRef).then(pathDoc => {
        // Compute new number of ratings
        let newDocData = pathDoc.data();
        let newNumRatings = newDocData.rating || 1;
        // Compute new average rating
        let oldRatingTotal = newDocData.avgRating * newDocData.numRatings;
        oldRatingTotal = oldRatingTotal || 0;
        oldRatingTotal -= previousValue;
        let newAvgRating = ((oldRatingTotal || 0) + ratingVal) / newNumRatings;
        if (newAvgRating > 5) {
          newAvgRating = 5;
        }
        if (newAvgRating < 0) {
          newAvgRating = 0;
        }
        console.log({
          avgRating: newAvgRating,
          numRatings: newNumRatings
        });
        // Update paths info
        return transaction.update(pathRef, {
          avgRating: newAvgRating,
          numRatings: newNumRatings
        });
      });
    });
  });

// [START get_firebase_user]
function getFirebaseUser(req, res, next) {
  console.log("Check if request is authorized with Firebase ID token");

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>"
    );
    return res.sendStatus(403);
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log("Found 'Authorization' header");
    idToken = req.headers.authorization.split("Bearer ")[1];
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log("ID Token correctly decoded", decodedIdToken);
      req.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      console.error("Error while verifying Firebase ID token:", error);
      return res.status(403).send("Unauthorized");
    });
}
// [END get_firebase_user]

// [START get_algolia_user_token]
// This complex HTTP function will be created as an ExpressJS app:
// https://expressjs.com/en/4x/api.html
const app = require("express")();

// We'll enable CORS support to allow the function to be invoked
// from our app client-side.
app.use(require("cors")({ origin: true }));

// Then we'll also use a special 'getFirebaseUser' middleware which
// verifies the Authorization header and adds a `user` field to the
// incoming request:
// https://gist.github.com/abehaskins/832d6f8665454d0cd99ef08c229afb42
app.use(getFirebaseUser);

// Add a route handler to the app to generate the secured key
app.get("/", (req, res) => {
  // Create the params object as described in the Algolia documentation:
  // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
  const params = {
    // This filter ensures that only documents where author == user_id will be readable
    filters: `private:false OR author:${req.user.user_id}`,
    // We also proxy the user_id as a unique token for this key.
    userToken: req.user.user_id
  };

  // Call the Algolia API to generate a unique key based on our search key
  const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);

  // Then return this key as {key: '...key'}
  res.json({ key });
});

// Finally, pass our ExpressJS app to Cloud Functions as a function
// called 'getSearchKey';
exports.getSearchKey = functions.https.onRequest(app);
// [END get_algolia_user_token]
