import { defineNgCorexConfig } from '@ngcorex/css';

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
