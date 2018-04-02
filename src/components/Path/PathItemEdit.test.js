import React from "react";
import PathItemEdit from "./PathItemEdit";
import { shallow } from "enzyme";
const item = {
  short_desc: "short desc 1 ",
  title: "Title 1",
  url: "https://url-1.com"
};

test("should render PathItemEdit", () => {
  const wrapper = shallow(<PathItemEdit item={item} />);
});
