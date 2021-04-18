import React, { Component } from "react";
import PropTypes from "prop-types";
import ColorCell from "./ColorCell";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const paletteList = this.props.colors.map((color) => {
      return <ColorCell key={color} size={12} color={color} />;
    });
    return <div className="flex border-black">{paletteList}</div>;
  }
}

export default PaletteBar;
