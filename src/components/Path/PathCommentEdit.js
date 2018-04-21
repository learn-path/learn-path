import React from "react";

const PathCommentEdit = ({ comment, handleChange, handleSave }) => {
  return (
    <div className="path-comment-form">
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
        className="btn btn-blue"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default PathCommentEdit;
