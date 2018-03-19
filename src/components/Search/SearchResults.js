import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ paths }) => {
  const list =
    paths && paths.length ? (
      paths.map(path => (
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
