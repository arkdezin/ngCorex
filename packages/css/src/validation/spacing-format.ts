/**
 * Spacing format validation
 * Checks for valid CSS spacing units and consistency
 */

import type {
  ValidationResult,
  TokensForValidation,
  SpacingFormatIssue
} from './types.js';

/**
 * Validation code for spacing format
 */
const SPACING_FORMAT_CODE = 'SPACING_FORMAT';

/**
 * Common CSS spacing units
 */
const VALID_SPACING_UNITS = new Set([
  'px', 'rem', 'em', '%', 'vh', 'vw', 'vmin', 'vmax', 'ch', 'ex', 'fr'
]);

/**
 * Recommended spacing units for design systems
 */
const RECOMMENDED_SPACING_UNITS = new Set(['rem', 'px']);

/**
 * Parse a spacing value to extract numeric value and unit
 */
function parseSpacingValue(value: string | number): { value: number; unit: string; raw: string } | null {
  let raw: string;
  let numericValue: number;
  let unit: string;

  if (typeof value === 'number') {
    raw = value.toString();
    numericValue = value;
    unit = '';
  } else {
    raw = value;
    const match = value.match(/^(-?\d*\.?\d+)(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|fr)?$/);
    if (!match) return null;

    numericValue = parseFloat(match[1]);
    unit = match[2] || '';
  }

  return { value: numericValue, unit, raw };
}

/**
 * Check if a spacing unit is valid
 */
function isValidSpacingUnit(unit: string): boolean {
  if (unit === '') return true; // Unitless values are valid
  return VALID_SPACING_UNITS.has(unit);
}

/**
 * Check if a spacing unit is recommended
 */
function isRecommendedSpacingUnit(unit: string): boolean {
  if (unit === '') return false; // Unitless values are not recommended for spacing
  return RECOMMENDED_SPACING_UNITS.has(unit);
}

/**
 * Validate a single spacing value
 */
function validateSpacingValue(
  path: string,
  value: string | number,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult | null {
  const parsed = parseSpacingValue(value);

  if (!parsed) {
    return {
      severity: 'error',
      code: SPACING_FORMAT_CODE,
      message: `Invalid spacing value: "${value}"`,
      path,
      suggestion: 'Use a valid CSS spacing value: number, or number with unit (px, rem, em, etc.).',
      example: `// Examples:\n// "${path}": "1rem"\n// "${path}": "16px"\n// "${path}": "0.5rem"`
    };
  }

  const { value: numericValue, unit } = parsed;

  // Check for negative values (not typically valid for spacing)
  if (numericValue < 0) {
    return {
      severity: 'warning',
      code: SPACING_FORMAT_CODE,
      message: `Negative spacing value: "${value}"`,
      path,
      suggestion: 'Spacing values should typically be positive. Use negative values only for specific use cases.',
      example: `// Change from:\n// "${path}": "${value}"\n// To:\n// "${path}": "${Math.abs(numericValue)}${unit}"`
    };
  }

  // Check for valid unit
  if (!isValidSpacingUnit(unit)) {
    return {
      severity: 'error',
      code: SPACING_FORMAT_CODE,
      message: `Invalid spacing unit: "${unit}"`,
      path,
      suggestion: `Use a valid CSS spacing unit: ${Array.from(VALID_SPACING_UNITS).join(', ')}.`,
      example: `// Examples:\n// "${path}": "1rem"\n// "${path}": "16px"`
    };
  }

  // Check for recommended unit
  if (unit !== '' && !isRecommendedSpacingUnit(unit)) {
    return {
      severity: 'info',
      code: SPACING_FORMAT_CODE,
      message: `Using non-recommended spacing unit: "${unit}"`,
      path,
      suggestion: `Consider using recommended units (${Array.from(RECOMMENDED_SPACING_UNITS).join(', ')}) for better consistency.`,
      example: `// Change from:\n// "${path}": "${value}"\n// To:\n// "${path}": "${numericValue}rem"`
    };
  }

  return null;
}

/**
 * Check for inconsistent spacing units
 */
function checkSpacingUnitConsistency(
  spacing: Record<string, string | number>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  const units = new Map<string, number>(); // unit -> count

  for (const [key, value] of Object.entries(spacing)) {
    const parsed = parseSpacingValue(value);
    if (parsed) {
      const { unit } = parsed;
      const count = units.get(unit) || 0;
      units.set(unit, count + 1);
    }
  }

  // Check if there are mixed units
  if (units.size > 1) {
    const unitList = Array.from(units.entries())
      .map(([unit, count]) => `${unit || 'unitless'} (${count})`)
      .join(', ');

    results.push({
      severity,
      code: SPACING_FORMAT_CODE,
      message: `Mixed spacing units detected: ${unitList}`,
      path: 'spacing',
      suggestion: 'Use consistent spacing units for better maintainability. Consider using rem for responsive design.',
      example: `// Example - use rem for all spacing:\n// "spacing.xs": "0.25rem"\n// "spacing.sm": "0.5rem"\n// "spacing.md": "1rem"`
    });
  }

  return results;
}

/**
 * Validate all spacing formats
 */
export function validateSpacingFormat(
  tokens: TokensForValidation,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!tokens.spacing) {
    return results;
  }

  const spacing = tokens.spacing as Record<string, string | number>;

  // Validate each spacing value
  for (const [key, value] of Object.entries(spacing)) {
    const result = validateSpacingValue(`spacing.${key}`, value, severity);
    if (result) {
      results.push(result);
    }
  }

  // Check for unit consistency
  results.push(...checkSpacingUnitConsistency(spacing, severity));

  return results;
}

/**
 * Get a summary of spacing format issues
 */
export function getSpacingFormatSummary(issues: SpacingFormatIssue[]): string {
  if (issues.length === 0) {
    return 'No spacing format issues found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${issues.length} spacing format issue${issues.length > 1 ? 's' : ''}:`);

  for (const issue of issues) {
    summary.push(`  • ${issue.path}: ${issue.issue}`);
    summary.push(`    ${issue.details}`);
    summary.push(`    💡 ${issue.suggestion}`);
  }

  return summary.join('\n');
}
