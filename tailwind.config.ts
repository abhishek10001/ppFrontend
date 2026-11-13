import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",
        archival: {
          black: "#0A0A0A",
          pureBlack: "#000000",
          white: "#FFFFFF",
          cream: "#FAFAFA",
          lightGray: "#F4F4F4",
          border: "#E5E5E5",
          muted: "#737373",
          darkGray: "#262626",
          hairline: "#E5E5E5",
        }
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["'Courier New'", "Courier", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        grotesk: ["'Arial Black'", "'Impact'", "'Helvetica Neue'", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        widest: "0.2em",
        ultra: "0.25em",
      },
      borderWidth: {
        hairline: "1px",
      }
    },
  },
  plugins: [],
};
export default config;

