/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
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
};
