/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Lora, Georgia, serif',
      display: 'Bevan, Georgia, serif',
    },

    // The class names in the markup stay exactly as they are. What changes is
    // the colour each one resolves to, so the whole app is repainted from
    // here: tomato for anything you act on, warm paper for every surface,
    // basil for the quiet links.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fffdf8',
      black: '#171009',

      // Tomato. Every `yellow-*` in the markup is now the house red.
      yellow: {
        50: '#fdf6ec',
        100: '#f7e9d7',
        200: '#efd3bb',
        300: '#c9362c',
        400: '#b3261e',
        500: '#8e1d16',
        600: '#74160f',
        700: '#5c110b',
        800: '#4a0d08',
        900: '#3a0a06',
      },

      // Paper, flour and oven char. Every `stone-*` becomes part of this.
      stone: {
        50: '#fbf7ee',
        100: '#f4ecdd',
        200: '#e4d8bf',
        300: '#cfbe9c',
        400: '#a08f75',
        500: '#87755c',
        600: '#6a5942',
        700: '#4a3b2a',
        800: '#241c16',
        900: '#160f0b',
      },

      // Basil, for the back-links and the "delivered" state.
      blue: {
        50: '#eef4ef',
        500: '#2f5d3a',
        600: '#1f4227',
      },
      green: {
        50: '#eef4ef',
        100: '#dbe7dd',
        500: '#2f5d3a',
        700: '#1f4227',
      },

      // Kept apart from the house red so a warning still reads as a warning.
      red: {
        50: '#fbeceb',
        100: '#f5d9d6',
        500: '#c0392b',
        700: '#8e1d16',
      },

      slate: {
        200: '#e4d8bf',
      },
    },

    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
