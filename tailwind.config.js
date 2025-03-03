/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",     
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        orelega:["Orelega One", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        otomanopee: ["Otomanopee One", "sans-serif"]
      },
      colors: {
        primary: "#6B8DE0",
        purple: "#595BD4"
      }
    },
  },
  plugins: [],
}

