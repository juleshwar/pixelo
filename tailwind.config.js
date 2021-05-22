module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        inherit: "inherit",
      },
      spacing: {
        0.75: "0.187rem",
        3.75: "0.937rem",
        120: "40rem",
      },
      screens: {
        phone: "640px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        "desktop-xl": "1536px" /* External Displays */,
        landscape: { raw: "(orientation: landscape)" },
      },
      boxShadow: {
        "color-cell": "0px 0px 8px 0px rgba(56, 56, 56, 0.1)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
      borderColor: ["disabled"],
      cursor: ["hover", "disabled"],
    },
  },
  plugins: [],
};
