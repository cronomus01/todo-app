/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'desktop': '17em 1fr',
        'mobile': '5em 1fr',
      }, 
      gridTemplateRows: {
        'content': '60px 1fr',
      },
    },
  },
  plugins: [],
}

