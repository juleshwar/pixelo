import React, { Component } from "react";
import PropTypes from "prop-types";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const paletteList = this.props.colors.map((color) => {
      return (
        <div
          key={color}
          className="h-12 w-12"
          style={Object.assign({}, { background: color })}
        ></div>
      );
    });
    return <div className="flex border-black">{paletteList}</div>;
  }
}

export default PaletteBar;
