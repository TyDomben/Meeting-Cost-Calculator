/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cost-red': '#e74c3c',
        'success-green': '#27ae60',
        'warning-orange': '#f39c12',
      },
    },
  },
  plugins: [],
}
