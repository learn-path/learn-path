import React from "react";
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";

const SearchResults = ({ searchResults }) => {
  const list = !isLoaded(searchResults) ? (
    "Loading"
  ) : searchResults && searchResults.length ? (
    searchResults.map(path => (
      <li className="search-result-item" key={path.id}>
        <Link to={`/learn/${path.id}`}>{path.title}</Link>
      </li>
    ))
  ) : (
    <li className="no-path-found">No path found</li>
  );
  return (
    <div className="container">
      <ul className="path-item-list">{list}</ul>
    </div>
  );
};

export default SearchResults;
