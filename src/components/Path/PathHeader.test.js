import React from "react";
import PathHeader from "./PathHeader";
import { shallow } from "enzyme";

test("should render PathHeader without data", () => {
  const wrapper = shallow(<PathHeader />);
});
