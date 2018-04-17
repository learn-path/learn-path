import React, { Component } from "react";
import PathItem from "./PathItem";
import PathComment from "./PathComment";
import "normalize.css";
import PathHeader from "./PathHeader";
import PathEdit from "./PathEdit";
import PathItemEdit from "./PathItemEdit";
import PathCommentEdit from "./PathCommentEdit";
import { isLoaded } from "react-redux-firebase";

class Path extends Component {
  state = {};

  setEdit = key => () => {
    this.setState({ [key]: true });
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    });
  };

  handlePathSave = () => {
    let data = [
      ["pathTitle", "title"],
      ["pathDesc", "short_desc"],
      ["pathLevel", "level"]
    ].reduce((data, current) => {
      if (this.state[current[0]]) data[current[1]] = this.state[current[0]];
      return data;
    }, {});
    if (Object.keys(data).length === 0) {
      this.setState({
        path: false
      });
      return;
    }
    this.props.firebase
      .firestore()
      .collection("paths")
      .doc(this.props.id)
      .update(data);
    this.setState({
      pathTitle: undefined,
      pathDesc: undefined,
      pathLevel: undefined,
      path: false
    });
  };

  handleItemSave = () => {
    let data = [
      ["itemTitle", "title"],
      ["itemDesc", "short_desc"],
      ["itemUrl", "url"]
    ].reduce((data, current) => {
      if (this.state[current[0]]) data[current[1]] = this.state[current[0]];
      return data;
    }, {});
    if (Object.keys(data).length === 0) {
      this.setState({
        newItem: false
      });
      return;
    }
    this.props.firebase
      .firestore()
      .collection("paths")
      .doc(this.props.id)
      .collection("items")
      .add(data);
    this.setState({
      itemTitle: undefined,
      itemDesc: undefined,
      itemUrl: undefined,
      newItem: false
    });
  };

  handleCommentSave = () => {
    let data = [
      ["userName", "user_name"],
      ["content", "content"]
    ].reduce((data, current) => {
      if (this.state[current[0]]) data[current[1]] = this.state[current[0]];
      return data;
    }, {});
    if (Object.keys(data).length === 0) {
      this.setState({
        newComment: false
      });
      return;
    }
    this.props.firebase
      .firestore()
      .collection("paths")
      .doc(this.props.id)
      .collection("comments")
      .add(data);
    this.setState({
      userName: undefined,
      content: undefined,
      newComment: false
    });
  };

  handleSubscribe = () => {
    if (this.props.subscribed && this.props.subscribed.length) {
      this.props.firebase
        .firestore()
        .collection("users")
        .doc(this.props.auth.uid)
        .collection("subscribed_paths")
        .doc(this.props.id)
        .delete();
    } else {
      this.props.firebase
        .firestore()
        .collection("users")
        .doc(this.props.auth.uid)
        .collection("subscribed_paths")
        .doc(this.props.id)
        .set({
          on: new Date()
        });
    }
  };

  render() {
    const { auth, path } = this.props;
    if (!isLoaded("paths")) return <span>Loading</span>;
    if (!path) {
      return "";
    }
    let p = path ? path : { items: [] };
    let items = this.props.items ? this.props.items : [];
    let comments = this.props.comments ? this.props.comments : [];
    const hasPrivilege = auth && !auth.isEmpty && path.author === auth.uid;
    const subscribed_items = this.props.subscribed_items || {};
    const isSubscribed =
      this.props.subscribed && this.props.subscribed.length > 0;
    const isCommentAuthor =
      this.props.commentAuthor && this.props.commentAuthor.length > 0;
    if (p && p.blocked && !hasPrivilege)
      return (
        <h2 style={{ color: "red", textAlign: "center" }}>
          This path is blocked
        </h2>
      );
    return (
      <div className="path">
        {this.state.path ? (
          <PathEdit
            path={p}
            handleChange={this.handleChange}
            handleSave={this.handlePathSave}
          />
        ) : (
          <PathHeader
            path={p}
            toggleSubscribe={this.handleSubscribe}
            setEdit={this.setEdit("path")}
            hasPrivilege={hasPrivilege}
            isSubscribed={isSubscribed}
            {...this.props}
          />
        )}
        <div className="details">
          <div className="container">
            <span className="title">Start your journey</span>
            <button
              onClick={this.setEdit("newItem")}
              className="btn btn-blue path-command"
            >
              Add new item
            </button>
            {this.state.newItem ? (
              <PathItemEdit
                handleChange={this.handleChange}
                handleSave={this.handleItemSave}
              />
            ) : (
              ""
            )}
            <ul className="path-item-list">
              {items.map((item, index) => (
                <PathItem
                  key={`p-item-${index}`}
                  pathId={this.props.id}
                  item={item}
                  isSubscribed={isSubscribed}
                  toggleDone={this.props.toggleDone}
                  done={subscribed_items[item.id]}
                />
              ))}
            </ul>
            
            <p>{this.props.auth.displayName}</p>
            
            <button
              onClick={this.setEdit("newComment")}
              className="btn btn-blue path-command"
            >
              Add new comment
            </button>
            {this.state.newComment ? (
              <PathCommentEdit
                handleChange={this.handleChange}
                handleSave={this.handleCommentSave}
              />
            ) : (
              ""
            )}
            <ul className="path-comment-list">
              {comments.map((comment, index) => (
                <PathComment
                  key={`p-comment-${index}`}
                  pathId={this.props.id}
                  comment={comment}
                  isCommentAuthor={isCommentAuthor}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Path;
