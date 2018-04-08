import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";
import ToggleButton from "react-toggle-button";

const enhance = compose(
  withFirestore, // firestoreConnect can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    toggleBlock: ({ firestore, user }) => () =>
      firestore.update(
        { collection: "users", doc: user.id },
        { blocked: !user.blocked }
      )
  })
);

const UserListItem = ({ user, toggleBlock }) => (
  <li
    className="card path-card path-card-row"
    style={{ display: "flex", justifyContent: "space-between" }}
    key={user.id}
  >
    <div>
      <img
        alt="Profile"
        src={user.photoURL}
        className="card-image"
      />
    </div>
    <div className="card-body">
      <h3 style={{ marginBottom: "5px"}}>{user.displayName}</h3>
      <p>{user.short_desc}</p>
      <div className="blocked-box">
        <span>Blocked:</span>
        <ToggleButton value={user.blocked} onToggle={toggleBlock}  className="blocked-toggle" />
      </div>
    </div>
  </li>
);

export default enhance(UserListItem);
