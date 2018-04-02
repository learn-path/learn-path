import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./reducers";
import { reactReduxFirebase } from "react-redux-firebase";
import { reduxFirestore } from "redux-firestore";
import firebase from "firebase";
import "firebase/firestore";

export const history = createHistory();

const firebaseConfig = {
  apiKey: "AIzaSyBN2Pj8ficQ1CSJ0FTOBWVTbbPEH-luJCQ",
  authDomain: "learnpath-35e60.firebaseapp.com",
  databaseURL: "https://learnpath-35e60.firebaseio.com",
  projectId: "learnpath-35e60",
  storageBucket: "learnpath-35e60.appspot.com",
  messagingSenderId: "153253405177"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
