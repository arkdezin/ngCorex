/**
 * Color format validation
 * Checks for valid CSS color formats and consistency
 */

import type {
  ValidationResult,
  TokensForValidation,
  ColorFormatIssue
} from './types.js';

/**
 * Validation code for color format
 */
const COLOR_FORMAT_CODE = 'COLOR_FORMAT';

/**
 * Color format patterns
 */
const COLOR_PATTERNS = {
  // Hex colors: #fff or #ffffff
  hex3: /^#([0-9a-fA-F]{3})$/,
  hex4: /^#([0-9a-fA-F]{4})$/,
  hex6: /^#([0-9a-fA-F]{6})$/,
  hex8: /^#([0-9a-fA-F]{8})$/,

  // RGB/RGBA: rgb(r, g, b) or rgba(r, g, b, a)
  rgb: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  rgba: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]?\.?\d*)\s*\)$/,

  // HSL/HSLA: hsl(h, s%, l%) or hsla(h, s%, l%, a)
  hsl: /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/,
  hsla: /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([01]?\.?\d*)\s*\)$/,

  // Named colors
  named: /^[a-zA-Z]+$/
};

/**
 * Determine the color format type
 */
export function getColorFormat(value: string): string | null {
  if (COLOR_PATTERNS.hex3.test(value)) return 'hex3';
  if (COLOR_PATTERNS.hex4.test(value)) return 'hex4';
  if (COLOR_PATTERNS.hex6.test(value)) return 'hex6';
  if (COLOR_PATTERNS.hex8.test(value)) return 'hex8';
  if (COLOR_PATTERNS.rgb.test(value)) return 'rgb';
  if (COLOR_PATTERNS.rgba.test(value)) return 'rgba';
  if (COLOR_PATTERNS.hsl.test(value)) return 'hsl';
  if (COLOR_PATTERNS.hsla.test(value)) return 'hsla';
  if (COLOR_PATTERNS.named.test(value)) return 'named';
  return null;
}

/**
 * Check if a color value is valid
 */
export function isValidColor(value: string): boolean {
  return getColorFormat(value) !== null;
}

/**
 * Validate RGB values
 */
