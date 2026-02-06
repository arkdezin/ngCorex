import type {
  NestedTokenScale,
  NormalizedTokenGroup
} from './types.js';
import { NgCorexError, NgCorexErrorCode } from '../errors/ngcorex-error.js';

const CSS_VAR_PREFIX = 'nx';

/**
 * Normalize nested color tokens (e.g. primary.500)
 */
export function normalizeColorTokens(
  colors: NestedTokenScale
): NormalizedTokenGroup {
  const result: NormalizedTokenGroup = {};

  for (const paletteName in colors) {
    const palette = colors[paletteName];

    for (const shade in palette) {
      const value = palette[shade];

      if (typeof value !== 'string') {
        throw new NgCorexError(
          NgCorexErrorCode.INVALID_COLOR_TOKEN_STRING,
          `Token: colors.${paletteName}.${shade}
        Value: ${String(value)}
        Expected: string (e.g. "#ffffff")

        Fix:
        Update colors.${paletteName}.${shade} in ngcorex.config.ts`
        );
      }

      const name = `color-${paletteName}-${shade}`;
      const cssVariable = `--${CSS_VAR_PREFIX}-${name}`;

      result[`${paletteName}-${shade}`] = {
        name,
        cssVariable,
        value
      };
    }
  }

  return result;
}
