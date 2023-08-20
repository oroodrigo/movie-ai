/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "370px",
        md2: "1200px",
      },
      colors: {
        destaque: {
          roxo: "#8323ff",
          rosa: "#ff2daf",
          amarelo: "#ffea35",
        },
        base: {
          cinza: "#2b2b37",
          "cinza-dark": "#1e1f28",
          "cinza-medio": "#373745",
          "cinza-light": "#8b8d9b",
          branco: "#fff",
        },
      },
    },
  },
  plugins: [],
};
