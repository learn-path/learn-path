import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import Path from "./Path.component";
import { withHandlers } from "recompose";

// Component enhancer that loads todo into redux then into the todo prop
export default compose(
  connect(({ firebase: { auth }, firestore }) => ({
    auth,
    firestore
  })),
  firestoreConnect(props => {
    const authedQueries =
      props.auth && props.auth.uid
        ? [
            {
              collection: "users",
              doc: props.auth.uid,
              subcollections: [
                {
                  collection: "subscribed_paths",
                  doc: props.match.params.slurg
                }
              ]
            },
            {
              collection: "users",
              doc: props.auth.uid,
              subcollections: [
                {
                  collection: "subscribed_paths",
                  doc: props.match.params.slurg,
                  subcollections: [{ collection: "items" }]
                }
              ]
            },
            `paths/${props.match.params.slurg}/ratings/${props.auth.uid}`
          ]
        : [];
    return [
      {
        collection: "paths",
        doc: props.match.params.slurg
      },
      {
        collection: "paths",
        doc: props.match.params.slurg,
        subcollections: [{ collection: "items" }]
      },
      ...authedQueries
    ];
  }),
  connect(({ firestore, firebase }, props) => {
    const authId = props.auth.uid;
    const docId = props.match.params.slurg;
    const rating = firestore.ordered[`paths_${docId}_ratings_${authId}`];
    return {
      path: getVal(firestore, `data/paths/${docId}`),
      items: firestore.ordered[`paths_${docId}_items`] || [],
      subscribed:
        firestore.ordered[`users_${authId}_subscribed_paths_${docId}`] || [],
      auth: firebase.auth,
      id: `${props.match.params.slurg}`,
      subscribed_items: getVal(
        firestore,
        `data/users/${authId}/subscribed_paths/${docId}/items`,
        {}
      ),
      my_ratings: rating && rating[0] ? rating : false
    };
  }),
  withHandlers({
    togglePrivate: ({ firestore, path, id }) => () => {
      firestore.update(
        { collection: "paths", doc: id },
        { private: !path.private }
      );
    },
    toggleDone: ({ firestore, id, auth }) => (itemId, done) => {
      firestore.set(
        `users/${auth.uid}/subscribed_paths/${id}/items/${itemId}`,
        { done: done },
        { merge: true }
      );
    },
    setRating: ({ firestore, path, id, auth }) => rate => {
      firestore.set(`paths/${id}/ratings/${auth.uid}`, { rating: rate });
    }
  })
)(Path);
