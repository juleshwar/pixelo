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

  handleMouseMoveOnColorCell(cellIndex, e) {
    // only allow when left button is pressed
    if (e.buttons === 1) {
      this.props.doUpdateCellColor(cellIndex);
    }
  }

  handleMouseDownOnColorCell(cellIndex) {
    this.props.doUpdateCellColor(cellIndex);
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
            <ColorCell
              index={cellIndex}
              color={cellColor}
              className="h-7 w-7 md:w-16 md:h-16"
            />
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
