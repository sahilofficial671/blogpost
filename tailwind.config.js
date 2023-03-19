/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Satisfy', 'cursive'],
        theme: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
