import React from "react";
import About from "./About";
import { shallow } from "enzyme";

test("should render About without data", () => {
  const wrapper = shallow(<About />);
});
