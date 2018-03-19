import React from "react";
import NewPaths from "./PathSlider/NewPaths";
import SearchBar from "./Search/SearchBar";

export default () => (
  <div>
    <div className="hero">
      <div className="container">
        <SearchBar style={{ marginTop: 50 }} />
      </div>
    </div>
    <div className="container">
      <NewPaths title="New Paths" />
    </div>
  </div>
);
