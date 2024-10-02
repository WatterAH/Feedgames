import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        barcelona: "#fafafa",
        threads: "#202020",
      },
      fontFamily: {
        pacifico: ["var(--font-pacifico)"],
        raleway: ["var(--font-raleway)"],
        montserrat: ["var(--font-montserrat)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
export default config;
