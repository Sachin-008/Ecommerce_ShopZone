/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#a855f7",
        accent: "#f43f5e",
        dark: "#0f172a",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
