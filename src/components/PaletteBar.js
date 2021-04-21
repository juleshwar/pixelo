import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectableColorCell from "./SelectableColorCell";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedColor: PropTypes.string,
    doUpdateSelectedColor: PropTypes.func,
  };

  render() {
    const paletteList = this.props.colors.map((color) => {
      return (
        <SelectableColorCell
          key={color}
          isSelected={this.props.selectedColor === color}
          className="h-12 w-12"
          color={color}
          onClick={this.props.doUpdateSelectedColor.bind(this, color)}
        />
      );
    });
    return <nav className="flex border border-black">{paletteList}</nav>;
  }
}

export default PaletteBar;
