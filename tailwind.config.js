/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Default: ["Roboto", "sans-serif"],
      dancing: ["Dancing Script"],
    },
    extend: {
      colors: {
        gray: {
          900: "#171923",
          800: "#1A202C",
          700: "#2D3748",
          600: "#4A5568",
          500: "#718096",
          400: "#A0AEC0",
          300: "#CBD5E0",
          200: "#E2E8F0",
          100: "#EDF2F7",
          50: "#F7FAFC",
        },
        paleta: {
          500: "#13293d",
          400: "#006494",
          300: "#247ba0",
          200: "#1b98e0",
          100: "#e8f1f2",
        },
        paleta2: {
          500: "#02111B",
          400: "#30292F",
          300: "#3F4045",
          200: "#5D737E",
          100: "#FCFCFC",
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
  plugins: [],
};


