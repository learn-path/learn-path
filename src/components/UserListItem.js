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
    className="card"
    style={{
      display: "flex",
      flexDirection: "column",
      padding: 10,
      margin: 10
    }}
    key={user.id}
  >
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 80,
        height: 80,
        borderRadius: "50%",
        overflow: "hidden",
        userSelect: "none",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <img
        alt="LOGOUT"
        src={user.photoURL}
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          objectFit: "cover"
        }}
      />
    </div>
    <span>{user.displayName}</span>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <span>Blocked</span>
      <ToggleButton value={user.blocked} onToggle={toggleBlock} />
    </div>
  </li>
);

export default enhance(UserListItem);
