/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { 
        background: "#0a0a0a", 
        foreground: "#f5f5f5",
        surface: "#111111", 
        border: "#1f1f1f",
        ring: "#1f1f1f"
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};

