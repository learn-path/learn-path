import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import "./App.css";
import Path from "./components/Path";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route path="/learn/:slurg" component={Path} />

        </main>
      </div>
    );
  }
}

export default App;
