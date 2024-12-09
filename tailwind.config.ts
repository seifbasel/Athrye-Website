import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        playfair: ["var(--font-playfair)"],
      },
      colors: {
        border: "#3C3D37",
        input: "#eeeeee",
        background: {
          DEFAULT: "#ECEBDE",
          dark: "#272829",
        },
        foreground: {
          DEFAULT: "#272829",
          dark: "#ECEBDE",
        },
        primary: {
          DEFAULT: "#ECEBDE",
          foreground: "#0F0F0F",
        },
        secondary: {
          DEFAULT: "#D8D9DA",
          foreground: "#888888",
        },
        text: {
          DEFAULT: "#ECEBDE",
          dark: "#272829",
        },
        button: {
          DEFAULT: "#272829",
          dark: "#ECEBDE",
        },
        card: {
          DEFAULT: "#ECDFCC",
          foreground: "#222222",
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
