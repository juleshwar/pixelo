import React, { Component } from "react";
import ColorCell from "./ColorCell";
import PropTypes from "prop-types";
import DRAWINGS from "../constants/components/DrawingPanelConstants";

export class DrawingPanel extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMoveOnColorCell = this.handleMouseMoveOnColorCell.bind(
      this
    );
    this.handleMouseDownOnColorCell = this.handleMouseDownOnColorCell.bind(
      this
    );
  }

  static propTypes = {
    drawingMeta: PropTypes.arrayOf(PropTypes.string),
    isReadOnly: PropTypes.bool,
    doUpdateCellColor: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    drawingMeta: DRAWINGS.cleanSlate,
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
      <div className="grid grid-cols-10 grid-rows-10 gap-0.75">
        {this.props.drawingMeta.map((cellColor, cellIndex) => {
          return (
            <div
              key={cellColor + cellIndex}
              className=""
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
              <ColorCell
                index={cellIndex}
                color={cellColor}
                className="shadow-color-cell h-7 w-7"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DrawingPanel;
