import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        system: {
          hotOrange10: "#281202",
          hotOrange15: "#421604",
          hotOrange20: "#4a2413",
          hotOrange30: "#7e2600",
          hotOrange40: "#aa3001",
          hotOrange50: "#d83a00",
          hotOrange60: "#ff5d2d",
          hotOrange65: "#ff784f",
          hotOrange70: "#ff906e",
          hotOrange80: "#feb9a5",
          hotOrange90: "#ffded5",
          hotOrange95: "#fef1ed",

          green10: "#071b12",
          green15: "#0c2912",
          green20: "#1c3326",
          green30: "#194e31",
          green40: "#396547",
          green50: "#2e844a",
          green60: "#3ba755",
          green65: "#41b658",
          green70: "#45c65a",
          green80: "#91db8b",
          green90: "#cdefc4",
          green95: "#ebf7e6",
          green100: "#202b23",

          commie: "#ea001e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
