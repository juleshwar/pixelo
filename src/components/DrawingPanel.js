import React, { Component } from "react";
import ColorCell from "./ColorCell";
import PropTypes from "prop-types";
import PixeloStateHandler from "../services/PixeloStateHandler";
import AspectRatioWrapper from "./utils/AspectRatioWrapper";

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

  render() {
    return (
      <div
        className={`grid grid-cols-10 grid-rows-10 gap-0.75 tablet:gap-1 ${this.props.className}`}
      >
        {this.props.drawingMeta.map((cellColor, cellIndex) => {
          return (
            <div
              key={cellColor + cellIndex}
              onMouseMove={
                this.props.isReadOnly
                  ? null
                  : this.handleMouseMoveOnColorCell.bind(this, cellIndex)
              }
              onMouseDown={
                this.props.isReadOnly
                  ? null
                  : this.handleMouseDownOnColorCell.bind(this, cellIndex)
              }
            >
              <AspectRatioWrapper
                aspectRatioInPercentage="100%"
                className="rounded shadow-color-cell"
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
