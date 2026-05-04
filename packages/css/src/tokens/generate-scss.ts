import type { NormalizedTokenGroup } from './types.js';

/**
 * Convert CSS variable name to SCSS variable name
 * --crx-spacing-sm → $crx-spacing-sm
 */
function toScssVar(cssVariable: string): string {
  return cssVariable.replace(/^--/, '$');
}

/**
 * Generate SCSS variables from normalized tokens
 *
 * Output:
 * $crx-spacing-sm: 8px;
 * $crx-color-primary-500: #3b82f6;
 */
export function generateScssVariables(
  tokens: NormalizedTokenGroup
): string {
  const lines: string[] = [];

  for (const key in tokens) {
    const token = tokens[key];
    lines.push(`${toScssVar(token.cssVariable)}: ${token.value};`);
  }

  return lines.join('\n');
}

/**
 * Generate a SCSS map from normalized tokens
 *
 * Output:
 * $ngcorex-tokens: (
 *   'spacing-sm': 8px,
 *   'color-primary-500': #3b82f6,
 * );
 */
export function generateScssMap(
  tokens: NormalizedTokenGroup,
  mapName = 'ngcorex-tokens'
): string {
  const lines: string[] = [];

  lines.push(`$${mapName}: (`);

  for (const key in tokens) {
    const token = tokens[key];
    lines.push(`  '${token.name}': ${token.value},`);
  }

  lines.push(');');

  return lines.join('\n');
}