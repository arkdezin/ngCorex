import type { TokenScale, NormalizedToken, NormalizedTokenGroup } from './types.ts';
import { NgCorexError } from '../errors/ngcorex-error.js';


const CSS_VAR_PREFIX = 'nx';

/**
 * Normalize a single token scale (e.g. spacing, radius)
 */
export function normalizeTokenScale(
  category: string,
  scale: TokenScale
): NormalizedTokenGroup {
  const result: NormalizedTokenGroup = {};

  for (const key in scale) {
    const value = scale[key];

    // Basic validation
    if (typeof value !== 'string') {
      throw new NgCorexError(
        `Invalid ${category} token`,
        `Token: ${category}.${key}
      Value: ${String(value)}
      Expected: string (e.g. "1rem")

      Fix:
      Update ${category}.${key} in ngcorex.config.ts`
      );
    }

    const name = `${category}-${key}`;
    const cssVariable = `--${CSS_VAR_PREFIX}-${name}`;

    result[key] = {
      name,
      cssVariable,
      value
    };
  }

  return result;
}
