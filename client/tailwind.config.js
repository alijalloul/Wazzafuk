/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      "garamond": "EB-Garamond",
      "garamond-semibold": "EB-Garamond-SemiBold",
      "garamond-bold": "EB-Garamond-Bold",
    },
    extend: {},
  },
  plugins: [],
}

