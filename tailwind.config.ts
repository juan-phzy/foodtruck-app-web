import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(255, 132, 0, 1)",
        primaryInactive: "rgba(255, 132, 0, 0.5)",
        primaryLight: "rgba(255, 243, 230, 1)",
        primaryExtraLight: "rgb(255, 251, 246)",
        blackInactive: "rgba(0, 0, 0, 0.5)",
        grayDark: "rgba(120, 120, 120, 1)",
        grayDarkInactive: "rgba(120, 120, 120, 0.5)",
        gray: "rgba(221, 221, 221, 1)",
        grayInactive: "rgba(221, 221, 221, 0.5)",
        grayLight: "rgba(249, 249, 249, 1)",
        whiteInactive: "rgba(255, 255, 255, 0.5)",
        greenLight: "rgb(0, 199, 0)",
        brown: "rgba(139, 69, 19, 1)",
      },
      fontSize: {
        xxs: "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        xxl: "1.75rem",
        xxxl: "2.5rem",
        xxxxl: "3rem",
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },      
      borderRadius: {
        sm: "5px",
        md: "10px",
        lg: "15px",
        full: "9999px",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        xxl: "24px",
        xxxl: "28px",
        xxxxl: "35px",
      },
    },
  },
  plugins: [],
};

export default config;
