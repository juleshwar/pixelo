const COLORS = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GREY: "#9CA3AF",
  YELLOW: "#FBBF24",
  GREEN: "#34D399",
  BLUE: "#60A5FA",
  PURPLE: "#818CF8",
  RED: "#EF4444",
  PINK: "#F472B6",
  ORANGE: "#F59E0B",
  DARK_GREEN: "#059669",
};

let COLOR_PALETTE = [];
for (const colorKey in COLORS) {
  if (Object.hasOwnProperty.call(COLORS, colorKey)) {
    COLOR_PALETTE.push(COLORS[colorKey]);
  }
}

export { COLORS, COLOR_PALETTE };
