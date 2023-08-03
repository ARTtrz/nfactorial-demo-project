/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},

      'xs': {'max': '480px'},
      // => @media (max-width: 639px) { ... }
      'smm': '640px'
    }, 
    extend: {
      fontFamily: {
        body: "var(--font-outfit), sans-serif",
      },
      colors: {
        'primary': '#EBF8F8',
        'non-primary': '#141627',
        'btn-color': '#5841D9',
        'chat': '#1C1F37',
        'border': '#EBF8F8',
        'logo': '#54b4f4',
        'bg': '#EBF8F8',
        'chat-bg': '#eee'
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
