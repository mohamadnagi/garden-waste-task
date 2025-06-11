/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#00809D",
        primary: {
          DEFAULT: "#00809D",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF7601",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#FCECDD",
          foreground: "#00809D",
        },
        accent: {
          DEFAULT: "#F3A26D",
          foreground: "#00809D",
        },
        destructive: {
          DEFAULT: "#FF7601",
          foreground: "#FFFFFF",
        },
        border: "#00809D",
        selected: {
          DEFAULT: "#00809D",
          foreground: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
