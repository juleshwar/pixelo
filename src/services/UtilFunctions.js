import { DEVICE_TYPE } from "../constants/PixeloConstants";
import PixeloStateHandler from "./PixeloStateHandler";

function compareDrawingMeta(metaA, metaB) {
  return String(metaA) === String(metaB);
}

function getRandomTemplate() {
  const DRAWINGS = PixeloStateHandler.state.DRAWINGS;
  const drawingIndex = Math.floor(
    Math.random() * DRAWINGS.presetDrawings.length
  );
  return DRAWINGS.presetDrawings[drawingIndex];
}

async function modifyCursorOnColorSelect(color) {
  const COLORS = PixeloStateHandler.COLOR_PALETTE_MAP;
  const cursorNameMap = {
    [COLORS.WHITE]: "white",
    [COLORS.BLACK]: "black",
    [COLORS.GREY]: "grey",
    [COLORS.GREEN]: "green",
    [COLORS.BLUE]: "blue",
    [COLORS.PURPLE]: "purple",
    [COLORS.RED]: "red",
    [COLORS.PINK]: "pink",
    [COLORS.ORANGE]: "orange",
  };

  // without setTimeout, the cursor only updates if a mousemove occurs. Else it stays the same as the previous color
  setTimeout(() => {
    document.body.style.cursor = `url(/assets/cursors/${cursorNameMap[color]}.png), auto`;
  });
}

function getRandomNumberInclusiveWithinRange(a, b) {
  return Math.min(a, b) + Math.floor(Math.random() * (Math.abs(b - a) + 1));
}

function getDeviceType() {
  const uA = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(uA)) {
    return DEVICE_TYPE.TABLET;
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      uA
    )
  ) {
    return DEVICE_TYPE.MOBILE;
  }
  return DEVICE_TYPE.DESKTOP;
}

export {
  getDeviceType,
  compareDrawingMeta,
  getRandomTemplate,
  modifyCursorOnColorSelect,
  getRandomNumberInclusiveWithinRange,
};
