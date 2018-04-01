import React from "react";
import PathItem from "./PathItem";
import "normalize.css";
import IconProfile from "../../img/profile.svg";

const Path = ({ path }) => {
  let p = path ? path : { items: [] };
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
              <span className="rate"><span className="icon-star"></span>4.9</span>
            </div>
            <span className="subscribers">120,600</span>
            <span className="level">{p.level}</span>
          </div>
          <div className="user-profile">
            <span className="user-profile-image">
              <img src={IconProfile} alt="Profile" />
            </span>
            <div className="user-profile-body">
              <h3>Jonh Doe</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies...</p>
            </div>
          </div>
          <button className="btn btn-blue btn-large btn-subscribe">Subscribe</button>
        </div>
      </div>
      <div className="details">
        <div className="container">
          <h2 className="title">Start your journey</h2>
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
