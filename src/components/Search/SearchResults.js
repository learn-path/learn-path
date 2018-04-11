import React from "react";
import { connectHits } from "react-instantsearch/connectors";
import SearchResultItem from "./SearchResultItem";

const SearchResults = connectHits(({ hits }) => {
  const list = hits.length ? (
    hits.map(path => <SearchResultItem key={path.objectID} path={path} />)
  ) : (
    <li className="no-path-found">No path found</li>
  );
  return (
    <div className="container">
      <h2 className="title">Search results</h2>
      <ul className="path-list">{list}</ul>
    </div>
  );
});

export default SearchResults;
