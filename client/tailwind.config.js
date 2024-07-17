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
        RedButton: "2px 2px 12px #40328529",
        PinkButton: "2px 2px 12px #40328514",
      },
      backgroundImage: {
        "register-bg":
          "url(../../../public/assets/registerpage/register-section-bg.svg)",
      },
      variants: {},
      plugins: [],
    },
  },
  plugins: ["daistui"],
};
        
      
      


