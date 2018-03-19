import React from "react";
import Home from "./Home";
import { shallow } from "enzyme";

test("should render Home without data", () => {
  const wrapper = shallow(<Home />);
});
