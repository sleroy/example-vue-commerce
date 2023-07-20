const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './src/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    colors: {
      blue_light: '#b9e2fc',
      blue: '#51bafc',
      black: '#000000',
      white: '#ffffff',
      grey_light: '#F5F5F5',
      grey_dark: '#515151',
      red: colors.red,
      green: '#24e527',
      gold: '#f1c40f',
      warning: {
        50: '#fdfce9',
        100: '#fcf9c5',
        200: '#faf08e',
        300: '#f8e45c',
        400: '#f3cf1c',
        500: '#e3b60f',
        600: '#c48e0a',
        700: '#9c650c',
        800: '#815012',
        900: '#6e4215',
        950: '#402208'
      }
    },
    variants: {
      opacity: ['responsive', 'hover', 'focus', 'disabled'],
      backgroundColor: ['responsive', 'hover', 'focus', 'disabled']
    },
    extend: {
      boxShadow: {
        custom: '0 0px 3px 1px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
}
