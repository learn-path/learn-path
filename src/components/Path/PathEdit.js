import React from "react";

const PathEdit = ({ path, handleSave, handleChange }) => (
  <div className="header">
    <div className="container">
      <div className="path-title">
        <div className="path-image" style={{ marginRight: 20 }} />
        <div>
          <span style={{ display: "inline-block", minWidth: 100 }}>Title</span>
          <input
            name="pathTitle"
            defaultValue={path.title}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <span
            style={{
              display: "inline-block",
              minWidth: 100,
              verticalAlign: "top"
            }}
          >
            Description
          </span>
          <textarea
            name="pathDesc"
            defaultValue={path.short_desc}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <span
            style={{
              display: "inline-block",
              minWidth: 100,
              verticalAlign: "top"
            }}
          >
            Level
          </span>
          <select
            name="pathLevel"
            defaultValue={path.level}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      <button
        className="btn btn-blue btn-large btn-subscribe"
        onClick={handleSave}
      >
        SAVE
      </button>
    </div>
  </div>
);

export default PathEdit;
