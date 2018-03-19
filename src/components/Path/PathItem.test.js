import React from "react";
import PathItem from "./PathItem";
import { shallow } from "enzyme";

const item = {
  short_desc: "short desc 1 ",
  title: "Title 1",
  url: "https://url-1.com"
};

test("should render PathItem with data", () => {
  const wrapper = shallow(<PathItem item={item} />);
});
