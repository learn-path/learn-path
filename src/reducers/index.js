import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { algoliaReducer } from "./algolia";

export default combineReducers({
  routing: routerReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  algolia: algoliaReducer
});
