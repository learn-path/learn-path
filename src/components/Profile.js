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
      <button
        className="btn"
        style={{marginLeft: 10}}
        onClick={this.handleSkip}>
        Skip
      </button>
    );
    return (
      <div>
        <h3 className="title">{this.props.message}</h3>
        <div  className="form-box">
          <textarea
            className="form-control"
            name="short_desc"
            defaultValue={this.props.profile.short_desc}
            cols={50}
            rows={5}
            onChange={this.handleChange}
            placeholder="I'm John, I've been a Full Stack Software developer for 10 years and I love Star Wars and cats"
          />
        </div>
        <button className="btn btn-blue" onClick={this.handleSave}>
          Save profile
        </button>
        {skipButton}
      </div>
    );
  }
}

export default compose(withFirebase)(Profile);
