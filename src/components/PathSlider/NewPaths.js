import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PathSlider from "./PathSlider";

// Component enhancer that loads todo into redux then into the todo prop
export default compose(
  firestoreConnect(props => {
    // Set listeners based on props (prop is route parameter from react-router in this case)
    return [
      {
        collection: "paths",
        where: ["private", "==", false],
        limit: 10,
        orderBy: ["created", "desc"]
      }
    ];
  }),
  connect(({ firestore }, props) => {
    return {
      newPaths: firestore.ordered.paths
    };
  })
)(PathSlider);
