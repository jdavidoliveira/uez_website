import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark-blue": "#00003a",
        "primary-gray": "#d9d9d9",
        "primary-purple": "#535FFF",
        "primary-blue": "#2A14B7",
        "secondary-blue": "#002DE3",
        "status-OPEN": "#BE00FD",
        "status-WAITING_EVALUATION": "#FF9900",
        "status-CANCELLED": "#FF0000",
        "status-IN_PROGRESS": "#535FFF",
        "status-COMPLETED": "#00A62E",
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
        exitButtonGrow: {
          "100%": {
            width: "100%",
          },
        },
        exitButtonDecrease: {
          "100%": {
            width: "10px",
          },
        },
        entranceButtonFadeIn: {
          "0%": {
            opacity: ".7",
            width: "16px",
          },
          "100%": {
            opacity: "1",
            width: "100%",
          },
        },
        float: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        upEntranceInTheCard: {
          "0%": {
            opacity: "0",
            height: "0%",
          },
          "100%": {
            opacity: "1",
            height: "20%",
          },
        },
      },
      animation: {
        transitionY: "transitionY .6s",
        transitionX: "transitionX .6s",
        exitButtonGrow: "exitButtonGrow .4s",
        exitButtonDecrease: "exitButtonDecrease .4s",
        entranceButtonFadeIn: "entranceButtonFadeIn .4s",
        float: "float 3s infinite ease-in-out",
        upEntranceInTheCard: "upEntranceInTheCard ease .4s",
      },
      spacing: {
        144: "36rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "boneco-cadastro": "url('/images/pages/cadastro/boneco-cadastro.jpg')",
      },
      fontFamily: {
        Montserrat: ["var(--font-montserrat)", "sans-serif"],
        Roboto: ["var(--font-roboto)", "sans-serif"],
      },
      screens: {
        smmobile: { max: "480px" },
        mobile: { max: "640px" },
        mdscreen: { max: "768px", min: "641px" },
        desktop: { max: "1024px", min: "641px" },
        lgdesktop: { max: "1280px", min: "1025px" },
        xldesktop: { max: "1536px", min: "1281px" },
      },
    },
  },
  safelist: [
    {
      pattern: /^text-status-(OPEN|WAITING_EVALUATION|CANCELLED|IN_PROGRESS|COMPLETED)$/,
    },
    {
      pattern: /^bg-status-(OPEN|WAITING_EVALUATION|CANCELLED|IN_PROGRESS|COMPLETED)\/30$/,
    },
  ],
  plugins: [require("tailwind-scrollbar-hide")],
}
export default config
