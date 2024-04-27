/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/assets/icons/*.svg'
  ],
  theme: {
    fontFamily: {},
    extend: {
      fontSize: {}, 
      colors: {}
    }
  },
  plugins: []
}


