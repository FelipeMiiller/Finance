/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'Default': ["Roboto", "sans-serif"],
      'dancing': ["Dancing Script"],
    },
    extend: {
      colors: {

        gray:{
          900: "#181B23",
          800: "#1F2029",
          700: "#353646",
          600: "#4B4D63",
          500: "#616480",
          400: "#797D9A",
          300: "#9699B0",
          200: "#B3B5C6",
          100: "#D1D2DC",
          50: "#EEEEF2",
        },
      },
     // backgroundImage: {
     //   'lofi': "url('./public/images/blog.png')",
     // },
      
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    
  ],
};
