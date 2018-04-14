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
              ],
              storeAs: "subscribed"
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
              ],
              storeAs: "subscribed_items"
            }
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
        subcollections: [{ collection: "items" }],
        storeAs: "items"
      },
      ...authedQueries
    ];
  }),
  connect(({ firestore, firebase }, props) => {
    return {
      path: getVal(firestore, `data/paths/${props.match.params.slurg}`),
      items: firestore.ordered.items,
      subscribed: firestore.ordered.subscribed,
      auth: firebase.auth,
      id: `${props.match.params.slurg}`,
      subscribed_items: firestore.data.subscribed_items
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
    setRating: ({ firestore, path, id }) => rate => {
      firestore.update({ collection: "paths", doc: id }, { rating: rate });
    }
  })
)(Path);
