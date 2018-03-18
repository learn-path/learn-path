import React from "react";
import { Link } from "react-router-dom";
import NewPaths from "./PathSlider/NewPaths";
import SearchBar from "./Search/SearchBar";

export default () => (
  <div>
    <SearchBar />
    <NewPaths title="New Paths" />
  </div>
);
