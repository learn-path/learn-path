import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { withFirestore } from "react-redux-firebase";
import ToggleButton from "react-toggle-button";
import PathCard from "../PathCard";

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
      <PathCard
        id={path.objectID}
        path={path}
        extra={
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
        }
      />
    );
  }
}

export default enhance(SearchResultItem);
