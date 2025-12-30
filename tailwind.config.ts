import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3D5A6C",
          light: "#6A8E9E",
          dark: "#2A3F4D",
        },
        accent: {
          DEFAULT: "#F2C94C",
          light: "#F5D97B",
          dark: "#E0B63A",
        },
        brand: {
          "sage-green": "#5C7A4B",
          "mint-green": "#A4C997",
          cream: "#F5EFD4",
        },
        background: {
          DEFAULT: "#FDFBF7",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
