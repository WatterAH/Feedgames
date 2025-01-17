import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        border: "var(--border)",
        hover: "var(--hover)",
        loader: "var(--loader)",
        blur: "var(--blur)",
        placeholder: "var(--placeholder)",
        "menu-icon": "var(--menu-icon)",
        // GLOBAL COLORS
        barcelona: "#fafafa",
        threads: "#202020",
        coal: "#101010",
        icon: "#b8b8b8",
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
