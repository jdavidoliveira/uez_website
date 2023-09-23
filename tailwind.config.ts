import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        azulao: "#00003a",
        roxazul: "#2a14b7",
        cinzero: "#d9d9d9"
      },
      keyframes: {
        transitionY: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50%)",
          },
          "70%": {
            opacity: "0.7",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        transitionX: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%)",
          },
          "70%": {
            opacity: "0.7",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        transitionY: "transitionY .6s",
        transitionX: "transitionX .6s",
      },
      spacing: {
        144: "36rem",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Montserrat: ['var(--font-montserrat)', 'sans-serif'],
        Roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      screens: {
        'smmobile': { 'max': '480px' },
        'mobile': { 'max': '640px' },
        'mdscreen': { 'max': '768px' },
        'desktop': { 'max': '1024px' },
        'lgdesktop': { 'max': '1280px' },
        'xldesktop': { 'max': '1536px' },
      }
    },
  },
  plugins: [],
}
export default config
