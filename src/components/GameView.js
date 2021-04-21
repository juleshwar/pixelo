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
    let isSonWinning = this.areYouWinningSon();

    let parentClasses = "flex flex-col h-screen";
    if (isSonWinning) {
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
            className="flex items-center px-4 justify-center cursor-default border border-purple-500 rounded-3xl md:px-8 bg-white ml-16"
          >
            <span className="text-4xl">🎲</span>
            <span className="hidden text-xl md:show md:ml-4">
              {isSonWinning ? "Restart" : "New Game"}
            </span>
          </button>
        </header>
        <section className="flex flex-col items-center py-8 px-4 md:justify-around md:flex-row">
          <DrawingPanel
            className=""
            drawingMeta={this.state.templateMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
          />
          <DrawingPanel
            className="mt-4 md:mt-0"
            drawingMeta={this.state.currentMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
            isReadOnly={isSonWinning}
          />
        </section>
        <footer
          className={
            "flex justify-center mt-auto py-6 " +
            (isSonWinning ? "show" : "hidden")
          }
        >
          <span className="text-5xl text-white">You won! 🥳</span>
        </footer>
      </div>
    );
  }
}

export default GameView;
