import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, Redirect } from "react-router-dom";
import Denied from "./Denied";
import { withFirebase } from "react-redux-firebase";

const ProtectedRoute = ({
  component: Component,
  auth,
  profile,
  roles,
  firebase,
  ...rest
}) => {
  if (profile.isLoaded && profile.isEmpty && auth.isLoaded && auth.isEmpty) {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
  if (!auth.isLoaded || profile.isEmpty) return <div className="container"><span className="title text-center">Loading...</span></div>;
  if (profile.blocked) return <div className="container"><span className="title text-center">You've been blocked by an Admin</span></div>;
  return (
    <Route
      {...rest}
      render={props => {
        return !auth.isEmpty ? (
          roles && profile.role !== roles ? (
            <Denied />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  withFirebase
)(ProtectedRoute);
