import React from "react";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const google = {
  provider: "google",
  type: "redirect"
};
export const Login = ({ firebase, auth }) => {
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <span>LOGIN</span>
      <button key={0} onClick={() => firebase.login(google)}>
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
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login);
