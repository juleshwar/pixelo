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
    const paletteList = this.props.colors.map((color) => {
      return (
        <SelectableColorCell
          key={color}
          isSelected={this.props.selectedColor === color}
          className="h-6 w-6 md:h-12 md:w-12"
          color={color}
          onClick={this.props.doUpdateSelectedColor.bind(this, color)}
        />
      );
    });
    return (
      <nav
        className={"flex border border-black w-auto " + this.props.className}
      >
        {paletteList}
      </nav>
    );
  }
}

export default PaletteBar;
