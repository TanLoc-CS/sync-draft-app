/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',  // Full width on small screens
        md: '600px', // Custom width for medium screens
        lg: '768px', // Custom width for large screens
        xl: '962px',
        '2xl': '1024px',
        '3xl': '1280px',
        '4xl': '1536px', // Custom width for extra large screens
        '5xl': '1600px',
        '6xl': '1920px', // Custom width for 2xl screens
      }
    },
    extend: {},
  },
  plugins: [],
}