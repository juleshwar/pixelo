import DRAWINGS from "../constants/components/DrawingPanelConstants";
import { COLORS } from "../constants/components/PaletteBarConstants";

function compareDrawingMeta(metaA, metaB) {
  return String(metaA) === String(metaB);
}

function getRandomTemplate() {
  const drawingIndex = Math.floor(
    Math.random() * DRAWINGS.presetDrawings.length
  );
  return DRAWINGS.presetDrawings[drawingIndex];
}

function modifyCursorOnColorSelect(color) {
  const cursorNameMap = {
    [COLORS.WHITE]: "white",
    [COLORS.BLACK]: "black",
    [COLORS.GREY]: "grey",
    [COLORS.YELLOW]: "yellow",
    [COLORS.GREEN]: "green",
    [COLORS.BLUE]: "blue",
    [COLORS.PURPLE]: "purple",
    [COLORS.RED]: "red",
    [COLORS.PINK]: "pink",
    [COLORS.ORANGE]: "orange",
    [COLORS.DARK_GREEN]: "dark-green",
  };

  // without setTimeout, the cursor only updates if a mousemove occurs. Else it stays the same as the previous color
  setTimeout(() => {
    document.body.style.cursor = `url(/assets/cursors/${cursorNameMap[color]}.png), auto`;
  });
}

export { compareDrawingMeta, getRandomTemplate, modifyCursorOnColorSelect };
