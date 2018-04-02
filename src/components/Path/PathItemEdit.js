import React from "react";

const PathItemEdit = ({ item, handleChange, handleSave }) => {
  return (
    <div className="card path-item">
      <div>
        <span style={{ display: "inline-block", minWidth: 100 }}>Title</span>
        <input
          name="itemTitle"
          defaultValue={item && item.title ? item.title : ""}
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
          name="itemDesc"
          defaultValue={item && item.short_desc ? item.short_desc : ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <span style={{ display: "inline-block", minWidth: 100 }}>URL</span>
        <input
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
