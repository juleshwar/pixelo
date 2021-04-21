import DRAWINGS from "../constants/components/DrawingPanelConstants";

function compareDrawingMeta(metaA, metaB) {
  return String(metaA) === String(metaB);
}

function getRandomTemplate() {
  const drawingIndex = Math.floor(
    Math.random() * DRAWINGS.presetDrawings.length
  );
  return DRAWINGS.presetDrawings[drawingIndex];
}

export { compareDrawingMeta, getRandomTemplate };
