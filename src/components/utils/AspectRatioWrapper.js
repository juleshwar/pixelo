import React, { Component } from "react";
import PropTypes from "prop-types";

export class AspectRatioWrapper extends Component {
  static props = {
    className: PropTypes.string,
    aspectRatioInPercentage: PropTypes.string.isRequired,
  };
  static defaultProps = {
    className: "",
    aspectRatioInPercentage: "100%",
  };
  render() {
    const { className, aspectRatioInPercentage, otherAttrs } = this.props;
    return (
      <div
        className={`relative w-full h-0 overflow-hidden ${className}`}
        style={{ paddingTop: aspectRatioInPercentage }}
        {...otherAttrs}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="h-inherit grid place-items-center">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default AspectRatioWrapper;
