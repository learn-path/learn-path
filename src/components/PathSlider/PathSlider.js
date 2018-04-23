import React from "react";
import { Link } from "react-router-dom";

const PathSlider = ({ newPaths, title }) => {
  let p = newPaths ? newPaths : [];
  return (
    <div className="path-slider">
      <h2 className="title">{title}</h2>
      <div className="path-slider-wrapper">
        {p.map(item => (
          <div className="card card-col card-path" key={`p-i-${item.id}`}>
            <Link to={`/learn/${item.id}`}>
              <span className="card-image"></span>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="rate"><span className="icon-star"></span>0.0</p>
                <p className="level">{item.level}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathSlider;
