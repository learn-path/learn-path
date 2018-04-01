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
        path: `paths/${props.match.params.slurg}`
      } // create todo listener
    ];
  }),
  connect(({ firestore, firebase }, props) => {
    console.log(firestore);
    return {
      path: getVal(firestore, `data/paths/${props.match.params.slurg}`),
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
