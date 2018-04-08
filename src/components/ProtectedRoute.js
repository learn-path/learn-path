import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Denied from "./Denied";

const ProtectedRoute = ({
  component: Component,
  auth,
  profile,
  roles,
  ...rest
}) => {
  if (profile.isLoaded && profile.isEmpty) {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
  if (!auth.isLoaded || profile.isEmpty) return <span>Loading</span>;
  return (
    <Route
      {...rest}
      render={props => {
        return !auth.isEmpty ? (
          roles && profile.role && profile.role !== roles ? (
            <Denied />
          ) : (
            <Component {...props} />
          )
        ) : (
          // <span>OPS</span>
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

export default connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile
}))(ProtectedRoute);
