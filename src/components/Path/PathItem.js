import React from "react";

const PathItem = ({ item }) => {
  return (
    <li className="card path-item">
      <a href={item.url} target="_blank" className="path-item-link">
        {item.title}
      </a>
    </li>
  );
};

export default PathItem;
