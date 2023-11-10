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
        azulao: '#00003a',
        roxazul: '#2a14b7',
        azulinho: '#002DE3',
        cinzero: '#d9d9d9'
      },
      keyframes: {
        transitionY: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50%)',
          },
          '70%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        transitionX: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50%)',
          },
          '70%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        exitButtonGrow: {
          '100%' : {
            width: '100%',
          }
        },
        exitButtonDecrease: {
          '100%' : {
            width: '10px',
          }
        },
        entranceButtonFadeIn: {
          '0%' : {
            opacity: '.7',
            width: '16px',
          },
          '100%' : {
            opacity: '1',
            width: '100%'
          }
        }

      },
      animation: {
        transitionY: 'transitionY .6s',
        transitionX: 'transitionX .6s',
        exitButtonGrow: 'exitButtonGrow .4s',
        exitButtonDecrease: 'exitButtonDecrease .4s',
        entranceButtonFadeIn: 'entranceButtonFadeIn .4s',
      },
      spacing: {
        144: '36rem',
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
        'mdscreen': { 'max': '768px', 'min': '641px' },
        'desktop': { 'max': '1024px', 'min': '641px' },
        'lgdesktop': { 'max': '1280px', 'min': '1025px' },
        'xldesktop': { 'max': '1536px', 'min': '1281px' },
      }
    },
  },
  plugins: [],
}
export default config
