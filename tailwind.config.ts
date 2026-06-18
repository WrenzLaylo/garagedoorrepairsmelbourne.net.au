import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Clean & Premium: white canvas, near-black ink, single cobalt accent ──
        surface: "#FFFFFF", // page
        "surface-alt": "#F6F7F9", // alternating section wash
        "surface-raised": "#FFFFFF", // cards
        "surface-dark": "#0E1116", // rare dark plate (footer powered-by chip stays separate)
        "surface-dark-alt": "#161A21",
        steel: "#F0F2F5",
        border: "#E6E8EC", // hairline
        "border-strong": "#D3D7DD",
        ink: {
          DEFAULT: "#111111",
          soft: "#565B63",
          light: "#8A8F98",
          inverse: "#FFFFFF",
        },
        brand: {
          DEFAULT: "#2D5BFF", // cobalt
          dark: "#1E45E0", // button bg / AA-safe on white text
          deep: "#1B3CC4", // small text on white (AA)
          light: "#5C82FF",
          tint: "#EEF2FF",
          glow: "rgba(45, 91, 255, 0.18)",
        },
        accent: {
          DEFAULT: "#E5484D", // emergency / 24·7 only
          dark: "#C13438",
          light: "#F26A6E",
          tint: "#FDECEC",
          glow: "rgba(229, 72, 77, 0.18)",
        },
        gold: "#F5B100",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter Tight"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
        mono: "0.24em",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
        "5xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,17,0.04), 0 0 0 1px rgba(17,17,17,0.02)",
        "card-hover": "0 12px 32px -12px rgba(17,17,17,0.16), 0 0 0 1px rgba(17,17,17,0.04)",
        "card-glow": "0 12px 32px -12px rgba(45,91,255,0.28), 0 0 0 1px rgba(45,91,255,0.12)",
        "btn-brand": "0 8px 22px -8px rgba(45,91,255,0.5)",
        "btn-accent": "0 8px 22px -8px rgba(229,72,77,0.5)",
        glass: "0 8px 32px rgba(17,17,17,0.06)",
        "glow-brand": "0 0 40px -10px rgba(45,91,255,0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      maxWidth: {
        container: "1240px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "bounce-sm": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blink-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in-scale": "fade-in-scale 0.5s ease-out both",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        ticker: "ticker 38s linear infinite",
        "blink-soft": "blink-soft 1.6s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
