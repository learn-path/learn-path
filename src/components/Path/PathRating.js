import React, { Component } from "react";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export default class PathRating extends Component {
  state = { collapsed: true };

  hover = () => {
    if (!this.props.isReadOnly) {
      this.setState({ collapsed: false });
    }
  };

  hoverEnd = () => {
    this.setState({ collapsed: true });
  };

  click = () => {
    if (this.state.collapsed) {
      this.hover();
    }
  };

  setRating = rate => {
    this.props.onChange(rate);
    this.hoverEnd();
  };

  render() {
    const { myRating, publicRating, isReadOnly } = this.props;
    let rate = Math.round(publicRating * 10) / 10 || "";
    let rating = this.state.collapsed ? (
      <div>
        <FontAwesomeIcon color="#F7C428" icon={faStar} />
        <span>{rate}</span>
      </div>
    ) : (
      <Rating
        initialRating={myRating}
        readonly={isReadOnly}
        onChange={this.setRating}
        emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
        fullSymbol={<FontAwesomeIcon color="#F7C428" icon={faStar} />}
      />
    );

    return (
      <div
        onClick={this.click}
        onMouseEnter={this.hover}
        onMouseLeave={this.hoverEnd}
      >
        {rating}
      </div>
    );
  }
}
