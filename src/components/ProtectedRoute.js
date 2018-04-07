import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Denied from "./Denied";

const ProtectedRoute = ({ component: Component, profile, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return !profile.isEmpty === true ? (
        roles && profile.role && profile.role !== roles ? (
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

export default connect(({ firebase: { profile } }) => ({ profile }))(
  ProtectedRoute
);
