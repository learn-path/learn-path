import React from "react";
import PathItem from "./PathItem";
import { shallow } from "enzyme";

jest.mock("react-redux-firebase", () => ({
  getFirebase: () => ({
    ref: () => ({
      on: () => jest.fn()
    }),
    auth: () => ({
      onAuthStateChanged: () => jest.fn()
    })
  }),
  firebaseConnect: () => () => jest.fn(),
  withFirebase: comp => comp,
  helpers: {
    isLoaded: () => jest.fn()
  }
}));

const item = {
  short_desc: "short desc 1 ",
  title: "Title 1",
  url: "https://url-1.com"
};

test("should render SearchBar without data", () => {
  const wrapper = shallow(<PathItem item={item} />);
});
