/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['sm:hidden', '2xl:hidden', '2xl:block', 'h-[400px]'],
  theme: {
    borderRadius: {
      '2xs': '4px',
      'xs': '8px',
      'sm': '12px',
      'md': '16px',
      'lg': '20px',
      'xl': '24px',
      '2xl': '28px',
      '3xl': '32px',
      '4xl': '36px',
      'full': '9999px',
    },
    colors: {
      white: '#FDFDFD',
      lightGrey: '#A1A1A1',
      grey: '#545454',
      darkGrey: '#242426',
      darkerGrey: '#1A1A1A',
      black: '#161616',
      green: '#5A9694',
      red: '#A95454',
      blue1: '#74A7C3',
      blue2: '#8AC1E0',
      transparent: 'transparent',
    },
    fontSize: {
      'xs': '12px',
      'sm': '14px',
      'base': '16px',
      'lg': '18px',
      'xl': '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '36px',
      '6xl': '40px',
      '7xl': '44px',
      '8xl': '48px',
      '9xl': '52px',
      '10xl': '56px',
      '11xl': '60px',
      '12xl': '64px',
    },
    extend: {
      margin: {
        18: '72px',
      },
      screens: {
        '3xs': '300px',
        '2xs': '360px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '840px',
        'xl': '1024px',
        '2xl': '1280px',
        '3xl': '1400px',
        '4xl': '1600px',
        '5xl': '1800px',
      },
    },
  },
  plugins: [],
};
