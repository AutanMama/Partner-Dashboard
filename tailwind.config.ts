import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070d",
          900: "#0a0d18",
          800: "#0f1322",
          700: "#161a2c",
          600: "#1d2238",
          500: "#262c47",
        },
        brand: {
          50: "#eef6ff",
          100: "#d8eaff",
          200: "#b4d3ff",
          300: "#83b4ff",
          400: "#4d8bff",
          500: "#2667ff",
          600: "#1448e6",
          700: "#1138b8",
          800: "#152f8e",
          900: "#152b6f",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ["Sora", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(38,103,255,0.25), transparent 60%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-emerald":
          "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        "gradient-brand":
          "linear-gradient(135deg, #2667ff 0%, #1138b8 100%)",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -20px rgba(0,0,0,0.8)",
        glow: "0 0 40px -10px rgba(38,103,255,0.45)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
