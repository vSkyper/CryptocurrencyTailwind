import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.white,
        primaryDark: colors.gray['800'],
        secondary: colors.gray['300'],
        secondaryDark: colors.gray['700'],
        tertiary: colors.blue['500'],
        error: colors.red['500'],
        success: colors.green['500'],
      },
    },
  },
  plugins: [],
};
