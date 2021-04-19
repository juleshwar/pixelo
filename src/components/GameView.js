import React, { Component } from "react";
import {
  DRAWING_0,
  DRAWING_3,
} from "../constants/components/DrawingPanelConstants";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { COLOR_PALETTE } from "../constants/components/PaletteBar";
import UtilFunctions from "../services/UtilFunctions";

export class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateMeta: DRAWING_3,
      currentMeta: DRAWING_0,
      currentColor: COLOR_PALETTE[0],
    };
    this.doUpdateDrawingMeta = this.doUpdateDrawingMeta.bind(this);
    this.doUpdateCurrentColor = this.doUpdateCurrentColor.bind(this);
  }

  doUpdateDrawingMeta(colorIndex) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[colorIndex] = this.state.currentColor;
    this.setState({ currentMeta: modifiedMeta });
  }

  doUpdateCurrentColor(color) {
    this.setState({ currentColor: color });
  }

  componentDidUpdate() {
    /* Checking if the son has won */
    this.areYouWinningSon();
  }

  areYouWinningSon() {
    if (
      UtilFunctions.compareDrawingMeta(
        this.state.templateMeta,
        this.state.currentMeta
      )
    ) {
      console.log("You're winning, son!");
    }
  }

  render() {
    return (
      <div className="flex-column">
        <PaletteBar
          colors={COLOR_PALETTE}
          selectedColor={this.state.currentColor}
          doUpdateSelectedColor={this.doUpdateCurrentColor}
        />
        <section className="flex">
          <DrawingPanel
            drawingMeta={this.state.templateMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
          />
          <DrawingPanel
            drawingMeta={this.state.currentMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
            isReadOnly={false}
          />
        </section>
      </div>
    );
  }
}

export default GameView;
