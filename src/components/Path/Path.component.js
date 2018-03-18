import React from "react";
import PathItem from "./PathItem";

const Path = ({ path, firestore, firebase }) => {
  let p = path ? path : { items: [] };
  return (
    <div className="path">
      <div className="header">
        <span>{p.title}</span>
        <p>{p.short_desc}</p>
        <span>{p.level}</span>
      </div>
      <ul>
        {p.items.map((item, index) => (
          <PathItem key={`p-item-${index}`} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Path;
