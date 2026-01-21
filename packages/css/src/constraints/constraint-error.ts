import { NgCorexError } from '../errors/ngcorex-error.js';
import type { ConstraintLevel } from '../config/schema.js';

export function constraintViolation(
  level: ConstraintLevel,
  rule: string,
  message: string,
  fix: string
): void {
  if (level === 'off') {
    return;
  }

  if (level === 'error') {
    throw new NgCorexError(
      `Constraint violation: ${rule}`,
      `${message}\n\nFix:\n${fix}`
    );
  }

  // warning
  console.warn(
    `ngCorex Warning: ${rule}\n\n${message}\n\nFix:\n${fix}\n`
  );
}
