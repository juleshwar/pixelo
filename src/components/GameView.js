import React, { Component } from "react";
import DRAWINGS from "../constants/components/DrawingPanelConstants";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { COLOR_PALETTE } from "../constants/components/PaletteBar";
import * as UtilFunctions from "../services/UtilFunctions";

export class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateMeta: UtilFunctions.getRandomTemplate(),
      currentMeta: DRAWINGS.cleanSlate,
      currentColor: COLOR_PALETTE[1],
    };
    this.doUpdateDrawingMeta = this.doUpdateDrawingMeta.bind(this);
    this.doUpdateCurrentColor = this.doUpdateCurrentColor.bind(this);
    this.setupNewGame = this.setupNewGame.bind(this);
    this.areYouWinningSon = this.areYouWinningSon.bind(this);
  }

  doUpdateDrawingMeta(colorIndex) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[colorIndex] = this.state.currentColor;
    this.setState({ currentMeta: modifiedMeta });
  }

  doUpdateCurrentColor(color) {
    this.setState({ currentColor: color });
  }

  areYouWinningSon() {
    return UtilFunctions.compareDrawingMeta(
      this.state.templateMeta,
      this.state.currentMeta
    );
  }

  setupRandomTemplate() {
    const currentTemplate = this.templateMeta;
    let randomTemplate = UtilFunctions.getRandomTemplate();
    while (UtilFunctions.compareDrawingMeta(currentTemplate, randomTemplate)) {
      randomTemplate = UtilFunctions.getRandomTemplate();
    }
    this.setState({ templateMeta: randomTemplate });
  }

  setupNewGame() {
    this.setState({ currentMeta: DRAWINGS.cleanSlate });
    this.setupRandomTemplate();
  }

  render() {
    let parentClasses = "flex-column h-screen";
    if (this.areYouWinningSon()) {
      parentClasses += " bg-green-700";
    }

    return (
      <div className={parentClasses}>
        <header className="flex justify-center py-4">
          <PaletteBar
            colors={COLOR_PALETTE}
            selectedColor={this.state.currentColor}
            doUpdateSelectedColor={this.doUpdateCurrentColor}
          />
          <button
            onClick={this.setupNewGame}
            className="flex items-center justify-center cursor-default border border-purple-500 rounded-3xl px-8 bg-white ml-16"
          >
            <span className="text-4xl">🎲</span>
            <span className="ml-4 text-xl">New Game</span>
          </button>
        </header>
        <section className="flex center justify-around py-8 px-4">
          <DrawingPanel
            drawingMeta={this.state.templateMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
          />
          <DrawingPanel
            drawingMeta={this.state.currentMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
            isReadOnly={this.areYouWinningSon()}
          />
        </section>
      </div>
    );
  }
}

export default GameView;
