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
    extend: {
      fontFamily: {
        body: "var(--font-outfit), sans-serif",
      },
      colors: {
        'primary': '#141627',
        'btn-color': '#5841D9',
        'chat': '#1C1F37',
        'border': '#1C1E26',
        'logo': '#54b4f4'
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
