/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#4C9C66",
        "main-hover": "#3A7F50",
        "main-active": "#2A613C",
        "base-black": "#080325",
        "base-white": "#F8F9FA",
        "odd-table": "#F7F6FE",
      },
    },
  },
  plugins: [require("daisyui")],
};
