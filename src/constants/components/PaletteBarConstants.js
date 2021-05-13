const COLORS = {
  WHITE: "#FFFFFF",
  BLACK: "#1F2937",
  GREY: "#9CA3AF",
  GREEN: "#10B981",
  BLUE: "#60A5FA",
  RED: "#BE185D",
  PINK: "#F87171",
  ORANGE: "#F59E0B",
  PURPLE: "#8B5CF6",
};

let COLOR_PALETTE = [];
for (const colorKey in COLORS) {
  if (Object.hasOwnProperty.call(COLORS, colorKey)) {
    COLOR_PALETTE.push(COLORS[colorKey]);
  }
}

export { COLORS, COLOR_PALETTE };
