import React from "react";
import { isLoaded } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import UserResultItem from "./UserResultItem";
import UserSearch from "./UserSearch";
import qs from "qs";

const removeEmptyStrings = obj => {
  let newObj = {};
  let count = 0;
  Object.keys(obj).forEach(prop => {
    if (obj[prop] !== "") {
      count++;
      newObj[prop] = obj[prop];
    }
  });
  return count > 0 ? newObj : null;
};

const createURL = (state, facets) => {
  let newQuery = {};
  if (state.query) {
    newQuery.query = state.query;
  }
  if (state.page > 1) {
    newQuery.page = state.page;
  }
  if (state.refinementList) {
    let newRef = removeEmptyStrings(state.refinementList);
    if (newRef) {
      newQuery.refinementList = newRef;
    }
  }
  return `?${qs.stringify(newQuery)}`;
};

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";
const urlToSearchState = location => qs.parse(location.search.slice(1));


const UserResult = ({ users, toggleBlock }) => {
  const list = !isLoaded(users) ? (
    <div className="container"><span className="title text-center">Loading...</span></div>
  ) : users && users.length ? (
    users.map(user => <UserResultItem key={user.id} user={user} />)
  ) : (
    <li className="no-path-found">No user added yet</li>
  );
  return (
    <div className="container">
      <h2 className="title">Search results</h2>
      <UserSearch/>
      <ul className="path-item-list">
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
)(UserResult);
