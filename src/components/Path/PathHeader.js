import React from "react";
import IconProfile from "../../img/profile.svg";

const PathHeader = ({ path, editMode, setEdit }) => (
  <div className="header">
    <div className="container">
      <div className="path-title">
        <div className="path-image" />
        <span>{path.title}</span>
      </div>
      <div className="path-info">
        <div className="ratings">
          <span className="count">18 ratings</span>
          <span className="rate">
            <span className="icon-star" />4.9
          </span>
        </div>
        <span className="subscribers">120,600</span>
        <span className="level">{path.level}</span>
      </div>
      <div className="user-profile">
        <span className="user-profile-image">
          <img src={IconProfile} alt="Profile" />
        </span>
        <div className="user-profile-body">
          <h3>Jonh Doe</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ultricies...
          </p>
        </div>
      </div>
      <button className="btn btn-blue btn-large btn-subscribe">
        Subscribe
      </button>
    </div>
  </div>
);

export default PathHeader;
