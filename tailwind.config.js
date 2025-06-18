/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated Aerion brand colors with shades for better UI effects
        'aerion-blue': {
          DEFAULT: '#2B3E93',  // Base blue from the logo
          light: '#425AD0',   // Lighter shade for subtle accents or backgrounds
          dark: '#1C2C6E',    // Darker shade for hover states or deeper elements
        },
        'aerion-yellow': {
          DEFAULT: '#FFDE00', // Base yellow from the logo
          dark: '#E6CC00',    // Darker shade for hover states or strong accents
        },
        // Neutral palette for backgrounds, text, borders
        'neutral-dark': '#1A1A1A',   // Very dark gray, almost black, for main text/elements
        'neutral-medium': '#4A4A4A', // Medium gray for secondary text
        'neutral-light': '#F8F8F8',  // Very light gray for backgrounds
        'neutral-white': '#FFFFFF',  // Pure white for content cards/panels
      },
      // You can extend other Tailwind properties here if needed (e.g., fontSize, spacing)
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Example: If you want to use the Inter font
      },
      boxShadow: {
        'custom-light': '0 4px 10px rgba(0, 0, 0, 0.05)', // Custom light shadow
        'custom-medium': '0 8px 20px rgba(0, 0, 0, 0.1)', // Custom medium shadow
      }
    },
  },
  plugins: [],
};
