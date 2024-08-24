/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        "move-jump-spin": {
          "0%": {
            transform: "translateX(-100px) translateY(-50px) rotate(0deg)",
          },
          "25%": {
            transform: "translateX(-50px) translateY(0px) rotate(90deg)",
          },
          "50%": {
            transform: "translateX(0) translateY(-50px) rotate(180deg)",
          },
          "75%": {
            transform: "translateX(50px) translateY(0px) rotate(270deg)",
          },
          "100%": {
            transform: "translateX(100px) translateY(-50px) rotate(360deg)",
          },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "move-jump-spin": "move-jump-spin 1.5s linear infinite alternate",
        wave: "wave 1.5s ease-in-out infinite",
      },
    },
    fontFamily: {
      poppins: ["Poppins"],
      montserrat: ["Montserrat"],
      helvetica: ["Helvetica"],
    },
    gridTemplateColumns: {
      "20/65/15": "20% 65% 15%",
      "15/85": "20% 80%",
      "20/40/40": "20% 40% 40%",
      2: "repeat(2,1fr)",
      3: "repeat(3,1fr)",
      "70/30": "70% 30%",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
