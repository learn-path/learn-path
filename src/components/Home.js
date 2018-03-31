import React from "react";
import NewPaths from "./PathSlider/NewPaths";
import SearchBar from "./Search/SearchBar";

export default () => (
  <div>
    <div className="hero">
      <div className="container">
        <h1>Lorem ipsum dolor</h1>
        <p className="lead">Pellentesque imperdiet leo nisi, et feugiat sapien interdum et</p>
      </div>
    </div>
    <div className="container">
      <SearchBar />
      <NewPaths title="New Paths" />
    </div>
  </div>
);
