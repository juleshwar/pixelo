import React, { Component } from "react";
import PropTypes from "prop-types";
import ColorCell from "./ColorCell";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedColor: PropTypes.string,
    doUpdateSelectedColor: PropTypes.func,
  };

  render() {
    const paletteList = this.props.colors.map((color) => {
      return (
        <ColorCell
          key={color}
          isSelected={this.props.selectedColor === color}
          size={12}
          color={color}
          onClick={this.props.doUpdateSelectedColor.bind(this, color)}
        />
      );
    });
    return <div className="flex border-black">{paletteList}</div>;
  }
}

export default PaletteBar;
