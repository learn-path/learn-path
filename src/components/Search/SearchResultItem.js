import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";
import ToggleButton from "react-toggle-button";

const enhance = compose(
  withFirestore, // firestoreConnect can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    toggleBlock: ({ firestore, path }) => value => {
      firestore.update(
        { collection: "paths", doc: path.objectID },
        { blocked: value }
      );
    }
  })
);

class SearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.path.blocked
    };
  }

  handleToggleBlock = () => {
    this.setState({ value: !this.state.value });
    this.props.toggleBlock(!this.state.value);
  };

  render() {
    let { path, auth } = this.props;
    const hasPrivilege = !auth.isEmpty && path.author === auth.uid;
    return (
      <li
        className="card path-card path-card-row"
        style={{ display: "flex", justifyContent: "space-between" }}
        key={path.objectID}
      >
        <Link to={`/learn/${path.objectID}`}>
          <span className="card-image" />
          <div className="card-body">
            <h3>{path.title}</h3>
            <p className="rate">
              <span className="icon-star" />0.0
            </p>
            <p className="level">{path.level}</p>
          </div>
        </Link>
        <div style={{ padding: 20 }}>
          {!hasPrivilege ? (
            ""
          ) : (
            <div>
              <span>Blocked</span>
              <ToggleButton
                value={this.state.value}
                onToggle={this.handleToggleBlock}
              />
            </div>
          )}
        </div>
      </li>
    );
  }
}

export default enhance(SearchResultItem);