function validateRgbValues(r: number, g: number, b: number): boolean {
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

/**
 * Validate HSL hue value
 */
function validateHslHue(h: number): boolean {
  return h >= 0 && h <= 360;
}

/**
 * Validate HSL saturation/lightness values
 */
function validateHslPercent(s: number, l: number): boolean {
  return s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

/**
 * Check for deprecated color formats
 */
function isDeprecatedFormat(format: string): boolean {
  // hex3 and hex4 are shorter but less precise
  return format === 'hex3' || format === 'hex4';
}

/**
 * Validate a single color value
 */
function validateColorValue(
  path: string,
  value: string,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult | null {
  const format = getColorFormat(value);

  if (!format) {
    return {
      severity: 'error',
      code: COLOR_FORMAT_CODE,
      message: `Invalid color format: "${value}"`,
      path,
      suggestion: 'Use a valid CSS color format: hex (#ffffff), rgb(255,255,255), rgba(255,255,255,1), hsl(0,0%,100%), or a named color.',
      example: `// Examples:\n// "${path}": "#ffffff"\n// "${path}": "rgb(255, 255, 255)"`
    };
  }

  // Check for deprecated formats
  if (isDeprecatedFormat(format)) {
    return {
      severity: 'info',
      code: COLOR_FORMAT_CODE,
      message: `Using deprecated color format: "${format}"`,
      path,
      suggestion: 'Consider using the full 6-digit hex format for better precision and consistency.',
      example: `// Change from:\n// "${path}": "${value}"\n// To:\n// "${path}": "${expandHex(value)}"`
    };
  }

  // Validate RGB values if applicable
  if (format === 'rgb' || format === 'rgba') {
    const match = value.match(format === 'rgb' ? COLOR_PATTERNS.rgb : COLOR_PATTERNS.rgba);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      if (!validateRgbValues(r, g, b)) {
        return {
          severity: 'error',
          code: COLOR_FORMAT_CODE,
          message: `Invalid RGB values in color: "${value}"`,
          path,
          suggestion: 'RGB values must be between 0 and 255.',
          example: `// Example:\n// "${path}": "rgb(255, 255, 255)"`
        };
      }
    }
  }

  // Validate HSL values if applicable
  if (format === 'hsl' || format === 'hsla') {
    const match = value.match(format === 'hsl' ? COLOR_PATTERNS.hsl : COLOR_PATTERNS.hsla);
    if (match) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      if (!validateHslHue(h) || !validateHslPercent(s, l)) {
        return {
          severity: 'error',
          code: COLOR_FORMAT_CODE,
          message: `Invalid HSL values in color: "${value}"`,
          path,
          suggestion: 'HSL hue must be 0-360, saturation and lightness must be 0-100%.',
          example: `// Example:\n// "${path}": "hsl(0, 0%, 100%)"`
        };
      }
    }
  }

  return null;
}

/**
 * Expand a short hex color to full format
 */
function expandHex(hex: string): string {
  if (COLOR_PATTERNS.hex3.test(hex)) {
    return '#' + hex.slice(1).split('').map(c => c + c).join('');
  }
  if (COLOR_PATTERNS.hex4.test(hex)) {
    const chars = hex.slice(1).split('');
    return '#' + chars[0] + chars[0] + chars[1] + chars[1] + chars[2] + chars[2];
  }
  return hex;
}

/**
 * Collect all color values from tokens
 */
function collectColorValues(
  colors: unknown,
  path: string = 'colors'
): Array<{ path: string; value: string }> {
  const results: Array<{ path: string; value: string }> = [];

  if (typeof colors === 'string') {
    results.push({ path, value: colors });
  } else if (typeof colors === 'object' && colors !== null && !Array.isArray(colors)) {
    for (const [key, value] of Object.entries(colors)) {
      results.push(...collectColorValues(value, `${path}.${key}`));
    }
  }

  return results;
}

/**
 * Check for inconsistent color formats within a color family
 */
function checkColorFormatConsistency(
  colorValues: Array<{ path: string; value: string }>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Group by color family (e.g., gray, blue, red)
  const families = new Map<string, Array<{ path: string; value: string; format: string }>>();

  for (const { path, value } of colorValues) {
    const format = getColorFormat(value);
    if (!format) continue;

    const pathParts = path.split('.');
    const family = pathParts[1] || 'default';

    if (!families.has(family)) {
      families.set(family, []);
    }
    families.get(family)!.push({ path, value, format });
  }

  // Check each family for format consistency
  for (const [family, values] of families.entries()) {
    if (values.length < 2) continue;

    const formats = new Set(values.map(v => v.format));
    if (formats.size > 1) {
      const formatList = Array.from(formats).sort().join(', ');
      results.push({
        severity,
        code: COLOR_FORMAT_CODE,
        message: `Inconsistent color formats in "${family}" family: ${formatList}`,
        path: `colors.${family}`,
        suggestion: 'Use consistent color formats within a color family for better maintainability.',
        example: `// Example - use hex6 format:\n// "colors.${family}.100": "#f3f4f6"\n// "colors.${family}.900": "#111827"`
      });
    }
  }

  return results;
}

/**
 * Validate all color formats
 */
export function validateColorFormat(
  tokens: TokensForValidation,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!tokens.colors) {
    return results;
  }

  // Collect all color values
  const colorValues = collectColorValues(tokens.colors);

  // Validate each color value
  for (const { path, value } of colorValues) {
    const result = validateColorValue(path, value, severity);
    if (result) {
      results.push(result);
    }
  }

  // Check for format consistency
  results.push(...checkColorFormatConsistency(colorValues, severity));

  return results;
}

/**
 * Get a summary of color format issues
 */
export function getColorFormatSummary(issues: ColorFormatIssue[]): string {
  if (issues.length === 0) {
    return 'No color format issues found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${issues.length} color format issue${issues.length > 1 ? 's' : ''}:`);

  for (const issue of issues) {
    summary.push(`  • ${issue.path}: ${issue.issue}`);
    summary.push(`    ${issue.details}`);
    summary.push(`    💡 ${issue.suggestion}`);
  }

  return summary.join('\n');
}
