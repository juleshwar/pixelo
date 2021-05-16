import React, { Component } from "react";
import DRAWINGS from "../constants/components/DrawingPanelConstants";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { COLOR_PALETTE } from "../constants/components/PaletteBarConstants";
import { ACTION_TYPE } from "../constants/services/ActionStackConstants";
import * as UtilFunctions from "../services/UtilFunctions";
import ActionStack from "../services/ActionStack";
import { ReactComponent as SvgUndoArrow } from "../assets/svgs/undo-arrow.svg";
import { ReactComponent as PixeloIcon64 } from "../assets/svgs/pixelo-icon-64.svg";
import { Link } from "react-router-dom";
import PixeloButton from "./PixeloButton";

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
    this.hotkeyComboHandler = this.hotkeyComboHandler.bind(this);

    UtilFunctions.modifyCursorOnColorSelect(this.state.currentColor);
  }

  componentDidMount() {
    this.bindHotkeyCombos();
  }

  componentWillUnmount() {
    this.unbindHotkeyCombos();
  }

  bindHotkeyCombos() {
    window.addEventListener("keydown", this.hotkeyComboHandler);
  }

  unbindHotkeyCombos() {
    window.removeEventListener("keydown", this.hotkeyComboHandler);
  }

  hotkeyComboHandler(e) {
    switch (true) {
      case (e.metaKey && e.shiftKey && e.code === "KeyZ") /* Mac */ ||
        (e.metaKey && e.code === "KeyY") /* Mac */ ||
        (e.ctrlKey && e.shiftKey && e.code === "KeyZ") /* Windows */ ||
        (e.ctrlKey && e.code === "KeyY") /* Windows */:
        this.onRedo();
        break;

      case (e.metaKey && e.code === "KeyZ") /* Mac */ ||
        (e.ctrlKey && e.code === "KeyZ") /* Windows */:
        this.onUndo();
        break;

      case e.code.startsWith("Digit") || e.code === "Minus":
        const colorKeyMapping = {
          1: 0,
          2: 1,
          3: 2,
          4: 3,
          5: 4,
          6: 5,
          7: 6,
          8: 7,
          9: 8,
          0: 9,
          Minus: 10,
        };
        const digitPressed = e.code.startsWith("Digit")
          ? e.code.slice(5)
          : e.code;
        const colorKey = colorKeyMapping[digitPressed];
        const colorAtKey = COLOR_PALETTE[colorKey];
        if (colorKey !== undefined && colorAtKey !== undefined) {
          this.doUpdateCurrentColor(colorAtKey);
        }
        break;

      default:
        break;
    }
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
    ActionStack.clearStack();
  }

  //#region Actions
  onUndo() {
    if (!ActionStack.isUndoPossible || this.areYouWinningSon()) {
      return;
    }
    const { cellIndex, fromColor } = ActionStack.undo();
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[cellIndex] = fromColor;
    this.setState({ currentMeta: modifiedMeta });
  }
  onRedo() {
    if (!ActionStack.isRedoPossible || this.areYouWinningSon()) {
      return;
    }
    const { cellIndex, toColor } = ActionStack.redo();
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[cellIndex] = toColor;
    this.setState({ currentMeta: modifiedMeta });
  }
  //#endregion Actions

  render() {
    let isSonWinning = this.areYouWinningSon();

    /* TODO: Handle layout when user wins */

    return (
      <div className="flex flex-col h-full">
        <header className="flex bg-indigo-50 px-8 py-3 items-center justify-between h-14">
          <Link to="/">
            <PixeloIcon64 className="w-4" />
          </Link>
          <PaletteBar
            colors={COLOR_PALETTE}
            selectedColor={this.state.currentColor}
            doUpdateSelectedColor={this.doUpdateCurrentColor}
            className="hidden landscape:grid"
          />
          <div className="flex justify-between w-7/12 landscape:w-1/4">
            <PixeloButton
              title="Start a new game"
              onClick={this.setupNewGame}
              className="px-4"
            >
              <span className="text-xs whitespace-nowrap">
                {isSonWinning ? "Restart" : "New Game"}
              </span>
            </PixeloButton>
            <PixeloButton
              title="Undo"
              buttonSize={8}
              disabled={!ActionStack.isUndoPossible}
              onClick={this.onUndo}
            >
              <SvgUndoArrow className="w-3" />
            </PixeloButton>
            <PixeloButton
              title="Redo"
              buttonSize={8}
              style={{ transform: "scale(-1, 1)" }}
              disabled={!ActionStack.isRedoPossible}
              onClick={this.onRedo}
            >
              <SvgUndoArrow className="w-3" />
            </PixeloButton>
          </div>
        </header>
        <section className="grid grid-rows-2 flex-1 gap-7 justify-items-center py-7 px-4 md:justify-around md:flex-row landscape:grid-cols-2 landscape:grid-rows-none landscape:py-3.5">
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
        <footer className="flex py-4 justify-center justify-self-end">
          <PaletteBar
            colors={COLOR_PALETTE}
            selectedColor={this.state.currentColor}
            doUpdateSelectedColor={this.doUpdateCurrentColor}
            className="grid landscape:hidden"
          />
        </footer>
      </div>
    );
  }
}

export default GameView;
