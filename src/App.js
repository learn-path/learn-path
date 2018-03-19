import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import SearchPaths from "./components/Search/SearchPaths";
import "./App.css";
import Path from "./components/Path";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <Link to="/" className="logo">
              Learn Path
            </Link>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route path="/learn/:slurg" component={Path} />
          <Route exact path="/paths/search" component={SearchPaths} />
        </main>
      </div>
    );
  }
}

export default App;
