import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';

/**
 * Validate border radius token constraints
 */
export function validateRadiusConstraints(
  radius: Record<string, string>,
  config?: ConstraintConfig['radius']
): void {
  for (const key in radius) {
    const value = radius[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'radius.type',
        `Token radius.${key} is not a string.`,
        `Change radius.${key} to a string value like "4px" or "0.5rem".`
      );
      return;
    }

    if (isUnitlessNumber(value)) {
      radius[key] = `${value}px`;

      constraintViolation(
        resolveConstraintLevel(config?.unit, 'warning'),
        'radius.unit',
        `Token radius.${key} had no unit. Defaulted to "${radius[key]}".`,
        `Explicitly add a unit (e.g. "px", "rem", "em", "%") to radius.${key}.`
      );
      continue;
    }

    if (isValidRadiusValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'radius.format',
      `Token radius.${key} has invalid value "${value}".`,
      `Use a numeric value with a unit (px, rem, em, %) or the "full" keyword.`
    );
  }
}

function isUnitlessNumber(value: string): boolean {
  return /^-?\d*\.?\d+$/.test(value);
}

function isValidRadiusValue(value: string): boolean {
  // Allow units: px, rem, em, %
  // Also allow special values like 'full'
  const unitPattern = /^\d*\.?\d+(px|rem|em|%)$/;
  const specialValues = /^(full|none|inherit|initial|revert|unset)$/;

  return unitPattern.test(value) || specialValues.test(value);
}
