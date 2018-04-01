import React from "react";
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const MyPaths = ({ mypaths }) => {
  const list = !isLoaded(mypaths) ? (
    "Loading"
  ) : mypaths && mypaths.length ? (
    mypaths.map(path => (
      <li className="search-result-item" key={path.id}>
        <Link to={`/learn/${path.id}`}>{path.title}</Link>
      </li>
    ))
  ) : (
    <li className="no-path-found">No path added yet</li>
  );
  return (
    <div className="container">
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
