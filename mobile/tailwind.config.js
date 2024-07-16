/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "dark-gray": "#202020",
        "light-gray": "#eaeaea",
        "gray-uni": "#777",
      },
    },
  },
  plugins: [],
};
