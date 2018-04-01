import React from "react";
import { isLoaded } from "react-redux-firebase";
import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ searchResults }) => {
  const list = !isLoaded(searchResults) ? (
    "Loading"
  ) : searchResults && searchResults.length ? (
    searchResults.map(path => <SearchResultItem key={path.id} path={path} />)
  ) : (
    <li className="no-path-found">No path found</li>
  );
  return (
    <div className="container">
      <h2 className="title">Search results</h2>
      <ul className="path-list">{list}</ul>
    </div>
  );
};

export default SearchResults;
