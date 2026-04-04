module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"] },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    }
  }
  },
  plugins: []
}