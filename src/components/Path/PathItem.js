import React, { Component } from "react";
import PathItemEdit from "./PathItemEdit";
import { withFirebase } from "react-redux-firebase";

class PathItem extends Component {
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
      ["itemTitle", "title"],
      ["itemDesc", "short_desc"],
      ["itemUrl", "url"]
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
      .collection("items")
      .doc(this.props.item.id)
      .update(data);
    this.setState({
      itemTitle: undefined,
      itemDesc: undefined,
      itemUrl: undefined,
      edit: false
    });
  };

  render() {
    if (this.state.edit) {
      return (
        <PathItemEdit
          item={this.props.item}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
        />
      );
    }
    return (
      <li
        className="card path-item"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <a
          href={this.props.item.url}
          target="_blank"
          className="path-item-link"
        >
          {this.props.item.title}
        </a>
        <div>
          <button
            style={{ paddingRight: 10 }}
            onClick={this.setEdit}
            className="btn item-command"
          >
            Edit
          </button>
        </div>
      </li>
    );
  }
}

export default withFirebase(PathItem);
