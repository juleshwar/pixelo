import React, { Component } from "react";
import ColorCell from "./ColorCell";
import PropTypes from "prop-types";
import { DRAWING_0 } from "../constants/components/DrawingPanelConstants";

export class DrawingPanel extends Component {
  static propTypes = {
    drawingMeta: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    drawingMeta: DRAWING_0,
  };

  render() {
    const gridSize = 10;
    let renderedDrawing = [];
    for (let colIndex = 0; colIndex < gridSize; colIndex++) {
      let rowCells = [];
      for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const cellIndex = colIndex * gridSize + rowIndex;
        const cellColor = this.props.drawingMeta[cellIndex];
        rowCells.push(
          <td key={cellIndex} className="p-0 border border-gray-200">
            <ColorCell color={cellColor} size={16} />
          </td>
        );
      }
      renderedDrawing.push(<tr>{rowCells}</tr>);
    }
    return (
      <table className="border-collapse">
        <tbody>{renderedDrawing}</tbody>
      </table>
    );
  }
}

export default DrawingPanel;
