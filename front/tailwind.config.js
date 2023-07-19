/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        boxShadow: {
          'default' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
          'hover': '0 0 4px rgb(14 165 233), 0 0 8px rgb(14 165 233), 0 0 16px rgb(14 165 233)'
        }
      },
    },
    plugins: [],
  }