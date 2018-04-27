import React from "react";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const google = {
  provider: "google",
  type: "popup"
};
export const Login = ({ firebase, profile, auth }) => {
  if (auth.uid && profile.isLoaded) {
    if (profile.role && profile.role === "admin")
      return <Redirect to="/admin" />;
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="login-form">
      <button
        key={0}
        onClick={() => firebase.login(google)}
        className="btn google"
      >
        Login with Google
      </button>
    </div>
  );
};
Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }).isRequired
};
export default compose(
  firebaseConnect(),
  connect(({ firebase: { profile, auth } }) => ({ profile, auth }))
)(Login);
