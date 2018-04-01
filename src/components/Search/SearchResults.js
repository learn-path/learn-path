import React from "react";
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";

const SearchResults = ({ searchResults }) => {
  const list = !isLoaded(searchResults) ? (
    "Loading"
  ) : searchResults && searchResults.length ? (
    searchResults.map(path => (
      <li className="card path-card path-card-row" key={path.id}>
        <Link to={`/learn/${path.id}`}>
          <span className="card-image"></span>
          <div className="card-body">
            <h3>{path.title}</h3>
            <p className="rate"><span className="icon-star"></span>0.0</p>
            <p className="level">{path.level}</p>
          </div>
        </Link>
      </li>
    ))
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
