/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "app-color": "#F9F7F0",
        "brand-color": "#E4A76F",
        "orange-text": "#CC8448",
        "light-orange": "#E5A972",
      },
      fontFamily: {
        Sansation_Regular: ["Sansation_Regular"],
        Sansation_Light: ["Sansation_Light"],
        Sansation_Light_Italic: ["Sansation_Light_Italic"],
        Sansation_Italic: ["Sansation_Italic"],
        Sansation_Bold: ["Sansation_Bold"],
        Sansation_Bold_Italic: ["Sansation_Bold_Italic"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("@tailwindcss/forms"),
  ],
};
