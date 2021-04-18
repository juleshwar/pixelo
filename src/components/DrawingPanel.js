import React, { Component } from "react";
import { DRAWING_3 } from "../constants/components/DrawingPanelConstants";
import ColorCell from "./ColorCell";

export class DrawingPanel extends Component {
  static propTypes = {};

  render() {
    const gridSize = 10;
    let renderedDrawing = [];
    for (let colIndex = 0; colIndex < gridSize; colIndex++) {
      let rowCells = [];
      for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const cellIndex = colIndex * gridSize + rowIndex;
        const cellColor = DRAWING_3[cellIndex];
        rowCells.push(
          <td key={cellIndex}>
            <ColorCell color={cellColor} size={16} />
          </td>
        );
      }
      renderedDrawing.push(<tr>{rowCells}</tr>);
    }
    return (
      <table>
        <tbody>{renderedDrawing}</tbody>
      </table>
    );
  }
}

export default DrawingPanel;
