/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        inkmuted: "#5B6B82",
        bgdark: "#0B1220",
        bgdark2: "#111C33",
        card: "#F1F5F9",
        card2: "#E8F6F3",
        teal: {
          DEFAULT: "#0F9D8C",
          dark: "#0B6E63",
          bright: "#2DD4BF",
        },
        ice: "#9FE9DD",
        amber: "#F5A524",
        line: "#DCE4EC",
      },
      fontFamily: {
        head: ["Cambria", "Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 20px rgba(11, 18, 32, 0.08)",
      },
    },
  },
  plugins: [],
};
