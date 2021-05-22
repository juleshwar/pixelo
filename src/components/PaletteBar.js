import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectableColorCell from "./SelectableColorCell";
import AspectRatioWrapper from "./utils/AspectRatioWrapper";

export class PaletteBar extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedColor: PropTypes.string,
    doUpdateSelectedColor: PropTypes.func,
    className: PropTypes.string,
    layoutFormat: PropTypes.string,
  };

  static defaultProps = {
    className: "",
    layoutFormat: "row",
  };

  render() {
    const {
      layoutFormat,
      colors,
      selectedColor,
      doUpdateSelectedColor,
      className,
    } = this.props;
    const propColors = colors;
    const paletteList = propColors.map((color) => {
      return (
        <AspectRatioWrapper aspectRatioInpPercentage="100%" key={color}>
          <SelectableColorCell
            isSelected={selectedColor === color}
            color={color}
            onClick={doUpdateSelectedColor.bind(this, color)}
            className="h-full w-full"
          />
        </AspectRatioWrapper>
      );
    });
    return (
      <nav
        className={
          `${className} grid ` +
          (layoutFormat === "row"
            ? `grid-rows-1 grid-cols-${propColors.length} gap-x-2`
            : `grid-cols-1 grid-rows-${propColors.length} gap-y-1`)
        }
      >
        {paletteList}
      </nav>
    );
  }
}

export default PaletteBar;
