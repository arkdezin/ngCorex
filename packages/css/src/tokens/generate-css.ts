import type { NormalizedTokenGroup } from './types.js';

/**
 * Generate CSS variables from normalized tokens
 */
export function generateCssVariables(
  tokens: NormalizedTokenGroup
): string {
  const lines: string[] = [];

  lines.push(':root {');

  for (const key in tokens) {
    const token = tokens[key];
    lines.push(`  ${token.cssVariable}: ${token.value};`);
  }

  lines.push('}');

  return lines.join('\n');
}
