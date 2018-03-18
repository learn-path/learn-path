import React from "react";
import { Link } from "react-router-dom";
import NewPaths from "./PathSlider/NewPaths";

export default () => (
  <div>
    <h1>Home</h1>
    <Link to="/learn/react">Learn React</Link>
    <NewPaths title="New Paths" />
  </div>
);
