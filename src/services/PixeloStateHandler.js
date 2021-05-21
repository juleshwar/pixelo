import {
  COLOR_PALETTE_MAP,
  PRESET_DRAWINGS_BASE_NAME,
} from "../constants/PixeloConstants";
import * as AirtableService from "./AirtableService";
class PixeloStateHandlerBean {
  constructor() {
    this.state = {
      drawingsDataLoading: false,
      DRAWINGS: {
        cleanSlate: Array(100).fill(this.COLOR_PALETTE_MAP["WHITE"]),
        presetDrawings: [],
      },
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
      !this.state.DRAWINGS.presetDrawings.length &&
      !this.state.drawingsDataLoading
    ) {
      let presetDrawings = await this._fetchPresetDrawings();
      presetDrawings = presetDrawings.map((drawing) =>
        drawing.map((colorCode) => this.COLOR_PALETTE_MAP[colorCode])
      );

      this.state.DRAWINGS.presetDrawings = presetDrawings;
    }
    return this.state.DRAWINGS;
  }

  async _fetchPresetDrawings() {
    this.state.drawingsDataLoading = true;
    const presetDrawingsResponse = await AirtableService.fetchData(
      PRESET_DRAWINGS_BASE_NAME
    );
    this.state.drawingsDataLoading = false;

    return presetDrawingsResponse.map((record) =>
      JSON.parse(record.get("template"))
    );
  }
}

const PixeloStateHandler = new PixeloStateHandlerBean();

export default PixeloStateHandler;
