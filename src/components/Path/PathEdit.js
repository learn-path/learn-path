import React from "react";

const PathEdit = ({ path, handleSave, handleChange }) => (
  <div className="header">
    <div className="container">
      <div className="form-box">
        <label>Featured image</label>
        <div className="path-image" />
      </div>
      <div className="form-box">
        <label>Title</label>
        <input
          className="form-control"
          name="pathTitle"
          defaultValue={path.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Description</label>
        <textarea
          className="form-control"
          name="pathDesc"
          defaultValue={path.short_desc}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Level</label>
        <select
          className="form-control"
          name="pathLevel"
          defaultValue={path.level}
          onChange={handleChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <button
        className="btn btn-blue"
        onClick={handleSave}
      >
        SAVE
      </button>
    </div>
  </div>
);

export default PathEdit;
