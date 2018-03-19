import React from "react";

const PathItem = ({ item }) => {
  return (
    <li className="path-item">
      <a href={item.url} target="_blank" className="btn btn-4">
        {item.title}
      </a>
    </li>
  );
};

export default PathItem;
