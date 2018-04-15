import React from "react";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PathCard from "./PathCard";

const MyPaths = ({ mypaths }) => {
  const list = !isLoaded(mypaths) ? (
    "Loading"
  ) : mypaths && mypaths.length ? (
    mypaths.map(path => <PathCard key={`myPath-${path.id}`} path={path} />)
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
    mypaths: firestore.ordered.paths
  })),
  firestoreConnect(props => {
    return [
      {
        collection: "paths",
        where: ["author", "==", props.auth.uid],
        limit: 10,
        orderBy: ["created", "desc"]
      }
    ];
  })
)(MyPaths);
