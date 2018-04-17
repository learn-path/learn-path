import React from "react";

const PathCommentEdit = ({ comment, handleChange, handleSave }) => {
  return (
    <div className="card path-item path-item-form">
      <div className="form-box">        
        <label>Name</label>
        <input
          className="form-control"
          name="userName"
          defaultValue={comment && comment.user_name ? comment.user_name : ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-box">
        <label>Comment</label>
        <textarea
          className="form-control"
          name="content"
          defaultValue={comment && comment.content ? comment.content : ""}
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

export default PathCommentEdit;
