"use strict";

const functions = require("firebase-functions");

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
