import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef8f2",
          100: "#d7efde",
          200: "#afdcbc",
          300: "#82c493",
          400: "#57a86d",
          500: "#2f8a50",
          600: "#1b6f3c",
          700: "#145a31",
          800: "#104728",
          900: "#0b321c",
        },
        cream: "#fbf9f3",
        sand: "#efe4cc",
        ink: "#182118",
        kkdred: "#d64032",
        blush: "#f5d9d4",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 71, 40, 0.12)",
        card: "0 14px 40px rgba(16, 71, 40, 0.08)",
      },
      fontFamily: {
        sans: ["'Pretendard Variable'", "Pretendard", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(28, 38, 23, 0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
