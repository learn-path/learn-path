import React from "react";
import PathEdit from "./PathEdit";
import { shallow } from "enzyme";

const path = {
  created: "2018-03-16T17:25:08.005Z",
  items: [
    {
      short_desc: "short desc 1 ",
      title: "Title 1",
      url: "https://url-1.com"
    }
  ],
  level: "Beginner",
  short_desc: "Redux desc",
  title: "Redux"
};

test("should render PathEdit with data", () => {
  const wrapper = shallow(<PathEdit path={path} />);
});
