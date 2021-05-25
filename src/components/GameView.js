import React, { Component } from "react";
import PixeloStateHandler from "../services/PixeloStateHandler";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { ACTION_TYPE } from "../constants/services/ActionStackConstants";
import * as UtilFunctions from "../services/UtilFunctions";
import ActionStack from "../services/ActionStack";
import { ReactComponent as SvgUndoArrow } from "../assets/svgs/undo-arrow.svg";
import { ReactComponent as PixeloIcon64 } from "../assets/svgs/pixelo-icon-64.svg";
import { Link } from "react-router-dom";
import PixeloButton from "./PixeloButton";
import FireworksCanvas from "./utils/FireworksCanvas";
import FullPageDialog from "./utils/FullPageDialog";

export class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateMeta: UtilFunctions.getRandomTemplate(),
      currentMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
      currentColor: PixeloStateHandler.COLOR_PALETTE[1],
      isWinnerScreenVisible: false,
    };
    this.doUpdateDrawingMeta = this.doUpdateDrawingMeta.bind(this);
    this.doUpdateCurrentColor = this.doUpdateCurrentColor.bind(this);
    this.setupNewGame = this.setupNewGame.bind(this);
    this.areYouWinningSon = this.areYouWinningSon.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.showWinnerScreen = this.showWinnerScreen.bind(this);
    this.hideWinnerScreen = this.hideWinnerScreen.bind(this);
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

      default:
        break;
    }
  }

  doUpdateDrawingMeta(colorIndex, eraseColor) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    let toColor;
    let fromColor = modifiedMeta[colorIndex];
    if (eraseColor) {
      toColor = PixeloStateHandler.COLOR_PALETTE[0];
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

    // Check if the user has won after drawing meta has updated
    this.setState({ currentMeta: modifiedMeta }, () => {
      if (this.areYouWinningSon()) {
        this.showWinnerScreen();
      }
    });
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
    this.setState({
      currentMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
    });
    this.setupRandomTemplate();
    ActionStack.clearStack();
  }

  showWinnerScreen() {
    this.setState({ isWinnerScreenVisible: true });
  }

  hideWinnerScreen() {
    this.setState({ isWinnerScreenVisible: false });
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
    const isSonWinning = this.areYouWinningSon();

    /* TODO: Handle layout for extremely small screens */

    return (
      <div
        className={`relative flex flex-col h-full ${
          this.state.isWinnerScreenVisible ? "" : "overflow-y-auto"
        }`}
      >
        <FullPageDialog
          showDialog={this.state.isWinnerScreenVisible}
          dialogBoxConfig={{
            primaryButtonText: "Play Again",
            secondaryButtonText: "Cancel",
            confirm: () => {
              this.setupNewGame();
              this.hideWinnerScreen();
            },
            deny: this.hideWinnerScreen,
          }}
        >
          <div className="grid h-full place-items-center text-center py-4 tablet:py-6 landscape:py-4">
            <span className="text-4xl tablet:text-5xl">🥳</span>
            <span>Ayy! Nice job!</span>
            <span>You completed the drawing</span>
          </div>
        </FullPageDialog>
        <FireworksCanvas
          className={`z-1 transition-opacity duration-300 absolute bg-black bg-opacity-70 w-full h-full ${
            this.state.isWinnerScreenVisible
              ? "opacity-100"
              : "w-0 h-0 invisible opacity-0"
          }`}
          startAnimationLoop={this.state.isWinnerScreenVisible}
        />
        <div
          className={`transition-all duration-300 ${
            this.state.isWinnerScreenVisible ? "opacity-60" : ""
          }`}
        >
          <header className="flex bg-indigo-50 px-8 py-3 items-center justify-between h-14 tablet:h-18 landscape:px-9 tablet:px-16 laptop:h-24 laptop:px-40 laptop:py-5">
            <Link to="/">
              <PixeloIcon64 className="w-4 h-auto tablet:w-6 laptop:w-8" />
            </Link>
            <PaletteBar
              colors={PixeloStateHandler.COLOR_PALETTE}
              selectedColor={this.state.currentColor}
              doUpdateSelectedColor={this.doUpdateCurrentColor}
              className="hidden w-80 tablet:grid tablet:w-106 laptop:w-134"
            />
            <div className="flex justify-between w-8/12 phone:w-1/3 landscape:w-2/6 tablet:w-56 tablet:h-10 laptop:w-72 laptop:h-13">
              <PixeloButton
                title="Start a new game"
                onClick={this.setupNewGame}
                className="px-4 laptop:px-6"
              >
                <span className="whitespace-nowrap">
                  {isSonWinning ? "Restart" : "New Game"}
                </span>
              </PixeloButton>
              <PixeloButton
                title="Undo"
                className="h-8 w-8 tablet:h-10 tablet:w-10 laptop:w-13 laptop:h-13"
                disabled={!ActionStack.isUndoPossible || isSonWinning}
                onClick={this.onUndo}
              >
                <SvgUndoArrow className="w-3 h-auto text-gray-600 fill-current laptop:w-5" />
              </PixeloButton>
              <PixeloButton
                title="Redo"
                className="h-8 w-8 tablet:h-10 tablet:w-10 laptop:w-13 laptop:h-13"
                style={{ transform: "scale(-1, 1)" }}
                disabled={!ActionStack.isRedoPossible || isSonWinning}
                onClick={this.onRedo}
              >
                <SvgUndoArrow className="w-3 h-auto text-gray-600 fill-current laptop:w-5" />
              </PixeloButton>
            </div>
          </header>
          <div className="flex items-center justify-center py-7 px-11 landscape:py-3.5 landscape:px-9 tablet:px-16 tablet:py-10 laptop:py-14 laptop:px-40">
            <section className="grid grid-rows-2 flex-1 gap-7 landscape:grid-cols-2 landscape:grid-rows-1 tablet:gap-14 laptop:gap-28">
              <DrawingPanel
                className="w-full"
                drawingMeta={this.state.templateMeta}
                doUpdateCellColor={this.doUpdateDrawingMeta}
              />
              <DrawingPanel
                className="w-full"
                drawingMeta={this.state.currentMeta}
                doUpdateCellColor={this.doUpdateDrawingMeta}
                isReadOnly={isSonWinning}
              />
            </section>
            <PaletteBar
              colors={PixeloStateHandler.COLOR_PALETTE}
              selectedColor={this.state.currentColor}
              doUpdateSelectedColor={this.doUpdateCurrentColor}
              layoutFormat="col"
              className="hidden w-7 ml-7 landscape:grid tablet:hidden"
            />
          </div>
          <footer className="flex pb-4 px-11 justify-center justify-self-end landscape:hidden tablet:hidden">
            <PaletteBar
              colors={PixeloStateHandler.COLOR_PALETTE}
              selectedColor={this.state.currentColor}
              doUpdateSelectedColor={this.doUpdateCurrentColor}
              className="grid w-full"
            />
          </footer>
        </div>
      </div>
    );
  }
}

export default GameView;
