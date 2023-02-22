/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('./assets/images/bg-1.png')"
      }
    }
  },
  plugins: []
}
