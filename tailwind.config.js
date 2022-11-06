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
