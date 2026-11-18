/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#72090F',
        charcoal: '#181818',
        smoke: '#A6A6A6',
        ivory: '#F1EFEA',
        gold: '#BE922F',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        script: ['Herr Von Muellerhoff', 'Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
