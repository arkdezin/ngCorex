import type { NormalizedTokenGroup } from './types.js';
import type { SemanticTokensConfig } from '../config/schema.js';
import { NgCorexError, NgCorexErrorCode } from '../errors/ngcorex-error.js';

const CSS_VAR_PREFIX = 'nx';

/**
 * Resolve a token reference like "$colors.primary.500" to "var(--nx-color-primary-500)"
 *
 * Strategy: convert the reference path to a dash-separated name, then search
 * allTokens for a token whose `name` field matches. Handles the colors → color
 * prefix difference automatically via the search.
 */
function resolveReference(
  ref: string,
  allTokens: NormalizedTokenGroup,
  context: string
): string {
  // Strip leading $
  const path = ref.slice(1); // e.g. "colors.primary.500"

  // Convert dots to dashes for name matching
  const dashPath = path.replace(/\./g, '-'); // e.g. "colors-primary-500"

  // Search allTokens by exact name match
  for (const key in allTokens) {
    if (allTokens[key].name === dashPath) {
      return `var(${allTokens[key].cssVariable})`;
    }
  }

  // Try with known category normalizations (colors → color)
  const categoryAliases: Record<string, string> = {
    'colors': 'color',
    'shadows': 'shadow',
  };

  for (const [from, to] of Object.entries(categoryAliases)) {
    const aliasedPath = dashPath.replace(new RegExp(`^${from}-`), `${to}-`);
    for (const key in allTokens) {
      if (allTokens[key].name === aliasedPath) {
        return `var(${allTokens[key].cssVariable})`;
      }
    }
  }

  throw new NgCorexError(
    NgCorexErrorCode.INVALID_TOKEN_STRING,
    `Unresolved semantic token reference`,
    `Token: ${context}
Value: ${ref}
Could not find a primitive token matching "${path}".

Fix:
Make sure the referenced token exists in your tokens config.
Example: "$colors.primary.500" requires colors.primary.500 to be defined.`
  );
}

/**
 * Normalize semantic tokens into NormalizedTokenGroup.
 * Must run AFTER all primitive tokens are normalized.
 *
 * Input:
 *   { surface: { background: '$colors.neutral.50' } }
 *
 * Output:
 *   { 'surface-background': { name: 'surface-background', cssVariable: '--nx-surface-background', value: 'var(--nx-color-neutral-50)' } }
 */
export function normalizeSemanticTokens(
  semantic: SemanticTokensConfig,
  allTokens: NormalizedTokenGroup
): NormalizedTokenGroup {
  const result: NormalizedTokenGroup = {};

  for (const category in semantic) {
    const scale = semantic[category];

    for (const key in scale) {
      const rawValue = scale[key];
      const context = `semantic.${category}.${key}`;

      // Resolve reference or use literal value
      const value = rawValue.startsWith('$')
        ? resolveReference(rawValue, allTokens, context)
        : rawValue;

      const name = `${category}-${key}`;
      const cssVariable = `--${CSS_VAR_PREFIX}-${name}`;

      result[`${category}-${key}`] = { name, cssVariable, value };
    }
  }

  return result;
}