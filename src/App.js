import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import SearchPaths from "./components/Search/SearchPaths";
import "./App.css";
import Path from "./components/Path";
import Login from "./components/Login";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class App extends Component {
  logout = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        <header>
          <div className="container" style={{ textAlign: "center" }}>
            <Link to="/" className="logo">
              Learn Path
            </Link>
            <div style={{ float: "right", marginTop: "0.25rem" }}>
              {this.props.auth.isEmpty ? (
                <Link className="btn" to="/login">
                  LOGIN
                </Link>
              ) : (
                <button className="btn" onClick={this.logout}>
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/learn/:slurg" component={Path} />
            <Route exact path="/paths/search" component={SearchPaths} />
            <Route exact path="/login" component={Login} />
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
