/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins"],
      montserrat: ["Montserrat"],
      helvetica: ["Helvetica"],
    },
    gridTemplateColumns: {
      "20/65/15": "20% 65% 15%",
      "15/85": "20% 80%",
      "20/40/40": "20% 40% 40%",
      2: "50% 50%",
      "70/30": "70% 30%",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
