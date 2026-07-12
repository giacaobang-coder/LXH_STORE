import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Luxury palette — noir + gold, inspired by high fashion houses
        noir: {
          DEFAULT: '#0a0a0a',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#4d4d4d',
          700: '#3d3d3d',
          800: '#242424',
          900: '#141414',
          950: '#0a0a0a',
        },
        gold: {
          DEFAULT: '#c9a24b',
          50: '#faf6ec',
          100: '#f3e9cd',
          200: '#e8d29e',
          300: '#dbb96b',
          400: '#d1a748',
          500: '#c9a24b',
          600: '#ab7f36',
          700: '#89632c',
          800: '#6f4f28',
          900: '#5e4224',
        },
        primary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a89968',
          500: '#92804d',
          600: '#78663a',
          700: '#5f5227',
          800: '#3f3725',
          900: '#27241d',
          950: '#0f0e0b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        luxury: '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
