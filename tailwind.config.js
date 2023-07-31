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
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
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
