import React, { Component } from "react";
import DRAWINGS from "../constants/components/DrawingPanelConstants";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { COLOR_PALETTE } from "../constants/components/PaletteBarConstants";
import { ACTION_TYPE } from "../constants/services/ActionStackConstants";
import * as UtilFunctions from "../services/UtilFunctions";
import ActionStack from "../services/ActionStack";
import SvgUndoArrow from "./svgs/UndoArrow";

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
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);

    UtilFunctions.modifyCursorOnColorSelect(this.state.currentColor);
  }

  doUpdateDrawingMeta(colorIndex, eraseColor) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    let toColor;
    let fromColor = modifiedMeta[colorIndex];
    if (eraseColor) {
      toColor = COLOR_PALETTE[0];
    } else {
      toColor = this.state.currentColor;
    }

    // Not applying color if the same color is already present in that cell
    if (fromColor === toColor) {
      return;
    }

    const actionItem = {
      type: ACTION_TYPE.DRAWING_PANEL,
      fromColor,
      toColor,
      cellIndex: colorIndex,
    };
    ActionStack.pushToStack(actionItem);
    modifiedMeta[colorIndex] = toColor;
    this.setState({ currentMeta: modifiedMeta });
  }

  doUpdateCurrentColor(color) {
    this.setState({ currentColor: color });
    UtilFunctions.modifyCursorOnColorSelect(color);
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

  //#region Actions
  onUndo() {
    const { cellIndex, fromColor } = ActionStack.undo();
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[cellIndex] = fromColor;
    this.setState({ currentMeta: modifiedMeta });
  }
  onRedo() {
    const { cellIndex, toColor } = ActionStack.redo();
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[cellIndex] = toColor;
    this.setState({ currentMeta: modifiedMeta });
  }
  //#region Actions

  render() {
    let isSonWinning = this.areYouWinningSon();

    let parentClasses = "flex flex-col h-screen";
    if (isSonWinning) {
      parentClasses += " bg-green-700";
    }

    return (
      <div className={parentClasses}>
        <header className="flex flex-col justify-center py-4 items-center md:flex-row md:w-7/12 md:justify-between md:self-center">
          <PaletteBar
            colors={COLOR_PALETTE}
            selectedColor={this.state.currentColor}
            doUpdateSelectedColor={this.doUpdateCurrentColor}
          />
          <div className="flex mt-3 justify-between w-1/2 md:w-3/12 md:mt-0 md:flex-1 md:ml-8">
            <button
              className="undo h-full w-auto px-3 py-1 border border-black disabled:opacity-50 disabled:border-gray-500 md:py-3 md:px-5"
              disabled={!ActionStack.isUndoPossible}
              onClick={this.onUndo}
            >
              <SvgUndoArrow />
            </button>
            <button
              className="undo h-full w-auto px-3 py-1 border border-black disabled:opacity-50 disabled:border-gray-500 md:py-3 md:px-5"
              disabled={!ActionStack.isRedoPossible}
              onClick={this.onRedo}
            >
              <SvgUndoArrow />
            </button>
            <button
              onClick={this.setupNewGame}
              className="flex items-center px-4 justify-center cursor-default border border-purple-500 rounded-3xl bg-white md:px-8"
            >
              <span className="text-l md:text-4xl">🎲</span>
              <span className="hidden text-xl text-m md:block md:ml-4">
                {isSonWinning ? "Restart" : "New Game"}
              </span>
            </button>
          </div>
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
