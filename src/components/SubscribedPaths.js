import React from "react";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import SubscribedPathsItem from "./SubscribedPathsItem";

const SubscribedPaths = ({ subscribedpaths }) => {
  const list = !isLoaded(subscribedpaths) ? (
    <div className="container"><span className="title text-center">Loading...</span></div>
  ) : subscribedpaths && subscribedpaths.length ? (
    subscribedpaths.map(path => (
      <SubscribedPathsItem key={path.id} pathToLoad={path} />
    ))
  ) : (
    <li className="no-path-found">No path added yet</li>
  );
  return (
    <div>
      <ul className="path-item-list">{list}</ul>
    </div>
  );
};

export default compose(
  connect(({ firebase: { auth }, firestore }) => ({
    auth,
    firestore,
    subscribedpaths: firestore.ordered.subscribedPaths
  })),
  firestoreConnect(props => {
    if (!props.auth.uid) {
      return [];
    }
    return [
      {
        collection: "users",
        doc: props.auth.uid,
        subcollections: [{ collection: "subscribed_paths" }],
        limit: 10,
        orderBy: ["on", "desc"],
        storeAs: "subscribedPaths"
      }
    ];
  })
)(SubscribedPaths);
