import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';

export function validateSpacingConstraints(
  spacing: Record<string, string>,
  config?: ConstraintConfig['spacing']
): void {
  for (const key in spacing) {
    const value = spacing[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'spacing.type',
        `Token spacing.${key} is not a string.`,
        `Change spacing.${key} to a string value like "8px" or "0.5rem".`
      );
      return;
    }

    if (isUnitlessNumber(value)) {
      spacing[key] = `${value}px`;

      constraintViolation(
        resolveConstraintLevel(config?.unit, 'warning'),
        'spacing.unit',
        `Token spacing.${key} had no unit. Defaulted to "${spacing[key]}".`,
        `Explicitly add a unit (e.g. "px", "rem") to spacing.${key}.`
      );
      continue;
    }

    if (isValidSpacingValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'spacing.format',
      `Token spacing.${key} has invalid value "${value}".`,
      `Use a numeric value with a unit.`
    );
  }
}

function isUnitlessNumber(value: string): boolean {
  return /^-?\d*\.?\d+$/.test(value);
}

function isValidSpacingValue(value: string): boolean {
  return /^-?\d*\.?\d+(px|rem|em|%)$/.test(value);
}
