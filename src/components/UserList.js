import React from "react";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import UserListItem from "./UserListItem";

const UserList = ({ users, toggleBlock }) => {
  const list = !isLoaded(users) ? (
    "Loading"
  ) : users && users.length ? (
    users.map(user => <UserListItem key={user.id} user={user} />)
  ) : (
    <li className="no-path-found">No user added yet</li>
  );
  return (
    <div className="container">
      <ul
        className="path-item-list"
        style={{ display: "flex", justifyContent: "left" }}
      >
        {list}
      </ul>
    </div>
  );
};

export default compose(
  connect(({ firebase: { auth }, firestore }) => ({
    auth,
    firestore,
    users: firestore.ordered.users
  })),
  firestoreConnect(props => {
    return [
      {
        collection: "users",
        orderBy: "email"
      }
    ];
  })
)(UserList);
