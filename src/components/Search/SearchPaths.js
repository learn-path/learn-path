import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import qs from "qs";
import SearchResults from "./SearchResults";
import SearchFilters from "./SearchFilters";
import {
  InstantSearch,
  Pagination,
  CurrentRefinements,
  SearchBox
} from "react-instantsearch/dom";
import { config } from "../../config/config";

const updateAfter = 700;

const removeEmptyStrings = obj => {
  let newObj = {};
  let count = 0;
  Object.keys(obj).forEach(prop => {
    if (obj[prop] !== "") {
      count++;
      newObj[prop] = obj[prop];
    }
  });
  return count > 0 ? newObj : null;
};

const createURL = (state, facets) => {
  let newQuery = {};
  if (state.query) {
    newQuery.query = state.query;
  }
  if (state.page > 1) {
    newQuery.page = state.page;
  }
  if (state.refinementList) {
    let newRef = removeEmptyStrings(state.refinementList);
    if (newRef) {
      newQuery.refinementList = newRef;
    }
  }
  return `?${qs.stringify(newQuery)}`;
};

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";
const urlToSearchState = location => qs.parse(location.search.slice(1));

class SearchPaths extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchState: urlToSearchState(props.location)
    };
  }

  componentWillReceiveProps(props) {
    if (props.location !== this.props.location) {
      this.setState({ searchState: urlToSearchState(props.location) });
    }
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      this.props.history.push(
        searchStateToUrl(this.props, searchState),
        searchState
      );
    }, updateAfter);
    this.setState({ searchState });
  };

  render() {
    return (
      <InstantSearch
        apiKey={
          this.props.auth.isEmpty
            ? config.algolia.guest_key
            : this.props.algolia.key || config.algolia.guest_key
        }
        appId={config.algolia.appId}
        indexName={`${config.env}_paths`}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange}
        createURL={this.createURL}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              padding: 10,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <SearchBox className="ais-search-bar" />
            <div style={{ display: "flex" }}>
              <SearchFilters />
              <CurrentRefinements />
            </div>
          </div>
          <SearchResults />
          <div style={{ alignSelf: "center" }}>
            <Pagination showLast={false} showFirst={false} />
          </div>
        </div>
      </InstantSearch>
    );
  }
}

export default withRouter(
  connect(({ algolia, firebase: { auth } }) => ({ algolia, auth }))(SearchPaths)
);
