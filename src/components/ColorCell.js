import React, { Component } from "react";
import PropTypes from "prop-types";

export class ColorCell extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div
        className={`h-${this.props.size} w-${this.props.size}`}
        style={Object.assign({}, { background: this.props.color })}
      ></div>
    );
  }
}

export default ColorCell;
