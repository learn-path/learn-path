import React, { Component } from "react";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import UserListItem from "./UserListItem";
import SearchBar from "./Search/SearchBar";

class UserList extends Component {
  state = { filter: "" };

  handleSearch = data => {
    this.setState({ filter: data });
  };

  filter = users => {
    if (!this.state.filter) {
      return users;
    }
    return users.filter(
      user =>
        user.displayName
          .toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) >= 0 ||
        user.email.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0
    );
  };
  render() {
    const users = this.filter(this.props.users);
    const list = !isLoaded(users) ? (
      <div className="container">
        <span className="title text-center">Loading...</span>
      </div>
    ) : users && users.length ? (
      users.map(user => <UserListItem key={user.id} user={user} />)
    ) : (
      <li className="no-path-found">No user added yet</li>
    );
    return (
      <div className="container">
        <h2 className="title">Search results</h2>
        <SearchBar handleSearch={this.handleSearch} />
        <ul className="path-item-list">{list}</ul>
      </div>
    );
  }
}

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
