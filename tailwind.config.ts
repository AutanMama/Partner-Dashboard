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
        // pure black base
        canvas: "#050505",
        // panels (cards)
        panel: {
          DEFAULT: "#0E0E0E",
          elevated: "#161616",
          hover: "#1C1C1C",
        },
        // brand red (Exness-style)
        brand: {
          50: "#fff1f2",
          100: "#ffe2e4",
          200: "#fec9cd",
          300: "#fb959c",
          400: "#f55a65",
          500: "#e11d2a", // primary
          600: "#c41421",
          700: "#a3121d",
          800: "#82111c",
          900: "#6b121b",
        },
        // accent green (deposit / success)
        accent: {
          green: "#19c37d",
          greenDark: "#15a06a",
        },
        // neutral text
        ink: {
          0: "#ffffff",
          100: "#e5e7eb",
          200: "#cbd0d8",
          300: "#9ca3af",
          400: "#6b7280",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#111418",
          900: "#0a0c10",
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
        display: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 28px -16px rgba(0,0,0,0.85)",
        red: "0 0 24px -8px rgba(225,29,42,0.55)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.35s ease-out",
        "slide-up": "slide-up 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
