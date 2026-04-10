import type { NgCorexConfig } from '../config/schema.js';
import type { NormalizedTokenGroup } from '../tokens/types.js';
import { normalizeTokenScale } from '../tokens/normalize.js';
import { normalizeColorTokens } from '../tokens/normalize-colors.js';
import { normalizeSemanticTokens } from '../tokens/normalize-semantic.js';
import { presetRegistry } from '../presets/index.js';
import { deepMerge } from '../utils/deep-merge.js';
import { NgCorexError, NgCorexErrorCode } from '../errors/ngcorex-error.js';
import { generateUtilities } from '../utils/generate-utilities.js';

/**
 * Build utility classes from ngCorex config.
 * Returns an empty string if utilities are not enabled.
 * Fully self-contained — no shared state with buildCssFromConfig.
 */
export function buildUtilitiesFromConfig(config: NgCorexConfig): string {
  if (!config.utilities?.enabled) {
    return '';
  }

  const allTokens: NormalizedTokenGroup = {};

  // 1. Apply presets
  let resolvedTokens = {} as NonNullable<NgCorexConfig['tokens']>;

  if (config.presets) {
    for (const presetName of config.presets) {
      const preset = presetRegistry[presetName];

      if (!preset) {
        throw new NgCorexError(
          NgCorexErrorCode.UNKNOWN_PRESET_STRING,
          `Preset "${presetName}" does not exist.

Available presets:
- ${Object.keys(presetRegistry).join('\n- ')}

Fix:
Use one of the available presets or remove it from ngcorex.config.ts`
        );
      }

      if (preset.tokens) {
        resolvedTokens = deepMerge(resolvedTokens, preset.tokens);
      }
    }
  }

  // 2. Apply user overrides
  if (config.tokens) {
    resolvedTokens = deepMerge(resolvedTokens, config.tokens);
  }

  const tokens = resolvedTokens;

  if (!tokens) {
    return '';
  }

  // 3. Normalize spacing
  if (tokens.spacing) {
    Object.assign(allTokens, normalizeTokenScale('spacing', tokens.spacing));
  }

  // 4. Normalize colors
  if (tokens.colors) {
    Object.assign(allTokens, normalizeColorTokens(tokens.colors));
  }

  // 5. Normalize radius
  if (tokens.radius) {
    Object.assign(allTokens, normalizeTokenScale('radius', tokens.radius));
  }

  // 6. Normalize z-index
  if (tokens.zIndex) {
    Object.assign(allTokens, normalizeTokenScale('zIndex', tokens.zIndex));
  }

  // 7. Normalize typography
  if (tokens.typography) {
    if (tokens.typography.fontSize) {
      Object.assign(allTokens, normalizeTokenScale('fontSize', tokens.typography.fontSize));
    }
    if (tokens.typography.fontWeight) {
      Object.assign(allTokens, normalizeTokenScale('fontWeight', tokens.typography.fontWeight));
    }
    if (tokens.typography.lineHeight) {
      Object.assign(allTokens, normalizeTokenScale('lineHeight', tokens.typography.lineHeight));
    }
  }

  // 8. Normalize shadows
  if (tokens.shadows) {
    Object.assign(allTokens, normalizeTokenScale('shadows', tokens.shadows));
  }

  // 9. Normalize opacity
  if (tokens.opacity) {
    Object.assign(allTokens, normalizeTokenScale('opacity', tokens.opacity));
  }

  // 10. Normalize borders
  if (tokens.borders) {
    if (tokens.borders.width) {
      Object.assign(allTokens, normalizeTokenScale('border-width', tokens.borders.width));
    }
    if (tokens.borders.style) {
      Object.assign(allTokens, normalizeTokenScale('border-style', tokens.borders.style));
    }
  }

  // 11. Normalize gradients
  if (tokens.gradients) {
    Object.assign(allTokens, normalizeTokenScale('gradient', tokens.gradients));
  }

  // 12. Normalize icons
  if (tokens.icons) {
    Object.assign(allTokens, normalizeTokenScale('icon', tokens.icons));
  }

  // 13. Normalize semantic tokens (must run after all primitives)
  if (config.semantic) {
    Object.assign(allTokens, normalizeSemanticTokens(config.semantic, allTokens));
  }

  // 14. Generate utility classes
  return generateUtilities(allTokens, config.utilities);
}
