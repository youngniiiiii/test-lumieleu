/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['serif', 'Noto Sans'],
      },
      colors: {
        /* Colors */
        black: '#000000',
        white: ' #ffffff',
        content: '#333333',
        gray50: '#f9f9f9',
        gray100: '#F7F7F7',
        gray200: '#F0F0F',
        gray300: '#E8E8E8',
        gray400: '#E1E1E1',
        gray500: '#D9D9D9',
        gray600: '#AEAEAE',
        gray700: '#828282',
        gray750: '#666666',
        gray800: '#575757',
        gray900: '#2B2B2B',
        yellow: '#FEE500',
        infoError: '#f03f40',
        infoCorrect: '#1859FF',
      },
      width: {
        '3/10': '30%',
      },
    },
  },
  plugins: [],
};
