import React, { Component } from 'react';
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
        let data = [
          ["userName", "user_name"],
          ["content", "content"]
        ].reduce((data, current) => {
          if (this.state[current[0]]) data[current[1]] = this.state[current[0]];
          return data;
        }, {});
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
      

    render () {
        const { isCommentAuthor, comment } = this.props;

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
                <p>{comment.userName}</p>
                <p>{comment.content}</p>
                <div>
                  <button onClick={this.setEdit} className="btn comment-command">
                    Edit
                  </button>
                </div>
            </li>
        );
    }
}

export default withFirebase(PathComment);