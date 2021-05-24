import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectableColorCell from "./SelectableColorCell";
import AspectRatioWrapper from "./utils/AspectRatioWrapper";
import * as UtilFunctions from "../services/UtilFunctions";
import { PALETTE_BAR_EMOJIS } from "../constants/PixeloConstants";
import PixeloStateHandler from "../services/PixeloStateHandler";

export class PaletteBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiIndex: 0,
    };

    this.onSelectColor = this.onSelectColor.bind(this);
    this.hotkeyComboHandler = this.hotkeyComboHandler.bind(this);
  }
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedColor: PropTypes.string,
    doUpdateSelectedColor: PropTypes.func.isRequired,
    className: PropTypes.string,
    layoutFormat: PropTypes.string,
  };

  static defaultProps = {
    className: "",
    layoutFormat: "row",
  };

  componentDidMount() {
    this.bindHotkeyCombos();
  }

  componentWillUnmount() {
    this.unbindHotkeyCombos();
  }

  bindHotkeyCombos() {
    window.addEventListener("keydown", this.hotkeyComboHandler);
  }

  unbindHotkeyCombos() {
    window.removeEventListener("keydown", this.hotkeyComboHandler);
  }

  hotkeyComboHandler(e) {
    switch (true) {
      case e.code.startsWith("Digit") || e.code === "Minus":
        const colorKeyMapping = {
          1: 0,
          2: 1,
          3: 2,
          4: 3,
          5: 4,
          6: 5,
          7: 6,
          8: 7,
          9: 8,
          0: 9,
          Minus: 10,
        };
        const digitPressed = e.code.startsWith("Digit")
          ? e.code.slice(5)
          : e.code;
        const colorKey = colorKeyMapping[digitPressed];
        const colorAtKey = PixeloStateHandler.COLOR_PALETTE[colorKey];
        if (colorKey !== undefined && colorAtKey !== undefined) {
          this.onSelectColor(PixeloStateHandler.COLOR_PALETTE[colorKey]);
        }
        break;

      default:
        break;
    }
  }

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
