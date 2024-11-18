// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE and Edge
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, and Edge
        },
      });
    },
  ],

};

