const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-primary', 'text-primary',
    'bg-secondary', 'text-secondary',
    'text-neutral-dark', 'text-neutral-medium',
    'bg-neutral-dark', 'bg-neutral-medium',
    'text-white', 'bg-white',
    'hover:bg-primary', 'hover:text-primary',
    'hover:bg-secondary', 'hover:text-secondary',
    'hover:text-white', 'hover:bg-white',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0047AB',         // Aerion Blue
        secondary: '#FFF000',       // Bright Yellow
        dark: '#000000',
        light: '#FFFFFF',
        success: '#00B894',
        danger: '#E17055',
        warning: '#FDCB6E',
        info: '#0984E3',
        'neutral-dark': '#2D3436',
        'neutral-medium': '#A4A4A4',
        'neutral-light': '#F8F8F8',
        'neutral-white': '#FFFFFF',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 10px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [forms],
};
