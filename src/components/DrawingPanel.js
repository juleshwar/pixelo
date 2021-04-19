import React, { Component } from "react";
import ColorCell from "./ColorCell";
import PropTypes from "prop-types";
import { DRAWING_0 } from "../constants/components/DrawingPanelConstants";

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
  };

  static defaultProps = {
    drawingMeta: DRAWING_0,
    isReadOnly: true,
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
          <div
            key={cellColor + cellIndex}
            className="p-0 table-cell border border-gray-200"
            onMouseMove={
              this.props.isReadOnly
                ? null
                : this.handleMouseMoveOnColorCell.bind(this, cellIndex)
            }
            onMouseDown={this.handleMouseDownOnColorCell.bind(this, cellIndex)}
          >
            <ColorCell index={cellIndex} color={cellColor} size={16} />
          </div>
        );
      }
      renderedDrawing.push(
        <div className="table-row" key={colIndex}>
          {rowCells}
        </div>
      );
    }
    return <div className="table">{renderedDrawing}</div>;
  }
}

export default DrawingPanel;
