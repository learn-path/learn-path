import React, { Component } from "react";
import PathItem from "./PathItem";
import "normalize.css";
import PathHeader from "./PathHeader";
import PathEdit from "./PathEdit";
import PathItemEdit from "./PathItemEdit";
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
  render() {
    if (!isLoaded("paths")) return <span>Loading</span>;
    if (!this.props.path) {
      return "";
    }
    let p = this.props.path ? this.props.path : { items: [] };
    let items = this.props.items ? this.props.items : [];
    if (
      p &&
      p.blocked &&
      (!this.props.auth || this.props.auth.uid === this.props.path.author)
    )
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
          <PathHeader path={p} setEdit={this.setEdit("path")} {...this.props} />
        )}
        <div className="details">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Start your journey</span>
              <span onClick={this.setEdit("newItem")} className="path-command">
                Add
              </span>
            </div>
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
