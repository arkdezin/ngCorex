// Config API
export { defineNgCorexConfig } from './config/define-config.js';
export type {
  NgCorexConfig,
  TokensConfig,
  UtilitiesConfig,
  ConstraintsConfig
} from './config/schema.js';

// Token system
export type {
  TokenScale,
  NormalizedToken,
  NormalizedTokenGroup
} from './tokens/types.js';

export { normalizeTokenScale } from './tokens/normalize.js';

export { normalizeColorTokens } from './tokens/normalize-colors.js';

export { generateCssVariables } from './tokens/generate-css.js';

export { buildCssFromConfig } from './engine/build-css.js';

export { presetRegistry } from './presets/index.js';

export { NgCorexError } from './errors/ngcorex-error.js';

export { runConstraints } from './constraints/run-constraints.js';

export { wrapCss } from './output/wrap-css.js';

