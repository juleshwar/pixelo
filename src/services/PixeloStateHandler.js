import { COLOR_PALETTE_MAP } from "../constants/PixeloConstants";
import * as SupabaseService from "./SupabaseService";
class PixeloStateHandlerBean {
  constructor() {
    this.state = {
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

  // Concurrent callers (e.g. StrictMode's double mount) share one request instead of getting an empty list.
  getDrawings() {
    this._drawingsPromise ??= SupabaseService.fetchPresetDrawings().then(
      (presetDrawings) => {
        this.state.DRAWINGS.presetDrawings = presetDrawings.map((drawing) =>
          drawing.map((colorCode) => this.COLOR_PALETTE_MAP[colorCode])
        );
        return this.state.DRAWINGS;
      },
      (error) => {
        this._drawingsPromise = undefined; // allow a retry on the next call
        throw error;
      }
    );
    return this._drawingsPromise;
  }
}

const PixeloStateHandler = new PixeloStateHandlerBean();

export default PixeloStateHandler;
