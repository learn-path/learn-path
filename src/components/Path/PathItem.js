import React from "react";

const PathItem = ({ item }) => {
  return (
    <li>
      <span>{item.title}</span>
      <p>{item.short_desc}</p>
      <a href={item.url} target="_blank" className="btn btn-4">
        LEARN
      </a>
    </li>
  );
};

export default PathItem;
