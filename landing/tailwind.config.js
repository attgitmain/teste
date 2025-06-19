/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#77D2FE",
        secondary: "#1E3A8A",
        accent: "#F472B6",
      },
    },
  },
  plugins: [],
};
