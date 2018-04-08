import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

const enhance = compose(
  firestoreConnect(props => {
    return [
      {
        collection: "paths",
        doc: props.pathToLoad.id,
        storeAs: "loadedPath"
      }
    ];
  }),
  connect(({ firebase: { auth }, firestore, props }) => {
    return {
      auth,
      firestore,
      loadedPath: firestore.data.loadedPath
    };
  })
);

const SubscribedPathItem = ({ loadedPath, toggleBlock }) => {
  const path = loadedPath ? loadedPath : {};
  return (
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
  );
};

export default enhance(SubscribedPathItem);
