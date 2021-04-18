import React, { Component } from "react";
import { DRAWING_3 } from "../constants/components/DrawingPanelConstants";

import DrawingPanel from "./DrawingPanel";

export class GameView extends Component {
  render() {
    return (
      <div className="flex">
        <DrawingPanel drawingMeta={DRAWING_3} />
        <DrawingPanel />
      </div>
    );
  }
}

export default GameView;
