import React from "react";
import { Link } from "react-router-dom";
import PathRating from "./Path/PathRating";

const PathCard = ({ path, id, extra }) => {
  id = id || path.id;
  return (
    <li
      className="card path-card path-card-row"
      style={{ display: "flex", justifyContent: "space-between" }}
      key={`path-card-${id}`}
    >
      <Link to={`/learn/${id}`}>
        <span className="card-image" />
        <div className="card-body">
          <h3>{path.title}</h3>
          <PathRating publicRating={path.avgRating} isReadOnly={true} />
          <p className="level">{path.level}</p>
        </div>
      </Link>
      {extra}
    </li>
  );
};

export default PathCard;
