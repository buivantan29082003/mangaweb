/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-150%) rotate(25deg)' },
          '100%': { transform: 'translateX(150%) rotate(25deg)' },
        },
      },
      animation: {
        shine: 'shine 2s linear infinite',
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "'Noto Sans'",
          "sans-serif",
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
      }
    },
  },
  plugins: [],
}