import type { ConstraintLevel } from '../config/schema.js';

export function resolveConstraintLevel(
  userLevel: ConstraintLevel | undefined,
  defaultLevel: ConstraintLevel
): ConstraintLevel {
  if (!userLevel) return defaultLevel;

  if (userLevel === 'off') return 'off';
  if (userLevel === 'warning') return 'warning';
  if (userLevel === 'error') return 'error';

  return defaultLevel;
}
