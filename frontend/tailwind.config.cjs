/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'inherit',
      blackShade: '#141414',
      purple: '#700965',
      gray: '#D9D9D9',
      textPurple: '#242565',
      lightGray: '#789EAC',
      darkPurple: '#140C1F',
      white: '#FFFFFF',
      blue: '#15BFFD',
      lightBlue: '#F2F4FF',

    },
    extend: {
      maxWidth: {
        '8xl': '1400px',
      }
    },
  },
  plugins: [],
}