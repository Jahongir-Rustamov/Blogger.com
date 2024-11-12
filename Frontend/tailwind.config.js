/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightGreen: "#e9f5e1",
        softGray: "#4CAF50",
        bg: "#FF8000",
      },
    },
  },
  plugins: [],
};
