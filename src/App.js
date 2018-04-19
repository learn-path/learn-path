import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import "./App.css";
import { slide as Menu } from "react-burger-menu";
import { getSearchKeyIfUserChanged } from "./actions/algolia";
import Loadable from "react-loadable";
import AddToHomeScreen from "./AddToHomeScreen";

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: Loading
});

const About = Loadable({
  loader: () => import("./components/About"),
  loading: Loading
});

const Path = Loadable({
  loader: () => import("./components/Path"),
  loading: Loading
});

const SearchPaths = Loadable({
  loader: () => import("./components/Search/SearchPaths"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("./components/Login"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("./components/Dashboard"),
  loading: Loading
});

const Admin = Loadable({
  loader: () => import("./components/Admin"),
  loading: Loading
});

class App extends Component {
  logout = () => {
    this.props.firebase.auth().signOut();
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  componentDidMount() {
    const onAuthUser = this.props.onAuthUser;
    this.props.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        onAuthUser(user);
      }
    });
  }

  render() {
    return (
      <div>
        <header className="nav">
          <Menu
            isOpen={this.state.menuOpen}
            onStateChange={state => this.handleStateChange(state)}
          >
            {this.props.auth.isEmpty ? (
              <Link
                className="menu-item"
                to="/login"
                onClick={() => this.closeMenu()}
              >
                Login
              </Link>
            ) : (
              <div>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    overflow: "hidden",
                    userSelect: "none",
                    marginBottom: "15px"
                  }}
                >
                  <img
                    alt="Profile"
                    src={this.props.auth.photoURL}
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <Link
                  className="menu-item"
                  to="/dashboard"
                  onClick={() => this.closeMenu()}
                >
                  Dashboard
                </Link>
                <Link
                  className="menu-item"
                  to="/admin"
                  onClick={() => this.closeMenu()}
                >
                  Admin
                </Link>
                <Link className="menu-item" to="/" onClick={this.logout}>
                  Logout
                </Link>
              </div>
            )}
          </Menu>
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
            <ProtectedRoute
              exact
              path="/admin"
              roles="admin"
              component={Admin}
            />
          </Switch>
          <AddToHomeScreen />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthUser: user => {
      dispatch(getSearchKeyIfUserChanged(user));
    }
  };
};

export default withRouter(
  compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth }), mapDispatchToProps)
  )(App)
);
