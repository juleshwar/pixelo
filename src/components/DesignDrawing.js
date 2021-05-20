import React, { Component } from "react";
import PixeloStateHandler from "../services/PixeloStateHandler";
import * as UtilFunctions from "../services/UtilFunctions";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import PixeloInput from "./PixeloInput";
import * as AirtableService from "../services/AirtableService";
import { PRESET_DRAWINGS_BASE_NAME } from "../constants/PixeloConstants";

export class DesignDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingName: "",
      currentColor: PixeloStateHandler.COLOR_PALETTE[1],
      currentMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
    };
    this.onChangeDrawingName = this.onChangeDrawingName.bind(this);
    this.doUpdateDrawingMeta = this.doUpdateDrawingMeta.bind(this);
    this.doUpdateCurrentColor = this.doUpdateCurrentColor.bind(this);
    this.onSubmitDrawing = this.onSubmitDrawing.bind(this);
  }

  doUpdateDrawingMeta(colorIndex) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    const fromColor = modifiedMeta[colorIndex];
    const toColor = this.state.currentColor;

    // Not applying color if the same color is already present in that cell
    if (fromColor === toColor) {
      return;
    }

    modifiedMeta[colorIndex] = toColor;
    this.setState({ currentMeta: modifiedMeta });
  }

  doUpdateCurrentColor(color) {
    this.setState({ currentColor: color });
    UtilFunctions.modifyCursorOnColorSelect(color);
  }

  async onSubmitDrawing(submitEvent) {
    submitEvent.preventDefault();
    const payload = {
      name: this.state.drawingName.toUpperCase(),
      template: JSON.stringify(this.state.currentMeta),
    };
    await AirtableService.postData(PRESET_DRAWINGS_BASE_NAME, payload);
    this.resetDrawing();
  }

  resetDrawing() {
    this.setState({
      drawingMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
    });
    this.setState({ drawingName: "" });
  }

  componentDidMount() {
    UtilFunctions.modifyCursorOnColorSelect(this.state.currentColor);
  }

  onChangeDrawingName(newName) {
    this.setState({ drawingName: newName });
  }

  render() {
    return (
      <div className="grid py-4 place-items-center gap-3 h-screen">
        <PaletteBar
          colors={PixeloStateHandler.COLOR_PALETTE}
          selectedColor={this.state.currentColor}
          doUpdateSelectedColor={this.doUpdateCurrentColor}
        />
        <DrawingPanel
          drawingMeta={this.state.currentMeta}
          doUpdateCellColor={this.doUpdateDrawingMeta}
          isReadOnly={false}
        />
        <form className="grid gap-6 justify-start">
          <PixeloInput
            label={"Drawing Name"}
            required={true}
            placeholder={"a nice name pls"}
            value={this.state.drawingName}
            errorMessage={"Name give pls. Good name give okay?"}
            onChangeHandler={this.onChangeDrawingName}
          />
          <button
            className="px-6 py-2 bg-gradient-to-r from-red-400 to-indigo-400 text-white"
            onClick={this.onSubmitDrawing}
          >
            Submit Drawing
          </button>
        </form>
      </div>
    );
  }
}

export default DesignDrawing;
