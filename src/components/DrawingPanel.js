import React, { Component } from "react";
import ColorCell from "./ColorCell";
import PropTypes from "prop-types";
import PixeloStateHandler from "../services/PixeloStateHandler";
import AspectRatioWrapper from "./utils/AspectRatioWrapper";
import {
  LocalStorageService,
  GAME_LAYOUT,
} from "../services/LocalStorageService";

export class DrawingPanel extends Component {
  static propTypes = {
    drawingMeta: PropTypes.arrayOf(PropTypes.string),
    isReadOnly: PropTypes.bool,
    doUpdateCellColor: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    drawingMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
    isReadOnly: true,
    className: "",
  };

  triggerUpdateCellColorLogic(cellIndex, buttonClick) {
    if (!buttonClick) {
      return;
    }
    this.props.doUpdateCellColor(cellIndex, buttonClick === 2);
  }

  handleMouseMoveOnColorCell(cellIndex, e) {
    this.triggerUpdateCellColorLogic(cellIndex, e.buttons);
  }

  handleMouseDownOnColorCell(cellIndex, e) {
    this.triggerUpdateCellColorLogic(cellIndex, e.buttons);
  }

  handleDoubleClickOnColorCell(cellIndex, e) {
    this.props.doUpdateCellColor(cellIndex, true);
  }

  render() {
    const isModernLayout =
      LocalStorageService.pixeloSettings.layout === GAME_LAYOUT.MODERN;
    const { className, drawingMeta, isReadOnly } = this.props;
    return (
      <div
        className={`grid grid-cols-10 grid-rows-10 ${className} ${
          isModernLayout ? "gap-0.75 tablet:gap-1" : "gap-0.5 bg-gray-200"
        }`}
      >
        {drawingMeta.map((cellColor, cellIndex) => {
          return (
            <div
              key={cellColor + cellIndex}
              onMouseMove={
                isReadOnly
                  ? null
                  : this.handleMouseMoveOnColorCell.bind(this, cellIndex)
              }
              onMouseDown={
                isReadOnly
                  ? null
                  : this.handleMouseDownOnColorCell.bind(this, cellIndex)
              }
              onDoubleClick={
                isReadOnly
                  ? null
                  : this.handleDoubleClickOnColorCell.bind(this, cellIndex)
              }
            >
              <AspectRatioWrapper
                aspectRatioInPercentage="100%"
                className={`${
                  isModernLayout ? "rounded shadow-color-cell" : ""
                }`}
              >
                <ColorCell
                  index={cellIndex}
                  color={cellColor}
                  className="h-full w-full"
                />
              </AspectRatioWrapper>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DrawingPanel;
