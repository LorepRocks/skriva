// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-black": "#000",
        "bg-info": "rgba(254,254,254,0.7)",
      },
      height: {
        120: "120px",
        25: "25rem",
      },
      width: {
        80: "80px",
        24: "24rem",
      },
      spacing: {
        35: "35px", // following the standard of 128 / 4 = 32
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
