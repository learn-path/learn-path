import React from "react";
import { Link } from "react-router-dom";

const PathSlider = ({ paths, title }) => {
  let p = paths ? paths : [];
  return (
    <div className="path-slider">
      <span className="title">{title}</span>
      <div className="path-slider-wrapper">
        {p.map(item => (
          <div key={`p-i-${item.id}`}>
            <span>
              <Link to={`/learn/${item.id}`}>{item.title}</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathSlider;
