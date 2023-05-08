import colors from 'tailwindcss/colors';

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.white,
        primaryDark: colors.gray['800'],
        secondary: colors.gray['200'],
        secondaryDark: colors.gray['700'],
        error: colors.red['500'],
        success: colors.green['500'],
      },
    },
  },
  plugins: [],
};
