import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import Path from "./Path.component";
import { withHandlers } from "recompose";

// Component enhancer that loads todo into redux then into the todo prop
export default compose(
  firestoreConnect(props => {
    // Set listeners based on props (prop is route parameter from react-router in this case)
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
      }
    ];
  }),
  connect(({ firestore, firebase }, props) => {
    return {
      path: getVal(firestore, `data/paths/${props.match.params.slurg}`),
      items: firestore.ordered.items,
      auth: firebase.auth,
      id: `${props.match.params.slurg}`
    };
  }),
  withHandlers({
    togglePrivate: ({ firestore, path, id }) => () => {
      firestore.update(
        { collection: "paths", doc: id },
        { private: !path.private }
      );
    }
  })
)(Path);
