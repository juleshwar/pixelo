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
    const gridSize = 10;
    let renderedDrawing = [];
    for (let colIndex = 0; colIndex < gridSize; colIndex++) {
      let rowCells = [];
      for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const cellIndex = colIndex * gridSize + rowIndex;
        const cellColor = this.props.drawingMeta[cellIndex];
        rowCells.push(
          <td
            key={cellColor + cellIndex}
            className="p-0 border border-gray-200"
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
            <ColorCell index={cellIndex} color={cellColor} cellSize={7} />
          </td>
        );
      }
      renderedDrawing.push(
        <tr className="table-row" key={colIndex}>
          {rowCells}
        </tr>
      );
    }
    return (
      <table
        className={
          "table-auto border-collapse border border-gray-200 " +
          this.props.className
        }
      >
        <tbody>{renderedDrawing}</tbody>
      </table>
    );
  }
}

export default DrawingPanel;
