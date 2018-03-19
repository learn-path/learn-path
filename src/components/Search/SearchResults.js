import React from "react";

const SearchResults = ({ paths }) => {
  const list =
    paths && paths.length ? (
      paths.map(path => (
        <li className="search-result-item" key={path.id}>
          {path.title}
        </li>
      ))
    ) : (
      <li className="no-path-found">No path found</li>
    );
  return <ul>{list}</ul>;
};

export default SearchResults;
