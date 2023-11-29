/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#ff0000",
        blue: { DEFAULT: "#4299e1", 300: "#68afea" },
        secondary: { DEFAULT: "#262666", 200: "#26266680", 100: "#26266666" },
        tertiary: "#f5f5dc",
      },
      fontWeight: {
        semibold: 500,
      },
    },
  },
  plugins: [],
};
