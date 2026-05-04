import fs from 'node:fs';
import path from 'node:path';

export async function initCommand() {
  const cwd = process.cwd();

  const tokensPath = path.resolve(cwd, 'tokens.json');
  const configPath = path.resolve(cwd, 'ngcorex.config.ts');

  let createdSomething = false;

  // tokens.json
  if (!fs.existsSync(tokensPath)) {
    fs.writeFileSync(
      tokensPath,
      JSON.stringify(
        {
          spacing: {
            "xs": "0.25rem",
            "sm": "0.5rem",
            "md": "1rem",
            "lg": "1.5rem",
            "xl": "2rem",
            "2xl": "3rem",
            "3xl": "4rem"
          },
          colors: {
            neutral: {
              "0": "#ffffff",
              "50": "#fafafa",
              "100": "#f5f5f5",
              "200": "#e5e5e5",
              "300": "#d4d4d4",
              "400": "#a3a3a3",
              "500": "#737373",
              "600": "#525252",
              "700": "#404040",
              "800": "#262626",
              "900": "#171717"
            },
            primary: {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a"
            },
            success: {
              "100": "#dcfce7",
              "500": "#22c55e",
              "700": "#15803d"
            },
            warning: {
              "100": "#fef9c3",
              "500": "#eab308",
              "700": "#a16207"
            },
            error: {
              "100": "#fee2e2",
              "500": "#ef4444",
              "700": "#b91c1c"
            }
          },
          radius: {
            "none": "0",
            "sm": "0.25rem",
            "md": "0.5rem",
            "lg": "0.75rem",
            "xl": "1rem",
            "2xl": "1.5rem",
            "full": "9999px"
          },
          zIndex: {
            "base": "0",
            "dropdown": "1000",
            "sticky": "1020",
            "fixed": "1030",
            "modal-backdrop": "1040",
            "modal": "1050",
            "popover": "1060",
            "tooltip": "1070"
          },
          typography: {
            fontSize: {
              "xs": "0.75rem",
              "sm": "0.875rem",
              "base": "1rem",
              "lg": "1.125rem",
              "xl": "1.25rem",
              "2xl": "1.5rem",
              "3xl": "1.875rem",
              "4xl": "2.25rem",
              "5xl": "3rem"
            },
            fontWeight: {
              "light": "300",
              "normal": "400",
              "medium": "500",
              "semibold": "600",
              "bold": "700",
              "extrabold": "800"
            },
            lineHeight: {
              "none": "1",
              "tight": "1.25",
              "snug": "1.375",
              "normal": "1.5",
              "relaxed": "1.625",
              "loose": "2"
            }
          },
          shadows: {
            "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "base": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
          },
          opacity: {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "40": "0.4",
            "50": "0.5",
            "60": "0.6",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          borders: {
            width: {
              "none": "0",
              "thin": "1px",
              "medium": "2px",
              "thick": "4px"
            },
            style: {
              "solid": "solid",
              "dashed": "dashed",
              "dotted": "dotted",
              "none": "none"
            }
          },
          gradients: {
            "primary": "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            "primary-subtle": "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
          },
          icons: {
            "xs": "0.75rem",
            "sm": "1rem",
            "md": "1.25rem",
            "lg": "1.5rem",
            "xl": "2rem",
            "2xl": "2.5rem"
          }
        },
        null,
        2
      )
    );
    console.info('✔ Created tokens.json');
    createdSomething = true;
  } else {
    console.info('i tokens.json already exists — skipped');
  }

  // ngcorex.config.ts
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  /**
   * ---------------------------------------------------------------------------
   * Output: Where to write the generated CSS file and what format to use.
   * ---------------------------------------------------------------------------
   */
  output: {
    /* Path to the generated CSS file (relative to project root). */
    file: 'src/styles/ngcorex.css',

    /**
     * Output format. Options: 'css' (default) | 'scss-variables' | 'scss-map'
     * - 'css'            → standard CSS custom properties (:root { --crx-spacing-sm: ... })
     * - 'scss-variables' → SCSS variables ($crx-spacing-sm: ...)
     * - 'scss-map'       → SCSS map ($ngcorex-tokens: ('spacing-sm': ...))
     */
    // format: 'css',

    /**
     * Wrap all CSS variables inside a named @layer.
     * Useful for controlling cascade order in large projects.
     */
    // layer: 'tokens',
  },

  /**
   * ---------------------------------------------------------------------------
   * Extends
   * Inherit tokens from one or more base JSON files.
   * Paths are resolved relative to this config file.
   * Merge order: first file → last file → your tokens (last wins).
   * Example: extends: ['./tokens/foundation.json', './tokens/brand.json'] Array of extended files
   * ---------------------------------------------------------------------------
   */
  // extends: './tokens/base-tokens.json',

  /**
   * --------------------------------------------------------------------------
   * Presets
   * Apply pre-configured token sets as a starting point.
   * Your tokens always override preset values.
   * Available built-in preset: 'default'
   * ---------------------------------------------------------------------------
   */
  // presets: ['default'],

  /**
   * --------------------------------------------------------------------------
   * Semantic tokens
   * Named aliases that map to your primitive tokens.
   * References use dot notation prefixed with $: '$colors.primary.500'
   * Generated as CSS variables that point to the primitive variable.
   * ---------------------------------------------------------------------------
   */
  // semantic: {
  //   text: {
  //     primary:   '$colors.neutral.900',
  //     secondary: '$colors.neutral.500',
  //     inverse:   '$colors.neutral.0',
  //     error:     '$colors.error.500',
  //     success:   '$colors.success.500',
  //   },
  //   background: {
  //     surface:   '$colors.neutral.0',
  //     muted:     '$colors.neutral.100',
  //     primary:   '$colors.primary.500',
  //     error:     '$colors.error.100',
  //     success:   '$colors.success.100',
  //   },
  //   border: {
  //     default:   '$colors.neutral.300',
  //     strong:    '$colors.neutral.500',
  //     primary:   '$colors.primary.500',
  //   },
  // },

  /**
   * --------------------------------------------------------------------------
   * Utilities
   * Generate utility CSS classes from your tokens (opt-in).
   * Written to a separate file so they remain optional to import.
   * ---------------------------------------------------------------------------
   */
  // utilities: {
  //   /* Master switch — must be true for any utilities to be generated. */
  //   enabled: true,
  //
  //   /* Output file for generated utility classes. */
  //   output: 'src/styles/ngcorex.utilities.css',
  //
  //   /**
  //    * Spacing utilities — generated from your spacing tokens.
  //    * .m-{s}, .mt-{s}, .mr-{s}, .mb-{s}, .ml-{s}, .mx-{s}, .my-{s}
  //    * .p-{s}, .pt-{s}, .pr-{s}, .pb-{s}, .pl-{s}, .px-{s}, .py-{s}
  //    * .gap-{s}, .w-{s}, .h-{s}
  //    */
  //   spacing: {
  //     margin:  true,
  //     padding: true,
  //     gap:     true,
  //     width:   true,
  //     height:  true,
  //   },
  //
  //   /**
  //    *  Color utilities — generated from named color palettes.
  //    * .text-{palette}-{shade}, .bg-{palette}-{shade}, .border-{palette}-{shade}
  //    */
  //   color: {
  //     text:       ['primary', 'neutral', 'success', 'warning', 'error'],
  //     background: ['primary', 'neutral', 'success', 'warning', 'error'],
  //     border:     ['primary', 'neutral', 'error'],
  //   },
  //
  //   /**
  //    * Layout utilities — not token-driven, always the same set.
  //    * display: .flex .inline-flex .block .inline-block .inline .hidden
  //    * flex:    .flex-row .flex-col .flex-wrap .items-{x} .justify-{x}
  //    *  grid:    .grid .grid-cols-{1-12}
  //    */
  //   layout: {
  //     display: true,
  //     flex:    true,
  //     grid:    true,
  //   },
  //
  //   /**
  //    * Typography utilities — generated from your typography tokens.
  //    * .text-{s} → font-size, .font-{s} → font-weight, .leading-{s} → line-height
  //    */
  //   typography: {
  //     fontSize:   true,
  //     fontWeight: true,
  //     lineHeight: true,
  //   },
  //
  //   /* Single-scale utilities. */
  //   radius:   true, // .rounded-{s}    → border-radius
  //   shadows:  true, // .shadow-{s}     → box-shadow
  //   opacity:  true, // .opacity-{s}    → opacity
  //   gradients: true, // .bg-gradient-{s} → background
  //   icons:    true, // .icon-{s}       → width + height
  //
  //   /**
  //    * Border utilities — generated from your borders tokens.
  //    * .border-w-{s} → border-width, .border-style-{s} → border-style
  //    */
  //   borders: {
  //     width: true,
  //     style: true,
  //   },
  //
  //   /**
  //    * Container utility — a centered, max-width constrained wrapper.
  //    * .container { width: 100%; max-width: ...; margin: auto; }
  //    */
  //   container: {
  //     enabled:  true,
  //     maxWidth: '1280px',
  //   },
  // },

  /**
   * ---------------------------------------------------------------------------
   * Constraints
   * Control validation severity per token category.
   * Levels: 'error' (blocks build) | 'warning' (logged, build continues) | 'off'
   * ---------------------------------------------------------------------------
   */
  // constraints: {
  //   spacing: {
  //     unit:   'warning', // warn if spacing values use unexpected units
  //     format: 'warning', // warn on unrecognised value format
  //     type:   'error',   // error if value is not a string
  //   },
  //   colors: {
  //     type:     'error',
  //     format:   'warning',
  //     shadeKey: 'warning', // warn if shade keys are not numeric
  //   },
  //   radius:    { unit: 'warning', format: 'warning', type: 'error' },
  //   zIndex:    { format: 'warning', type: 'error' },
  //   shadows:   { format: 'warning', type: 'error' },
  //   opacity:   { format: 'warning', type: 'error' },
  //   gradients: { format: 'warning', type: 'error' },
  //   icons:     { unit: 'warning', format: 'warning', type: 'error' },
  //   borders: {
  //     width: { unit: 'warning', format: 'warning', type: 'error' },
  //     style: { format: 'warning', type: 'error' },
  //   },
  //   typography: {
  //     fontSize:   { format: 'warning', type: 'error' },
  //     fontWeight: { format: 'warning', type: 'error' },
  //     lineHeight: { format: 'warning', type: 'error' },
  //   },
  // },
});
`
    );
    console.info('✔ Created ngcorex.config.ts');
    createdSomething = true;
  } else {
    console.info('i ngcorex.config.ts already exists — skipped');
  }

  if (createdSomething) {
    console.info('');
    console.info('Next steps:');
    console.info('  Run `ngcorex build` to generate CSS');
    console.info('  Edit tokens.json to customise your design tokens');
    console.info('  Uncomment sections in ngcorex.config.ts to enable utilities, extends, presets, and more');
  }
}
