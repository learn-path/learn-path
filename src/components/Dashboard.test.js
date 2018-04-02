import React from "react";
import Dashboard from "./Dashboard";
import { shallow } from "enzyme";

test("should render Home without data", () => {
  const wrapper = shallow(<Dashboard />);
});
