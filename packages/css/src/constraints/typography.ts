import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';
import type { ConstraintLevel } from '../config/schema.js';

export interface TypographyTokens {
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string>;
  lineHeight?: Record<string, string>;
}

/**
 * Validate typography token constraints
 */
export function validateTypographyConstraints(
  typography: TypographyTokens,
  config?: ConstraintConfig['typography']
): void {
  if (typography.fontSize) {
    validateFontSizeConstraints(typography.fontSize, config?.fontSize);
  }

  if (typography.fontWeight) {
    validateFontWeightConstraints(typography.fontWeight, config?.fontWeight);
  }

  if (typography.lineHeight) {
    validateLineHeightConstraints(typography.lineHeight, config?.lineHeight);
  }
}

/**
 * Validate font size constraints
 */
function validateFontSizeConstraints(
  fontSize: Record<string, string>,
  config?: { format?: ConstraintLevel; type?: ConstraintLevel }
): void {
  for (const key in fontSize) {
    const value = fontSize[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'typography.fontSize.type',
        `Token typography.fontSize.${key} is not a string.`,
        `Change typography.fontSize.${key} to a string value like "16px" or "1rem".`
      );
      return;
    }

    if (isValidFontSizeValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'typography.fontSize.format',
      `Token typography.fontSize.${key} has invalid value "${value}".`,
      `Use a numeric value with a unit (px, rem, em, %).`
    );
  }
}

/**
 * Validate font weight constraints
 */
function validateFontWeightConstraints(
  fontWeight: Record<string, string>,
  config?: { format?: ConstraintLevel; type?: ConstraintLevel }
): void {
  for (const key in fontWeight) {
    const value = fontWeight[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'typography.fontWeight.type',
        `Token typography.fontWeight.${key} is not a string.`,
        `Change typography.fontWeight.${key} to a string value like "400" or "bold".`
      );
      return;
    }

    if (isValidFontWeightValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'typography.fontWeight.format',
      `Token typography.fontWeight.${key} has invalid value "${value}".`,
      `Use a numeric weight (100-900) or a named weight (normal, bold, etc.).`
    );
  }
}

/**
 * Validate line height constraints
 */
function validateLineHeightConstraints(
  lineHeight: Record<string, string>,
  config?: { format?: ConstraintLevel; type?: ConstraintLevel }
): void {
  for (const key in lineHeight) {
    const value = lineHeight[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'typography.lineHeight.type',
        `Token typography.lineHeight.${key} is not a string.`,
        `Change typography.lineHeight.${key} to a string value like "1.5" or "24px".`
      );
      return;
    }

    if (isValidLineHeightValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'typography.lineHeight.format',
      `Token typography.lineHeight.${key} has invalid value "${value}".`,
      `Use a unitless number, or a value with a unit (px, rem, em, %).`
    );
  }
}

function isValidFontSizeValue(value: string): boolean {
  const unitPattern = /^\d*\.?\d+(px|rem|em|%)$/;
  return unitPattern.test(value);
}

function isValidFontWeightValue(value: string): boolean {
  // Numeric weights: 100, 200, ..., 900
  const numericPattern = /^[1-9]00$/;
  // Named weights
  const namedWeights = /^(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)$/;

  return numericPattern.test(value) || namedWeights.test(value);
}

function isValidLineHeightValue(value: string): boolean {
  // Unitless number (most common for line-height)
  const unitlessPattern = /^\d*\.?\d+$/;
  // With units
  const unitPattern = /^\d*\.?\d+(px|rem|em|%)$/;
  // Special CSS values
  const specialValues = /^(normal|inherit|initial|revert|unset)$/;

  return unitlessPattern.test(value) || unitPattern.test(value) || specialValues.test(value);
}
