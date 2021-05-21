import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectableColorCell from "./SelectableColorCell";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedColor: PropTypes.string,
    doUpdateSelectedColor: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const propColors = this.props.colors;
    const paletteList = propColors.map((color) => {
      return (
        <SelectableColorCell
          key={color}
          isSelected={this.props.selectedColor === color}
          color={color}
          onClick={this.props.doUpdateSelectedColor.bind(this, color)}
          className="h-8 w-8"
        />
      );
    });
    return (
      <nav
        className={`${this.props.className} grid grid-cols-${propColors.length} gap-x-2`}
      >
        {paletteList}
      </nav>
    );
  }
}

export default PaletteBar;
