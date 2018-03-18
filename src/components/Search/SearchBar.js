import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

export default class SearchBar extends Component {
  state = {
    keyword: ""
  };
  render() {
    const { keyword } = this.state;

    if (keyword) {
      return (
        <Redirect
          to={{
            pathname: "/paths/search",
            search: queryString.stringify({ q: this.input.value })
          }}
          push={true}
        />
      );
    }

    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={() => this.setState({ keyword: "react" })}>
          Search
        </button>
      </div>
    );
  }
}
