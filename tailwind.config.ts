import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      caveat: ["Caveat"],
    },
    extend: {
      colors: {
        auburnBlue: {
          900: "#0b2341",
          800: "#233954",
          700: "#3c4f67",
          600: "#54657a",
          500: "#6d7b8d",
          400: "#8591a0",
          300: "#9da7b3",
          200: "#b6bdc6",
          100: "#ced3d9",
          50: "#e7e9ec",
        },
        auburnOrange: {
          900: "#e86100",
          800: "#ea711a",
          700: "#ed8133",
          600: "#ef904d",
          500: "#f1a066",
          400: "#f3b080",
          300: "#f6c099",
          200: "#f8d0b2",
          100: "#fadfcc",
          50: "#fdefe5",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
