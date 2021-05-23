import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectableColorCell from "./SelectableColorCell";
import AspectRatioWrapper from "./utils/AspectRatioWrapper";
import * as UtilFunctions from "../services/UtilFunctions";
import { PALETTE_BAR_EMOJIS } from "../constants/PixeloConstants";

export class PaletteBar extends Component {
  constructor(props) {
    super(props);
    this.onSelectColor = this.onSelectColor.bind(this);
    this.state = {
      emojiIndex: 0,
    };
  }
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

  onSelectColor(color) {
    if (this.props.selectedColor === color) {
      return;
    }
    let newEmojiIndex = this.state.emojiIndex;
    while (newEmojiIndex === this.state.emojiIndex) {
      newEmojiIndex = UtilFunctions.getRandomNumberInclusiveWithinRange(
        0,
        PALETTE_BAR_EMOJIS.length - 1
      );
    }
    this.setState({ emojiIndex: newEmojiIndex });
    this.props.doUpdateSelectedColor(color);
  }

  render() {
    const { layoutFormat, colors, selectedColor, className } = this.props;
    const propColors = colors;
    const emoji = PALETTE_BAR_EMOJIS[this.state.emojiIndex];
    const paletteList = propColors.map((color) => {
      return (
        <AspectRatioWrapper
          aspectRatioInPercentage="100%"
          key={color}
          className="rounded-md border border-gray-400"
        >
          <SelectableColorCell
            isSelected={selectedColor === color}
            color={color}
            accent={emoji}
            onClick={this.onSelectColor.bind(this, color)}
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
