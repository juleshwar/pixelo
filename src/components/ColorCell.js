import React, { Component } from "react";
import PropTypes from "prop-types";

export class ColorCell extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
  };
  render() {
    return (
      <div
        className={`h-${this.props.size} w-${this.props.size} ${
          this.props.isSelected ? "border border-yellow-500" : ""
        }`}
        style={Object.assign({}, { background: this.props.color })}
        onClick={this.props.onClick}
      ></div>
    );
  }
}

export default ColorCell;
