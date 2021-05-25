import React, { Component } from "react";
import PixeloStateHandler from "../services/PixeloStateHandler";
import * as UtilFunctions from "../services/UtilFunctions";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import PixeloInput from "./PixeloInput";
import * as AirtableService from "../services/AirtableService";
import {
  REVERSE_COLOR_PALETTE_MAP,
  PRESET_DRAWINGS_BASE_NAME,
} from "../constants/PixeloConstants";

export class DesignDrawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawingName: "",
      currentColor: PixeloStateHandler.COLOR_PALETTE[1],
      currentMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
      isSubmittingDesign: false,
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
    this.setState({ isSubmittingDesign: true });
    const colorMappedMeta = this.state.currentMeta.map(
      (hex) => REVERSE_COLOR_PALETTE_MAP[hex]
    );
    const payload = {
      name: this.state.drawingName.toUpperCase().replaceAll(" ", "_"),
      template: JSON.stringify(colorMappedMeta),
    };
    await AirtableService.postData(PRESET_DRAWINGS_BASE_NAME, payload);
    this.setState({ isSubmittingDesign: false });
    this.resetDrawing();
  }

  resetDrawing() {
    this.setState({
      currentMeta: PixeloStateHandler.state.DRAWINGS.cleanSlate,
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
          className="w-106"
          colors={PixeloStateHandler.COLOR_PALETTE}
          selectedColor={this.state.currentColor}
          doUpdateSelectedColor={this.doUpdateCurrentColor}
        />
        <DrawingPanel
          className="w-106"
          drawingMeta={this.state.currentMeta}
          doUpdateCellColor={this.doUpdateDrawingMeta}
          isReadOnly={false}
        />
        <form className="grid gap-6 justify-start">
          <PixeloInput
            label={"Drawing Name"}
            value={this.state.drawingName}
            errorMessage={"Name give pls. Good name give okay?"}
            onChangeHandler={this.onChangeDrawingName}
            inputAttributes={{
              required: true,
              placeholder: "a nice name pls",
            }}
          />
          <button
            className={`px-6 py-2 bg-gradient-to-r from-red-400 to-indigo-400 text-white ${
              this.state.isSubmittingDesign ? "animate-pulse" : ""
            }`}
            disabled={this.state.isSubmittingDesign}
            onClick={this.onSubmitDrawing}
          >
            {this.state.isSubmittingDesign ? "Submitting..." : "Submit Drawing"}
          </button>
        </form>
      </div>
    );
  }
}

export default DesignDrawing;
