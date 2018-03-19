import React from "react";
import SearchBar from "./SearchBar";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

test("should render SearchBar without data", () => {
  const wrapper = mount(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );
});

test("should handle search", () => {
  const wrapper = shallow(<SearchBar />);
  wrapper.instance().input = "ok";
  wrapper.instance().handleSearch();
  expect(wrapper.state().keyword).toEqual("react");
});

test("should handle keydown", () => {
  const wrapper = shallow(<SearchBar />);
  wrapper.instance().input = "ok";
  wrapper.find("input").simulate("keyDown", { key: "a" });
  wrapper.find("input").simulate("keyDown", { key: "Enter" });
});
