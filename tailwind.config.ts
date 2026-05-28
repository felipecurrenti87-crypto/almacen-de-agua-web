import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        celeste: {
          DEFAULT: "#5BB7E8",
          light: "#E8F4FA",
          medium: "#B8D9EE",
          dark: "#3A9BD5",
          glow: "#7DD3FC",
          neon: "#38BDF8",
        },
        azul: {
          DEFAULT: "#1B3A5C",
          accent: "#2E86C1",
        },
        negro: {
          DEFAULT: "#0A0A0F",
          light: "#141420",
          medium: "#1C1C2E",
        },
        gris: {
          suave: "#6B7B8D",
          dark: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "wave": "wave 8s ease-in-out infinite",
        "wave-slow": "wave 12s ease-in-out infinite",
        "droplet": "droplet 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "ripple": "ripple 1s ease-out",
        "orb-pulse": "orbPulse 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-5px) translateY(-3px)" },
          "50%": { transform: "translateX(0) translateY(-6px)" },
          "75%": { transform: "translateX(5px) translateY(-3px)" },
        },
        droplet: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "50%": { transform: "translateY(0px)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        orbPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
