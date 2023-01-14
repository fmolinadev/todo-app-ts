/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "fill-yellow": "#f9b128",
      "fill-green": "#24d3c3",
      "fill-green-mid": "#1cacab",
      "text-fill": "#232323",
      "text-white": "#ffff",
      "back-grey-mid": "#1a202c",
      "back-grey-fill": "#eeeeee",
      "back-fill-dark": "#0c7c83",
      "back-fill-light": "#c8f3f0",
      "pointer-circle": "#00e059",
      "back-fill-hover": "#ffff00",
      "back-red": "#d33",
    },
  },
  plugins: [],
};
