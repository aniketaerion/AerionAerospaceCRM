/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0047AB',    // Aerion Blue
        accent: '#FFF000',     // Aerion Yellow
        neutral: '#000000',
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
