import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import SearchPaths from "./components/Search/SearchPaths";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Path from "./components/Path";
import Login from "./components/Login";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  logout = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        <header className="nav">
          <Link to="/" className="logo">
            Learn Path
          </Link>
          <div className="user-buttons">
            {this.props.auth.isEmpty ? (
              <Link className="btn-login" to="/login" />
            ) : (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  overflow: "hidden",
                  userSelect: "none"
                }}
              >
                <img
                  onClick={this.logout}
                  alt="LOGOUT"
                  src={this.props.auth.photoURL}
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    objectFit: "cover"
                  }}
                />
              </div>
            )}
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/learn/:slurg" component={Path} />
            <Route exact path="/paths/search" component={SearchPaths} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(
  compose(firebaseConnect(), connect(({ firebase: { auth } }) => ({ auth })))(
    App
  )
);
