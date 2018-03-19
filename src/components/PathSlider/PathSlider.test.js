import React from "react";
import PathSlider from "./PathSlider";
import { shallow } from "enzyme";

const paths = [
  {
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
  },
  {
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
    title: "Redux 2"
  }
];

test("should render path with data", () => {
  const wrapper = shallow(<PathSlider newPaths={paths} title="Test" />);
});

test("should render path withhout data", () => {
  const wrapper = shallow(<PathSlider />);
});
