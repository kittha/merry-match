/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: "Nunito",
      },
      dropShadow: {
        register: "2px 2px 12px 0px #40328529",
      },
    },
    variants: {},
    plugins: [],
  },
  plugins: ["daistui"],
};
