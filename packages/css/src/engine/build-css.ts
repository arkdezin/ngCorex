import type { NgCorexConfig } from '../config/schema.js';
import { normalizeTokenScale } from '../tokens/normalize.js';
import { normalizeColorTokens } from '../tokens/normalize-colors.js';
import { generateCssVariables } from '../tokens/generate-css.js';
import type { NormalizedTokenGroup } from '../tokens/types.js';
import { presetRegistry } from '../presets/index.js';
import { NgCorexError } from '../errors/ngcorex-error.js';
import { deepMerge } from '../utils/deep-merge.js';
import { runConstraints } from '../constraints/run-constraints.js';
import { wrapCss } from '../output/wrap-css.js';



/**
 * Build CSS variables from ngCorex config
 */
export function buildCssFromConfig(config: NgCorexConfig): string {
  const allTokens: NormalizedTokenGroup = {};

let resolvedTokens = {} as NonNullable<NgCorexConfig['tokens']>;

// 1. Apply presets
if (config.presets) {
  for (const presetName of config.presets) {
    const preset = presetRegistry[presetName];

    if (!preset) {
      throw new NgCorexError(
        'Unknown preset',
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
  runConstraints({ tokens });

  if (!tokens) {
    return '';
  }

  // 3. Normalize spacing
  if (tokens.spacing) {
    Object.assign(
      allTokens,
      normalizeTokenScale('spacing', tokens.spacing)
    );
  }

  // 4. Normalize colors
  if (tokens.colors) {
    Object.assign(
      allTokens,
      normalizeColorTokens(tokens.colors)
    );
  }

  // 5. Normalize radius
  if (tokens.radius) {
    Object.assign(
      allTokens,
      normalizeTokenScale('radius', tokens.radius)
    );
  }

  // 6. Normalize z-index
  if (tokens.zIndex) {
    Object.assign(
      allTokens,
      normalizeTokenScale('zIndex', tokens.zIndex)
    );
  }

  // 7. Normalize typography
  if (tokens.typography) {
    if (tokens.typography.fontSize) {
      Object.assign(
        allTokens,
        normalizeTokenScale('fontSize', tokens.typography.fontSize)
      );
    }
    if (tokens.typography.fontWeight) {
      Object.assign(
        allTokens,
        normalizeTokenScale('fontWeight', tokens.typography.fontWeight)
      );
    }
    if (tokens.typography.lineHeight) {
      Object.assign(
        allTokens,
        normalizeTokenScale('lineHeight', tokens.typography.lineHeight)
      );
    }
  }

  // 8. Normalize shadows
  if (tokens.shadows) {
    Object.assign(
      allTokens,
      normalizeTokenScale('shadows', tokens.shadows)
    );
  }

  // 9. Generate CSS
  const css = generateCssVariables(allTokens);

  return wrapCss(css, config.output?.layer);

}
