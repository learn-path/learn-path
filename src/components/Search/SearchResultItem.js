import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";
import ToggleButton from "react-toggle-button";

const enhance = compose(
  withFirestore, // firestoreConnect can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    toggleBlock: ({ firestore, path }) => () =>
      firestore.update(
        { collection: "paths", doc: path.id },
        { blocked: !path.blocked }
      )
  })
);

const SearchResultItem = ({ toggleBlock, path, auth }) => (
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
    <div style={{ padding: 20 }}>
      <span>Blocked</span>
      {auth.isEmpty ? (
        ""
      ) : (
        <ToggleButton value={path.blocked} onToggle={toggleBlock} />
      )}
    </div>
  </li>
);

export default enhance(SearchResultItem);
