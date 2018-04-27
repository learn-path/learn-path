import React, { Component } from "react";
import { RefinementList, Panel } from "react-instantsearch/dom";
import { orderBy } from "lodash";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    outline: "none",
    height: "100%",
    maxWidth: "248px",
    margin: "0 auto",
    padding: 25
  }
};

class SearchFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      value: ""
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <div>
        <button className="btn btn-blue" onClick={this.openModal}>
          Filters
        </button>
        <div
          style={{
            ...modalStyle.overlay,
            display: isModalOpen ? "block" : "none"
          }}
        >
          <div style={modalStyle.content}>
            <div>
              <Panel header="Level">
                <RefinementList
                  attribute="level"
                  attributeName="level"
                  transformItems={items =>
                    orderBy(items, ["label", "count"], ["asc", "desc"])
                  }
                />
              </Panel>
              <Panel header="Category">
                <RefinementList
                  attribute="path_category"
                  attributeName="path_category"
                  transformItems={items =>
                    orderBy(items, ["label", "count"], ["asc", "desc"])
                  }
                />
              </Panel>
            </div>
            <button className="btn btn-blue" onClick={this.closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFilters;
