import React, { Component } from "react";
import PathItem from "./PathItem";
import "normalize.css";
import PathHeader from "./PathHeader";
import PathEdit from "./PathEdit";

class Path extends Component {
  state = {};

  setEdit = key => () => {
    this.setState({ [key]: true });
  };

  handlePathSave = () => {
    this.setState({ path: false });
  };

  render() {
    let p = this.props.path ? this.props.path : { items: [] };
    return (
      <div className="path">
        {this.state.path ? (
          <PathEdit path={p} handleSave={this.handlePathSave} />
        ) : (
          <PathHeader path={p} setEdit={this.setEdit("path")} />
        )}
        <div className="details">
          <div className="container">
            <span>Start your journey</span>
            <ul className="path-item-list">
              {p.items.map((item, index) => (
                <PathItem key={`p-item-${index}`} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Path;
