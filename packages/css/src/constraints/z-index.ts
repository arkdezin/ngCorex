import { constraintViolation } from './constraint-error.js';
import { resolveConstraintLevel } from './resolve-level.js';
import type { ConstraintConfig } from '../config/schema.js';

/**
 * Validate z-index token constraints
 */
export function validateZIndexConstraints(
  zIndex: Record<string, string>,
  config?: ConstraintConfig['zIndex']
): void {
  for (const key in zIndex) {
    const value = zIndex[key];

    if (typeof value !== 'string') {
      constraintViolation(
        resolveConstraintLevel(config?.type, 'error'),
        'zIndex.type',
        `Token zIndex.${key} is not a string.`,
        `Change zIndex.${key} to a string value like "1000" or "auto".`
      );
      return;
    }

    if (isValidZIndexValue(value)) {
      continue;
    }

    constraintViolation(
      resolveConstraintLevel(config?.format, 'error'),
      'zIndex.format',
      `Token zIndex.${key} has invalid value "${value}".`,
      `Use a positive integer string (e.g., "1000", "2000") or the "auto" keyword.`
    );
  }
}

function isValidZIndexValue(value: string): boolean {
  // Allow positive integers
  const integerPattern = /^\d+$/;
  // Allow special CSS values
  const specialValues = /^(auto|inherit|initial|revert|unset)$/;

  return integerPattern.test(value) || specialValues.test(value);
}
