import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

export default class SearchBar extends Component {
  state = {
    keyword: ""
  };

  handleSearch = () => {
    this.setState({ keyword: "react" });
  };

  handleKeyDown = event => {
    switch (event.key) {
      case "Enter":
        this.handleSearch();
        break;
      default:
        return;
    }
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
        <input
          type="text"
          ref={input => (this.input = input)}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
