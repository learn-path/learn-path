import React, { Component } from "react";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";

class Profile extends Component {
  state = {};

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    });
  };

  handleSave = () => {
    if (this.state["short_desc"]) {
      this.props.firebase.updateProfile({
        short_desc: this.state.short_desc,
        done: "done"
      });
    }
  };

  handleSkip = () => {
    this.props.firebase.updateProfile({ done: "skip" });
  };

  render() {
    let skipButton = this.props.full ? (
      ""
    ) : (
      <button className="btn btn-blue btn-subscribe" onClick={this.handleSkip}>
        SKIP
      </button>
    );
    return (
      <div className="container">
        <div
          style={{
            backgroundColor: "white",
            textAlign: "center",
            marginTop: 20,
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 20
          }}
        >
          <h3>{this.props.message}</h3>
          <textarea
            style={{ fontSize: 12 }}
            name="short_desc"
            cols={50}
            rows={5}
            onChange={this.handleChange}
            placeholder="I'm John, I've been a Full Stack Software developer for 10 years and I love Star Wars and cats"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <button
              className="btn btn-blue btn-subscribe"
              onClick={this.handleSave}
            >
              SAVE
            </button>
            {skipButton}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withFirebase)(Profile);
