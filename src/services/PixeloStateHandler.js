import * as AirtableService from "./AirtableService";

const PRESET_DRAWINGS_BASE_NAME = "Preset Drawings";
const PALETTE_COLORS_BASE_NAME = "Palette";

class PixeloStateHandlerBean {
  constructor() {
    this.state = {
      drawingsDataLoading: false,
      colorsDataLoading: false,
      DRAWINGS: [],
      COLORS: {},
    };
  }

  get COLOR_PALETTE() {
    const palette = [];
    const colors = this.state.COLORS;
    for (const key in colors) {
      palette.push(colors[key]);
    }
    return palette;
  }

  async getDrawings() {
    if (
      !Object.entries(this.state.COLORS).length &&
      !this.state.colorsDataLoading
    ) {
      /**
       * Sanity check for presence of this.state.COLORS as the drawings are dependent
       * on them
       */
      await this._getColors();
    }

    if (
      !Object.entries(this.state.DRAWINGS).length &&
      !this.state.drawingsDataLoading
    ) {
      let { presetDrawings, cleanSlate } = await this._fetchDrawings();
      cleanSlate = cleanSlate.map((colorCode) => this.state.COLORS[colorCode]);
      presetDrawings = presetDrawings.map((drawing) =>
        drawing.map((colorCode) => this.state.COLORS[colorCode])
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

  async _getColors() {
    if (
      !Object.entries(this.state.COLORS).length &&
      !this.state.colorsDataLoading
    ) {
      const colors = await this._fetchColors();
      this.state.COLORS = colors;
      return colors;
    } else {
      return this.state.COLORS;
    }
  }

  async _fetchColors() {
    this.state.colorsDataLoading = true;
    const paletteColorsResponse = await AirtableService.fetchData(
      PALETTE_COLORS_BASE_NAME
    );
    this.state.colorsDataLoading = false;

    return paletteColorsResponse.reduce((accumulator, colorData) => {
      accumulator[colorData.get("name")] = colorData.get("hexCode");
      return accumulator;
    }, {});
  }
}

const PixeloStateHandler = new PixeloStateHandlerBean();

window.PS = PixeloStateHandler;

export default PixeloStateHandler;
