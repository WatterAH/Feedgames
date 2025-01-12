import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        barcelona: "#fafafa",
        threads: "#202020",
        coal: "#101010",
        icon: "#b8b8b8",
        secondaryicon: "#999",
        loading: "#eaeaea",
        outline: "#333638",
        darkgray: "#424242",
      },
      fontFamily: {
        pacifico: ["var(--font-pacifico)"],
        raleway: ["var(--font-raleway)"],
        montserrat: ["var(--font-montserrat)"],
        inter: ["var(--font-inter)"],
      },
      maxWidth: {
        "2xl": "38rem",
      },
    },
  },
  plugins: [],
};
export default config;
