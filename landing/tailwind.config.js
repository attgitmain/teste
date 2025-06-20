/* tailwind.config.js - customização de cores e purge */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#1D4ED8'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Orbitron', 'Inter', 'ui-sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
