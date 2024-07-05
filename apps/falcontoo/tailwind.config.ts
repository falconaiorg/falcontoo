import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const { fontFamily } = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
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
        montserrat: [
          "var(--font-montserrat)",
          "var(--font-open-dyslexic)",
          "var(--font-roboto)",
          "var(--font-roboto-slab)",
          "var(--font-georgia)",
          "var(--font-helvetica)",
          "var(--font-palatino)",
          "var(--font-futura)",
          "var(--font-open-sans)",
          "var(--font-noto-serif)",
        ],
      },
      typography: customTypography,
      colors: colorsConfig(),
      keyframes: animations().keyframes,
      animation: animations().animations,
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Tremor
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: safelist(),
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/container-queries"),
    require("tailwind-capitalize-first-letter"),
    // tremor
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
    // for adding global CSS variables
    addVariablesForColors,
    addBackgroundGrids,
  ],
} satisfies Config;

// ! Theme Extensions ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function customTypography({ theme }: { theme: any }) {
  const customTypography = {
    pink: {
      css: {
        "--tw-prose-body": theme("colors.pink[800]"),
        "--tw-prose-headings": theme("colors.pink[900]"),
        "--tw-prose-lead": theme("colors.pink[700]"),
        "--tw-prose-links": theme("colors.pink[900]"),
        "--tw-prose-bold": theme("colors.pink[900]"),
        "--tw-prose-counters": theme("colors.pink[600]"),
        "--tw-prose-bullets": theme("colors.pink[400]"),
        "--tw-prose-hr": theme("colors.pink[300]"),
        "--tw-prose-quotes": theme("colors.pink[900]"),
        "--tw-prose-quote-borders": theme("colors.pink[300]"),
        "--tw-prose-captions": theme("colors.pink[700]"),
        "--tw-prose-code": theme("colors.pink[900]"),
        "--tw-prose-pre-code": theme("colors.pink[100]"),
        "--tw-prose-pre-bg": theme("colors.pink[900]"),
        "--tw-prose-th-borders": theme("colors.pink[300]"),
        "--tw-prose-td-borders": theme("colors.pink[200]"),
        "--tw-prose-invert-body": theme("colors.pink[200]"),
        "--tw-prose-invert-headings": theme("colors.white"),
        "--tw-prose-invert-lead": theme("colors.pink[300]"),
        "--tw-prose-invert-links": theme("colors.white"),
        "--tw-prose-invert-bold": theme("colors.white"),
        "--tw-prose-invert-counters": theme("colors.pink[400]"),
        "--tw-prose-invert-bullets": theme("colors.pink[600]"),
        "--tw-prose-invert-hr": theme("colors.pink[700]"),
        "--tw-prose-invert-quotes": theme("colors.pink[100]"),
        "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
        "--tw-prose-invert-captions": theme("colors.pink[400]"),
        "--tw-prose-invert-code": theme("colors.white"),
        "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
        "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
        "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
      },
    },
    day: {
      css: {},
    },
  };
  return customTypography;
}

function colorsConfig() {
  const shadcnColors = {
    border: variable("--border"),
    input: variable("--input"),
    ring: variable("--ring"),
    background: variable("--background"),
    foreground: variable("--foreground"),
    primary: {
      DEFAULT: variable("--primary"),
      foreground: variable("--primary-foreground"),
    },
    secondary: {
      DEFAULT: variable("--secondary"),
      foreground: variable("--secondary-foreground"),
    },
    destructive: {
      DEFAULT: variable("--destructive"),
      foreground: variable("--destructive-foreground"),
    },
    muted: {
      DEFAULT: variable("--muted"),
      foreground: variable("--muted-foreground"),
    },
    accent: {
      DEFAULT: variable("--accent"),
      foreground: variable("--accent-foreground"),
    },
    popover: {
      DEFAULT: variable("--popover"),
      foreground: variable("--popover-foreground"),
    },
    card: {
      DEFAULT: variable("--card"),
      foreground: variable("--card-foreground"),
    },
  };

  const tremorColors = {
    tremor: {
      brand: {
        faint: colors.blue[50],
        muted: colors.blue[200],
        subtle: colors.blue[400],
        DEFAULT: colors.blue[500],
        emphasis: colors.blue[700],
        inverted: colors.white,
      },
      background: {
        muted: colors.gray[50],
        subtle: colors.gray[100],
        DEFAULT: colors.white,
        emphasis: colors.gray[700],
      },
      border: {
        DEFAULT: colors.gray[200],
      },
      ring: {
        DEFAULT: colors.gray[200],
      },
      content: {
        subtle: colors.gray[400],
        DEFAULT: colors.gray[500],
        emphasis: colors.gray[700],
        strong: colors.gray[900],
        inverted: colors.white,
      },
    },
    "dark-tremor": {
      brand: {
        faint: "#0B1229",
        muted: colors.blue[950],
        subtle: colors.blue[800],
        DEFAULT: colors.blue[500],
        emphasis: colors.blue[400],
        inverted: colors.blue[950],
      },
      background: {
        muted: "#131A2B",
        subtle: colors.gray[800],
        DEFAULT: colors.gray[900],
        emphasis: colors.gray[300],
      },
      border: {
        DEFAULT: colors.gray[800],
      },
      ring: {
        DEFAULT: colors.gray[800],
      },
      content: {
        subtle: colors.gray[600],
        DEFAULT: colors.gray[500],
        emphasis: colors.gray[200],
        strong: colors.gray[50],
        inverted: colors.gray[950],
      },
    },
  };

  return {
    ...shadcnColors,
    ...tremorColors,
  };
}

function animations() {
  const animations = {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    shimmer: "shimmer 5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 5",
    breath: "breath 3s ease-in-out infinite",
  };

  const keyframes = {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    shimmer: {
      from: {
        backgroundPosition: "0 0",
      },
      to: {
        backgroundPosition: "-200% 0",
      },
    },
    breath: {
      "0%, 100%": { transform: "scale(0.8)" },
      "50%": { transform: "scale(1.1)" },
    },
  };

  return { animations, keyframes };
}

// ! Core config ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function safelist() {
  const safelist = [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ];
  return safelist;
}

// ! Plugins ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// adds background grids to tailwind config
function addBackgroundGrids({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
        )}")`,
      }),
    },
    {
      values: flattenColorPalette(theme("backgroundColor")),
      type: "color",
    },
  );
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

/**
 * Utility to get a tailwind formatted variable value from a CSS variable name.
 * see: [using CSS variables in Tailwind](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
 */
function variable(cssVariable: string): string {
  return `hsl(var(${cssVariable}))`;
}

export default config;
