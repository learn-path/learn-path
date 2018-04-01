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
