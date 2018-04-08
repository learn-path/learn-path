import React from "react";

const PathItemEdit = ({ item, handleChange, handleSave }) => {
  return (
    <div className="card path-item path-item-form">
      <div className="form-box">        
        <label>Title</label>
        <input
          className="form-control"
          name="itemTitle"
          defaultValue={item && item.title ? item.title : ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Description</label>
        <textarea
          className="form-control"
          name="itemDesc"
          defaultValue={item && item.short_desc ? item.short_desc : ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>URL</label>
        <input
          className="form-control"
          name="itemUrl"
          defaultValue={item && item.url ? item.url : ""}
          onChange={handleChange}
        />
      </div>
      <button
        className="btn btn-blue btn-large btn-subscribe"
        onClick={handleSave}
      >
        SAVE
      </button>
    </div>
  );
};

export default PathItemEdit;
