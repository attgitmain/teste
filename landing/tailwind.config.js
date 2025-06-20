/* tailwind.config.js - customização de cores e purge */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#1D4ED8'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
