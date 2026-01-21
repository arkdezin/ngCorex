import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';

/**
 * Validate color token constraints
 */
export function validateColorConstraints(
  colors: Record<string, Record<string, string>>,
  config?: ConstraintConfig['colors']
): void {
  for (const paletteName in colors) {
    const palette = colors[paletteName];

    const shadeKeys = Object.keys(palette);

    // 1. Shade keys must be numeric
    for (const key of shadeKeys) {
      if (Number.isNaN(Number(key))) {
        constraintViolation(
          resolveConstraintLevel(config?.shadeKey, 'error'),
          'color.shade.key',
          `Color scale "${paletteName}" contains non-numeric shade key "${key}".`,
          `Use numeric shade keys like 50, 100, 200, ..., 900.`
        );
      }
    }

    // 2. Validate each shade value
    for (const shade in palette) {
      const value = palette[shade];

      if (typeof value !== 'string') {
        constraintViolation(
          resolveConstraintLevel(config?.type, 'error'),
          'color.type',
          `Token colors.${paletteName}.${shade} is not a string.`,
          `Change colors.${paletteName}.${shade} to a valid color string.`
        );
        continue;
      }

      if (!isValidColor(value)) {
        constraintViolation(
          resolveConstraintLevel(config?.format, 'error'),
          'color.format',
          `Token colors.${paletteName}.${shade} has invalid value "${value}".`,
          `Allowed formats:
- Hex: #RGB or #RRGGBB
- rgb(r, g, b)
- rgba(r, g, b, a)

Examples:
- "#2563eb"
- "rgb(37, 99, 235)"
- "rgba(37, 99, 235, 0.8)"`
        );
      }
    }
  }
}

/**
 * Allowed color formats:
 * - #RGB
 * - #RRGGBB
 * - rgb()
 * - rgba()
 */
function isValidColor(value: string): boolean {
  const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const rgb =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgba =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|0?\.\d+|1(\.0+)?)\s*\)$/;

  return hex.test(value) || rgb.test(value) || rgba.test(value);
}
