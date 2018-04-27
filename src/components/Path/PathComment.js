import React, { Component } from "react";
import PathCommentEdit from "./PathCommentEdit";
import { withFirebase } from "react-redux-firebase";

class PathComment extends Component {
  state = { edit: false };

  setEdit = () => {
    this.setState({ edit: true });
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    });
  };

  handleSave = () => {
    let data = [["userName", "user_name"], ["content", "content"]].reduce(
      (data, current) => {
        if (this.state[current[0]]) data[current[1]] = this.state[current[0]];
        return data;
      },
      {}
    );
    data.created = this.props.firebase.firestore.FieldValue.serverTimestamp();
    if (Object.keys(data).length === 0) {
      this.setState({
        edit: false
      });
      return;
    }
    this.props.firebase
      .firestore()
      .collection("paths")
      .doc(this.props.pathId)
      .collection("comments")
      .doc(this.props.comment.id)
      .update(data);
    this.setState({
      userName: undefined,
      content: undefined,
      edit: false
    });
  };

  render() {
    const { comment } = this.props;
    const the_date = comment.created ? (
      <span className="comment-date">
        Posted on{" "}
        <span className="the-date">{comment.created.toLocaleString()}</span>
      </span>
    ) : (
      ""
    );
    if (this.state.edit) {
      return (
        <PathCommentEdit
          comment={comment}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
        />
      );
    }
    return (
      <li>
        <span className="user-name">{comment.user_name}</span>
        <p>{comment.content}</p>
        {the_date}
      </li>
    );
  }
}

export default withFirebase(PathComment);
