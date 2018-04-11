import React from "react";
import NewPaths from "./PathSlider/NewPaths";
import SearchBar from "./Search/SearchBar";

export default () => (
  <div>
    <div className="hero">
      <div className="container">
        <h1>Learn more</h1>
        <p className="lead">
          Explore the best Learn Paths and improve your skills
        </p>
      </div>
    </div>
    <div className="container">
      <SearchBar />
      <NewPaths title="New Paths" />
    </div>
  </div>
);
