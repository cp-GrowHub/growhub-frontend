/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bekgron: '#141314',
        text: '#E6E1E3',
        card1: '#211F21',
        card2: '#2E2D2E',
        card3: '#282830',
        card4: '#636363',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
