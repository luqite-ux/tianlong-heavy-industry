import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#142033",
        steel: "#64748b",
        brand: {
          blue: "#153b91",
          red: "#e51f2f",
          sky: "#eaf5ff"
        }
      },
      boxShadow: {
        lift: "0 24px 80px rgba(21, 59, 145, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
