import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import Path from "./Path.component";

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
 connect(({ firestore }, props) => {
   return {
     path: getVal(firestore, `data/paths/${props.match.params.slurg}`)
   };
 })
)(Path);