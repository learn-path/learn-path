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
   ,
   toggleCertify: ({ firestore, user }) => () =>
      firestore.update(
        { collection: "users", doc: user.id },
        { certified: !user.certified }
      )    
     
  })
)

const UserListItem = ({ user, toggleBlock, toggleCertify }) => (
  <li
    className="card card-row card-user"
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
      <div className="toggles">
        <div className="blocked-box">
          <span>Blocked:</span>
          <ToggleButton value={user.blocked} onToggle={toggleBlock}  className="blocked-toggle" />
        </div>
        <div className="certified-box">
          <span>Certified:</span>
          <ToggleButton value={user.certified} onToggle={toggleCertify}  className="certified-toggle" />
        </div>
      </div>
    </div>
  </li>
);

export default enhance(UserListItem);
