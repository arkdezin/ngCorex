/**
 * Wrap CSS in a layer if configured
 */
export function wrapCss(
  css: string,
  layer?: string
): string {
  if (!layer) {
    return css;
  }

  return `@layer ${layer} {\n${indent(css)}\n}`;
}

function indent(css: string): string {
  return css
    .split('\n')
    .map(line => `  ${line}`)
    .join('\n');
}
