import type { NormalizedTokenGroup, NormalizedToken } from '../tokens/types.js';
import type { UtilitiesConfig } from '../config/schema.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTokensByPrefix(tokens: NormalizedTokenGroup, prefix: string): NormalizedToken[] {
  const prefixWithDash = prefix + '-';
  return Object.values(tokens).filter(token => token.name.startsWith(prefixWithDash));
}

function getSuffix(token: NormalizedToken, prefix: string): string {
  return token.name.slice(prefix.length + 1);
}

function rule(selector: string, declarations: string): string {
  return `${selector} { ${declarations} }`;
}

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

function generateSpacing(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  const spacingTokens = getTokensByPrefix(tokens, 'spacing');
  if (spacingTokens.length === 0) return '';

  const sections: string[] = [];

  // Margin
  if (config.spacing?.margin !== false) {
    const lines: string[] = ['/* Spacing — Margin */'];
    for (const token of spacingTokens) {
      const s = getSuffix(token, 'spacing');
      const v = `var(${token.cssVariable})`;
      lines.push(rule(`.m-${s}`, `margin: ${v}`));
      lines.push(rule(`.mt-${s}`, `margin-top: ${v}`));
      lines.push(rule(`.mr-${s}`, `margin-right: ${v}`));
      lines.push(rule(`.mb-${s}`, `margin-bottom: ${v}`));
      lines.push(rule(`.ml-${s}`, `margin-left: ${v}`));
      lines.push(rule(`.mx-${s}`, `margin-left: ${v}; margin-right: ${v}`));
      lines.push(rule(`.my-${s}`, `margin-top: ${v}; margin-bottom: ${v}`));
    }
    sections.push(lines.join('\n'));
  }

  // Padding
  if (config.spacing?.padding !== false) {
    const lines: string[] = ['/* Spacing — Padding */'];
    for (const token of spacingTokens) {
      const s = getSuffix(token, 'spacing');
      const v = `var(${token.cssVariable})`;
      lines.push(rule(`.p-${s}`, `padding: ${v}`));
      lines.push(rule(`.pt-${s}`, `padding-top: ${v}`));
      lines.push(rule(`.pr-${s}`, `padding-right: ${v}`));
      lines.push(rule(`.pb-${s}`, `padding-bottom: ${v}`));
      lines.push(rule(`.pl-${s}`, `padding-left: ${v}`));
      lines.push(rule(`.px-${s}`, `padding-left: ${v}; padding-right: ${v}`));
      lines.push(rule(`.py-${s}`, `padding-top: ${v}; padding-bottom: ${v}`));
    }
    sections.push(lines.join('\n'));
  }

  // Gap
  if (config.spacing?.gap !== false) {
    const lines: string[] = ['/* Spacing — Gap */'];
    for (const token of spacingTokens) {
      const s = getSuffix(token, 'spacing');
      lines.push(rule(`.gap-${s}`, `gap: var(${token.cssVariable})`));
    }
    sections.push(lines.join('\n'));
  }

  // Width
  if (config.spacing?.width !== false) {
    const lines: string[] = ['/* Spacing — Width */'];
    for (const token of spacingTokens) {
      const s = getSuffix(token, 'spacing');
      lines.push(rule(`.w-${s}`, `width: var(${token.cssVariable})`));
    }
    sections.push(lines.join('\n'));
  }

  // Height
  if (config.spacing?.height !== false) {
    const lines: string[] = ['/* Spacing — Height */'];
    for (const token of spacingTokens) {
      const s = getSuffix(token, 'spacing');
      lines.push(rule(`.h-${s}`, `height: var(${token.cssVariable})`));
    }
    sections.push(lines.join('\n'));
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

function generateColors(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.color) return '';

  const colorTokens = getTokensByPrefix(tokens, 'color');
  if (colorTokens.length === 0) return '';

  const sections: string[] = [];

  // Text
  const textPalettes = config.color.text;
  if (textPalettes && textPalettes.length > 0) {
    const lines: string[] = ['/* Color — Text */'];
    for (const palette of textPalettes) {
      const paletteTokens = colorTokens.filter(t => t.name.startsWith(`color-${palette}-`));
      for (const token of paletteTokens) {
        const suffix = getSuffix(token, 'color');
        lines.push(rule(`.text-${suffix}`, `color: var(${token.cssVariable})`));
      }
    }
    if (lines.length > 1) sections.push(lines.join('\n'));
  }

  // Background
  const bgPalettes = config.color.background;
  if (bgPalettes && bgPalettes.length > 0) {
    const lines: string[] = ['/* Color — Background */'];
    for (const palette of bgPalettes) {
      const paletteTokens = colorTokens.filter(t => t.name.startsWith(`color-${palette}-`));
      for (const token of paletteTokens) {
        const suffix = getSuffix(token, 'color');
        lines.push(rule(`.bg-${suffix}`, `background-color: var(${token.cssVariable})`));
      }
    }
    if (lines.length > 1) sections.push(lines.join('\n'));
  }

  // Border color
  const borderPalettes = config.color.border;
  if (borderPalettes && borderPalettes.length > 0) {
    const lines: string[] = ['/* Color — Border */'];
    for (const palette of borderPalettes) {
      const paletteTokens = colorTokens.filter(t => t.name.startsWith(`color-${palette}-`));
      for (const token of paletteTokens) {
        const suffix = getSuffix(token, 'color');
        lines.push(rule(`.border-${suffix}`, `border-color: var(${token.cssVariable})`));
      }
    }
    if (lines.length > 1) sections.push(lines.join('\n'));
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Layout (hardcoded)
// ---------------------------------------------------------------------------

function generateLayout(config: UtilitiesConfig): string {
  if (!config.layout) return '';

  const sections: string[] = [];

  // Display
  if (config.layout.display !== false) {
    const lines = [
      '/* Layout — Display */',
      rule('.flex', 'display: flex'),
      rule('.inline-flex', 'display: inline-flex'),
      rule('.block', 'display: block'),
      rule('.inline-block', 'display: inline-block'),
      rule('.inline', 'display: inline'),
      rule('.hidden', 'display: none'),
    ];
    sections.push(lines.join('\n'));
  }

  // Flex
  if (config.layout.flex !== false) {
    const lines = [
      '/* Layout — Flex */',
      rule('.flex-row', 'flex-direction: row'),
      rule('.flex-col', 'flex-direction: column'),
      rule('.flex-wrap', 'flex-wrap: wrap'),
      rule('.flex-nowrap', 'flex-wrap: nowrap'),
      rule('.items-start', 'align-items: flex-start'),
      rule('.items-center', 'align-items: center'),
      rule('.items-end', 'align-items: flex-end'),
      rule('.justify-start', 'justify-content: flex-start'),
      rule('.justify-center', 'justify-content: center'),
      rule('.justify-end', 'justify-content: flex-end'),
      rule('.justify-between', 'justify-content: space-between'),
      rule('.justify-around', 'justify-content: space-around'),
    ];
    sections.push(lines.join('\n'));
  }

  // Grid
  if (config.layout.grid !== false) {
    const lines: string[] = ['/* Layout — Grid */'];
    lines.push(rule('.grid', 'display: grid'));
    for (let n = 1; n <= 12; n++) {
      lines.push(rule(`.grid-cols-${n}`, `grid-template-columns: repeat(${n}, minmax(0, 1fr))`));
    }
    sections.push(lines.join('\n'));
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

function generateTypography(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.typography) return '';

  const sections: string[] = [];

  // Font size
  if (config.typography.fontSize) {
    const fsTokens = getTokensByPrefix(tokens, 'fontSize');
    if (fsTokens.length > 0) {
      const lines: string[] = ['/* Typography — Font Size */'];
      for (const token of fsTokens) {
        const s = getSuffix(token, 'fontSize');
        lines.push(rule(`.text-${s}`, `font-size: var(${token.cssVariable})`));
      }
      sections.push(lines.join('\n'));
    }
  }

  // Font weight
  if (config.typography.fontWeight) {
    const fwTokens = getTokensByPrefix(tokens, 'fontWeight');
    if (fwTokens.length > 0) {
      const lines: string[] = ['/* Typography — Font Weight */'];
      for (const token of fwTokens) {
        const s = getSuffix(token, 'fontWeight');
        lines.push(rule(`.font-${s}`, `font-weight: var(${token.cssVariable})`));
      }
      sections.push(lines.join('\n'));
    }
  }

  // Line height
  if (config.typography.lineHeight) {
    const lhTokens = getTokensByPrefix(tokens, 'lineHeight');
    if (lhTokens.length > 0) {
      const lines: string[] = ['/* Typography — Line Height */'];
      for (const token of lhTokens) {
        const s = getSuffix(token, 'lineHeight');
        lines.push(rule(`.leading-${s}`, `line-height: var(${token.cssVariable})`));
      }
      sections.push(lines.join('\n'));
    }
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Radius
// ---------------------------------------------------------------------------

function generateRadius(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.radius) return '';

  const radiusTokens = getTokensByPrefix(tokens, 'radius');
  if (radiusTokens.length === 0) return '';

  const lines: string[] = ['/* Radius */'];
  for (const token of radiusTokens) {
    const s = getSuffix(token, 'radius');
    lines.push(rule(`.rounded-${s}`, `border-radius: var(${token.cssVariable})`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

function generateShadows(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.shadows) return '';

  const shadowTokens = getTokensByPrefix(tokens, 'shadows');
  if (shadowTokens.length === 0) return '';

  const lines: string[] = ['/* Shadows */'];
  for (const token of shadowTokens) {
    const s = getSuffix(token, 'shadows');
    lines.push(rule(`.shadow-${s}`, `box-shadow: var(${token.cssVariable})`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Opacity
// ---------------------------------------------------------------------------

function generateOpacity(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.opacity) return '';

  const opacityTokens = getTokensByPrefix(tokens, 'opacity');
  if (opacityTokens.length === 0) return '';

  const lines: string[] = ['/* Opacity */'];
  for (const token of opacityTokens) {
    const s = getSuffix(token, 'opacity');
    lines.push(rule(`.opacity-${s}`, `opacity: var(${token.cssVariable})`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Borders
// ---------------------------------------------------------------------------

function generateBorders(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.borders) return '';

  const sections: string[] = [];

  if (config.borders.width) {
    const widthTokens = getTokensByPrefix(tokens, 'border-width');
    if (widthTokens.length > 0) {
      const lines: string[] = ['/* Borders — Width */'];
      for (const token of widthTokens) {
        const s = getSuffix(token, 'border-width');
        lines.push(rule(`.border-w-${s}`, `border-width: var(${token.cssVariable})`));
      }
      sections.push(lines.join('\n'));
    }
  }

  if (config.borders.style) {
    const styleTokens = getTokensByPrefix(tokens, 'border-style');
    if (styleTokens.length > 0) {
      const lines: string[] = ['/* Borders — Style */'];
      for (const token of styleTokens) {
        const s = getSuffix(token, 'border-style');
        lines.push(rule(`.border-style-${s}`, `border-style: var(${token.cssVariable})`));
      }
      sections.push(lines.join('\n'));
    }
  }

  return sections.join('\n\n');
}

// ---------------------------------------------------------------------------
// Gradients
// ---------------------------------------------------------------------------

function generateGradients(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.gradients) return '';

  const gradientTokens = getTokensByPrefix(tokens, 'gradient');
  if (gradientTokens.length === 0) return '';

  const lines: string[] = ['/* Gradients */'];
  for (const token of gradientTokens) {
    const s = getSuffix(token, 'gradient');
    lines.push(rule(`.bg-gradient-${s}`, `background: var(${token.cssVariable})`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function generateIcons(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  if (!config.icons) return '';

  const iconTokens = getTokensByPrefix(tokens, 'icon');
  if (iconTokens.length === 0) return '';

  const lines: string[] = ['/* Icons */'];
  for (const token of iconTokens) {
    const s = getSuffix(token, 'icon');
    const v = `var(${token.cssVariable})`;
    lines.push(rule(`.icon-${s}`, `width: ${v}; height: ${v}`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Container (hardcoded)
// ---------------------------------------------------------------------------

function generateContainer(config: UtilitiesConfig): string {
  if (!config.container?.enabled) return '';

  const maxWidth = config.container.maxWidth ?? '1280px';
  const lines = [
    '/* Container */',
    rule('.container', `width: 100%; max-width: ${maxWidth}; margin-left: auto; margin-right: auto`),
  ];
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function generateUtilities(tokens: NormalizedTokenGroup, config: UtilitiesConfig): string {
  const sections: string[] = [
    generateSpacing(tokens, config),
    generateColors(tokens, config),
    generateLayout(config),
    generateTypography(tokens, config),
    generateRadius(tokens, config),
    generateShadows(tokens, config),
    generateOpacity(tokens, config),
    generateBorders(tokens, config),
    generateGradients(tokens, config),
    generateIcons(tokens, config),
    generateContainer(config),
  ].filter(s => s.length > 0);

  return sections.join('\n\n');
}
