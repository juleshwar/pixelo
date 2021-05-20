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

export { compareDrawingMeta, getRandomTemplate, modifyCursorOnColorSelect };
