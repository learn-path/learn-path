import React from "react";
import PathItem from "./PathItem";
import "normalize.css";

const Path = ({ path }) => {
  let p = path ? path : { items: [] };
  if (p && p.blocked)
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>
        This path is blocked
      </h2>
    );
  return (
    <div className="path">
      <div className="header">
        <div className="container">
          <div className="path-title">
            <div className="path-image" />
            <span>{p.title}</span>
          </div>
          <div className="path-info">
            <div className="ratings">
              <span className="count">18 ratings</span>
              <span className="rate">4.9</span>
            </div>
            <span className="subscribers">120,600</span>
            <span className="level">{p.level}</span>
          </div>
          <div className="user-profile">
            <div className="user-image" />
            <span>Jonh Doe</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ultricies...
            </p>
          </div>
          <button className="btn-subscribe">Subscribe</button>
        </div>
      </div>
      <div className="details">
        <div className="container">
          <span>Start your journey</span>
          <ul className="path-item-list">
            {p.items.map((item, index) => (
              <PathItem key={`p-item-${index}`} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Path;
