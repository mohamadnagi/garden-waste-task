import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Natural earthy color palette
        earth: {
          brown: {
            DEFAULT: "#4B352A",
            light: "#735448",
            dark: "#362621",
            100: "#E5DCD9",
            200: "#CCB9B3",
            300: "#B2968D",
            400: "#997367",
            500: "#7F5041",
            600: "#663D2B",
            700: "#4C2A15",
            800: "#331700",
            900: "#190400",
          },
          terracotta: {
            DEFAULT: "#CA7842",
            light: "#D49265",
            dark: "#B35F2F",
            100: "#FFEEE4",
            200: "#FFDCC9",
            300: "#FFCBAE",
            400: "#FFB993",
            500: "#FFA878",
            600: "#E6895D",
            700: "#CC6A42",
            800: "#B34B27",
            900: "#992C0C",
          },
          sage: {
            DEFAULT: "#B2CD9C",
            light: "#C4D9B3",
            dark: "#9EBF85",
            100: "#F5F9F2",
            200: "#EBF3E5",
            300: "#E1EDD8",
            400: "#D7E7CB",
            500: "#CDE1BE",
            600: "#B9CDA7",
            700: "#A5B990",
            800: "#91A579",
            900: "#7D9162",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "modern-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 16px rgba(202, 120, 66, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 24px rgba(178, 205, 156, 0.3)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "modern-pulse": "modern-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
