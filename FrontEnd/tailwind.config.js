/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'darkb': '#0C356A',
      'midb': '#279EFF',
      'lightb': '#40F8FF',
      'green': '#D5FFD0',
      'yellow': '#FFC72C',
      'grey': '#F6F6F6',
    },
    backgroundImage: {
      'meds' : "url('./src/assets/bg/meds.jpg')",
      'camp' : "url('./src/assets/bg/bg1.jpg')",
      'family' : "url('./src/assets/bg/fam.jpg')",
      'medcamp' : "url('./src/assets/bg/bg2.jpeg')",
      'doc' : "url(./src/assets/bg/bg5.jpg)"
    }
  },
  plugins: [],
}

