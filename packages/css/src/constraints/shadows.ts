import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';

/**
 * Validate shadow token constraints
 */
export function validateShadowConstraints(
  shadows: Record<string, string>,
  config?: ConstraintConfig['shadows']
): void {
  for (const key in shadows) {
    const value = shadows[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'shadows.type',
        `Token shadows.${key} is not a string.`,
        `Change shadows.${key} to a string value like "0 1px 3px 0 rgba(0,0,0,0.1)".`
      );
      return;
    }

    if (isValidShadowValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'shadows.format',
      `Token shadows.${key} has invalid value "${value}".`,
      `Use a valid box-shadow syntax: "offset-x offset-y blur-radius spread-radius color".`
    );
  }
}

/**
 * Validate box-shadow syntax
 * Format: offset-x offset-y blur-radius spread-radius color
 * Examples:
 * - "0 1px 3px 0 rgba(0,0,0,0.1)"
 * - "0 4px 6px -1px rgba(0,0,0,0.1)"
 * - "0 0 0 1px rgba(0,0,0,0.1)"
 * - "none"
 * - "inherit"
 */
function isValidShadowValue(value: string): boolean {
  const specialValues = /^(none|inherit|initial|revert|unset)$/;

  if (specialValues.test(value)) {
    return true;
  }

  function splitShadowList(value: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of value) {
    if (char === '(') depth++;
    if (char === ')') depth--;

    if (char === ',' && depth === 0) {
      result.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

  const shadowParts = splitShadowList(value);

  for (const shadow of shadowParts) {
    if (!isValidSingleShadow(shadow)) {
      return false;
    }
  }

  return true;
}


function isValidSingleShadow(shadow: string): boolean {
  // A single box-shadow has the following components:
  // offset-x (required)
  // offset-y (required)
  // blur-radius (optional)
  // spread-radius (optional)
  // color (optional)
  // inset (optional, at the beginning)

  const tokens = shadow.split(/\s+/);

  // Must have at least offset-x and offset-y
  if (tokens.length < 2) {
    return false;
  }

  let hasInset = false;
  let offsetCount = 0;
  let blurRadius = false;
  let spreadRadius = false;
  let color = false;

  for (const token of tokens) {
    if (token === 'inset') {
      hasInset = true;
    } else if (isLengthValue(token)) {
      offsetCount++;
      if (offsetCount > 2) {
        if (!blurRadius) {
          blurRadius = true;
        } else if (!spreadRadius) {
          spreadRadius = true;
        }
      }
    } else if (isColorValue(token)) {
      color = true;
    }
  }

  // Must have at least offset-x and offset-y
  return offsetCount >= 2;
}

function isLengthValue(value: string): boolean {
  // Check for px, rem, em, %, or unitless (0)
  const lengthPattern = /^-?\d*\.?\d+(px|rem|em|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch)?$/;
  return lengthPattern.test(value);
}

function isColorValue(value: string): boolean {
  // Hex colors
  const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  // rgb/rgba - handle spaces and decimals properly
  const rgb = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(\s*,\s*[\d.]+)?\s*\)/;
  // hsl/hsla
  const hsl = /^hsla?\(\s*\d+(\.\d+)?\s*(deg|rad|turn)?\s*,\s*\d+%?\s*,\s*\d+%?(\s*,\s*[\d.]+)?\s*\)/;
  // Named colors (basic check) - must be after other checks
  const namedColor = /^[a-zA-Z]+$/;

  return hex.test(value) || rgb.test(value) || hsl.test(value) || namedColor.test(value);
}
