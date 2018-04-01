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
  <li className="search-result-item">
    <Link to={`/learn/${path.id}`}>{path.title}</Link>
    {auth.isEmpty ? (
      ""
    ) : (
      <ToggleButton value={!path.blocked} onToggle={toggleBlock} />
    )}
  </li>
);

export default enhance(SearchResultItem);
