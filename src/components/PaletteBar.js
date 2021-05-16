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
          cellSize={8}
          color={color}
          onClick={this.props.doUpdateSelectedColor.bind(this, color)}
        />
      );
    });
    return (
      <nav
        className={
          `grid grid-cols-${propColors.length} gap-2 ` + this.props.className
        }
      >
        {paletteList}
      </nav>
    );
  }
}

export default PaletteBar;
