module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        inherit: "inherit",
      },
      fontSize: {
        inherit: "inherit",
      },
      spacing: {
        0.75: "0.187rem",
        3.75: "0.937rem",
        13: "3.25rem",
        18: "4.5rem",
        84: "21rem",
        106: "26.5rem",
        134: "33.5rem",
        120: "40rem",
      },
      boxShadow: {
        "color-cell": "0px 0px 8px 0px rgba(56, 56, 56, 0.1)",
      },
      animation: {
        "octocat-wave": "octocat-wave 500ms ease-in-out",
      },
      keyframes: {
        "octocat-wave": {
          "0%, 100%": {
            transform: "rotate(0)",
          },
          "20%, 60%": {
            transform: "rotate(-25deg)",
          },
          "40%, 80%": {
            transform: "rotate(10deg)",
          },
        },
      },
    },
    screens: {
      /* Screen orientations */
      landscape: { raw: "(orientation: landscape)" },

      phone: "640px",
      tablet: "834px",
      laptop: "1025px",
      desktop: "1280px",
      "desktop-xl": "1536px" /* External Displays */,
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
      borderColor: ["disabled"],
      cursor: ["hover", "disabled"],
      animation: ["hover"],
    },
  },
  plugins: [],
};
