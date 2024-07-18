/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0c0017',
        secondary: '#1d1128',
        tertiary: '#6e54ff',
        quaternary: '#ccccea',
        customWhite: '#fffdfd'
      }
    },
  },
  plugins: [],
}

