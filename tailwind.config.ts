import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
        accent: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e7e3d9',
          300: '#d4cbc2',
          400: '#a89f92',
          500: '#8b8076',
          600: '#716258',
          700: '#5c5047',
          800: '#3d3835',
          900: '#272420',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
