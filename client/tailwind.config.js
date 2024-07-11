/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: "Nunito",
      },
      dropShadow: {
        RedButton: "2px 2px 12px #40328529",
        PinkButton: "2px 2px 12px #40328514",
      },
    },
  },
  plugins: [],
};
