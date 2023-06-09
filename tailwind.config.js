/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["monospace"],
    },
    extend: {
      colors: {
        orange: {
          50: "#ffe9bf",
          100: "#ffdd99",
          200: "#ffd072",
          300: "#ffc34c",
          400: "#ffb626",
          500: "#ffaa00",
          600: "#d89000",
          700: "#b27600",
          800: "#8c5d00",
          900: "#664400",
        },
      },
    },
  },
  plugins: [],
};
