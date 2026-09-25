/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      // `md:` = the "book layout" breakpoint: viewports >= 768px wide, OR any
      // short landscape viewport (a phone held sideways, which can be narrower
      // than 768px). Keep in sync with LANDSCAPE_SHORT_QUERY in
      // src/components/book/useIsLandscapeShort.js.
      screens: {
        md: { raw: "(min-width: 768px), (orientation: landscape) and (max-height: 500px)" },
      },
      colors: {
        space: "#050B1A",
        "space-blue": "#0B1633",
        archive: {
          text: "#E8E5D8",
          muted: "#8D98B5",
          gold: "#C9B88A",
          glow: "#8FB8FF",
        },
      },
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
      // Celestial Archive redesign repoints the existing `font-poppins`
      // utility to Inter (the new body font) instead of renaming it across
      // every file that already uses it.
      poppins: ["Inter", "sans-serif"],
      montserrat: ["Montserrat"],
      helvetica: ["Helvetica"],
      cinzel: ["Cinzel", "serif"],
      cormorant: ["Cormorant Garamond", "serif"],
      inter: ["Inter", "sans-serif"],
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
