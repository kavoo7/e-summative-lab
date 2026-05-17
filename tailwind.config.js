/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: '#FBEAD6',
        'dried-thyme': '#6B7556',
        'antique-rose': '#C87D87',
        blush: '#F0C4C8',
        bisque: '#E5BCA9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}