import React from "react";

const PathEdit = ({ path, handleSave }) => (
  <div className="header">
    <div className="container">
      <div className="path-title">
        <div className="path-image" />
        <input defaultValue={path.title} />
      </div>
      <textarea defaultValue={path.short_desc} />
      <button className="btn-subscribe" onClick={handleSave}>
        SAVE
      </button>
    </div>
  </div>
);

export default PathEdit;
