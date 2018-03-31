import React from "react";

const PathItem = ({ item }) => {
  return (
    <li className="card path-item">
      <a href={item.url} target="_blank" className="">
        {item.title}
      </a>
    </li>
  );
};

export default PathItem;
