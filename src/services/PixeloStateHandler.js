import {
  COLOR_PALETTE_MAP,
  PRESET_DRAWINGS_BASE_NAME,
} from "../constants/PixeloConstants";
import * as AirtableService from "./AirtableService";
class PixeloStateHandlerBean {
  constructor() {
    this.state = {
      drawingsDataLoading: false,
      colorsDataLoading: false,
      DRAWINGS: [],
    };
  }

  get COLOR_PALETTE_MAP() {
    return COLOR_PALETTE_MAP;
  }

  get COLOR_PALETTE() {
    const palette = [];
    for (const key in this.COLOR_PALETTE_MAP) {
      palette.push(this.COLOR_PALETTE_MAP[key]);
    }
    return palette;
  }

  async getDrawings() {
    if (
      !Object.entries(this.state.DRAWINGS).length &&
      !this.state.drawingsDataLoading
    ) {
      let { presetDrawings, cleanSlate } = await this._fetchDrawings();
      cleanSlate = cleanSlate.map(
        (colorCode) => this.COLOR_PALETTE_MAP[colorCode]
      );
      presetDrawings = presetDrawings.map((drawing) =>
        drawing.map((colorCode) => this.COLOR_PALETTE_MAP[colorCode])
      );

      this.state.DRAWINGS = { cleanSlate, presetDrawings };
      return { cleanSlate, presetDrawings };
    } else {
      return this.state.DRAWINGS;
    }
  }

  async _fetchDrawings() {
    this.state.drawingsDataLoading = true;
    const presetDrawingsResponse = await AirtableService.fetchData(
      PRESET_DRAWINGS_BASE_NAME
    );
    this.state.drawingsDataLoading = false;

    return presetDrawingsResponse.reduce(
      (accumulator, record) => {
        const name = record.get("name");
        const template = JSON.parse(record.get("template"));
        if (name === "CLEAN_SLATE") {
          accumulator.cleanSlate = template;
        } else {
          accumulator.presetDrawings.push(template);
        }

        return accumulator;
      },
      { presetDrawings: [] }
    );
  }
}

const PixeloStateHandler = new PixeloStateHandlerBean();

export default PixeloStateHandler;
