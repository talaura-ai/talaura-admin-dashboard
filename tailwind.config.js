/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        lg: {
          max: '1200px',
        },
        mq1050: {
          raw: 'screen and (max-width: 1050px)',
        },
        mq750: {
          raw: 'screen and (max-width: 750px)',
        },
        mq450: {
          raw: 'screen and (max-width: 450px)',
        },
      },

      fontSize: {
        '5xl': '1.5rem',
        lgi: '1.188rem',
        mid: '1.063rem',
        sm: '0.875rem',
        '26xl': '2.813rem',
        '8xl': '1.688rem',
        '17xl': '2.25rem',
        xl: '1.25rem',
        base: '1rem',
        '20xl': '2.438rem',
        '4xl': '1.438rem',
        '12xl': '1.938rem',
        inherit: 'inherit',
      },
      colors: {
        'regal-blue': '#243c5a',
        'app-color': '#F9F7F0',
        'brand-color': '#E4A76F',
        'orange-text': '#CC8448',
        'light-orange': '#E5A972',
        white: { DEFAULT: '#fff', 200: '#ffffff99' },
        floralwhite: '#f9f7f0',
        gainsboro: '#d9d9d9',
        black: '#000',
        burlywood: {
          100: '#f2bc84',
          200: '#e8ad75',
        },
        red: {
          400: '#FB2121',
        },
        customGray: {
          20: '#E0E0E0',
          30: '#F2F5FA',
          50: '#ABAAA7',
          70: '#EFEFEF',
          75: '#eee',
          80: '#D4D3D3',
          90: '#EFF0F6',
          100: '#7d7c7c',
          150: '#ccc',
          200: '#0b0b0b',
          250: '#0000004c',
          300: '#0000007f',
          400: '#f3f4f6',
        },
        green: {
          100: '#D2F8CB',
          200: '#E4FFE0',
          300: '#27A468',
          400: '#40B24B',
        },
        golden: {
          200: '#cc844899',
          700: '#D8B968',
        },
        antiquewhite: '#ffefdf',
        'light-gold': '#F5DFC9',
        sandybrown: '#e4a76f',
        lightgray: '#d6d6d6',
        peru: {
          100: '#cc8448',
          200: '#b36b2e',
        },
      },
      fontFamily: {
        sansation: 'Sansation',

        Sansation_Regular: ['Sansation_Regular'],
        Sansation_Light: ['Sansation_Light'],
        Sansation_Light_Italic: ['Sansation_Light_Italic'],
        Sansation_Italic: ['Sansation_Italic'],
        Sansation_Bold: ['Sansation_Bold'],
        Sansation_Bold_Italic: ['Sansation_Bold_Italic'],
      },
      borderRadius: {
        xl: '20px',
        '8xs': '5px',
        mini: '15px',
        '3xs': '10px',
      },
    },
  },

  plugins: [
    require('tailwindcss-animation-delay'),
    require('@tailwindcss/forms'),
  ],
};
