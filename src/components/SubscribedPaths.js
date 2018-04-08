import React from "react";
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const SubscribedPaths = ({ subscribedpaths }) => {
  const list = !isLoaded(subscribedpaths) ? (
    "Loading"
  ) : subscribedpaths && subscribedpaths.length ? (
    subscribedpaths.map(path => (
      <li
        className="card path-card path-card-row"
        style={{ display: "flex", justifyContent: "space-between" }}
        key={path.id}
      >
        <Link to={`/learn/${path.id}`}>
          <span className="card-image" />
          <div className="card-body">
            <h3>{path.title}</h3>
            <p className="rate">
              <span className="icon-star" />0.0
            </p>
            <p className="level">{path.level}</p>
          </div>
        </Link>
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
