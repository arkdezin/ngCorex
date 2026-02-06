/**
 * Shadow format validation
 * Checks for valid CSS box-shadow syntax
 */

import type {
  ValidationResult,
  TokensForValidation,
  ShadowFormatIssue
} from './types.js';
import { isValidColor, getColorFormat } from './color-format.js';

/**
 * Validation code for shadow format
 */
const SHADOW_FORMAT_CODE = 'SHADOW_FORMAT';

/**
 * Parse a box-shadow value
 * Format: offset-x | offset-y | blur-radius | spread-radius | color | inset
 */
function parseBoxShadow(value: string): {
  valid: boolean;
  offsetX?: string;
  offsetY?: string;
  blur?: string;
  spread?: string;
  color?: string;
  inset?: boolean;
  error?: string;
} {
  const trimmed = value.trim();
  const parts = trimmed.split(/\s+/);

  const result = {
    valid: false,
    offsetX: undefined as string | undefined,
    offsetY: undefined as string | undefined,
    blur: undefined as string | undefined,
    spread: undefined as string | undefined,
    color: undefined as string | undefined,
    inset: false,
    error: undefined as string | undefined
  };

  // Check for inset keyword
  let startIndex = 0;
  if (parts[0] === 'inset') {
    result.inset = true;
    startIndex = 1;
  }

  // Need at least 2 values (offset-x and offset-y)
  if (parts.length - startIndex < 2) {
    result.error = 'Box-shadow requires at least offset-x and offset-y values';
    return result;
  }

  // Parse offset-x
  if (!isValidLength(parts[startIndex])) {
    result.error = `Invalid offset-x value: "${parts[startIndex]}"`;
    return result;
  }
  result.offsetX = parts[startIndex];

  // Parse offset-y
  if (!isValidLength(parts[startIndex + 1])) {
    result.error = `Invalid offset-y value: "${parts[startIndex + 1]}"`;
    return result;
  }
  result.offsetY = parts[startIndex + 1];

  // Parse blur-radius (optional)
  if (parts.length > startIndex + 2) {
    if (isValidLength(parts[startIndex + 2])) {
      result.blur = parts[startIndex + 2];
      startIndex += 3;
    } else if (isValidColor(parts[startIndex + 2])) {
      result.color = parts[startIndex + 2];
      startIndex += 2;
    } else {
      result.error = `Invalid blur-radius or color value: "${parts[startIndex + 2]}"`;
      return result;
    }
  } else {
    startIndex += 2;
  }

  // Parse spread-radius (optional)
  if (parts.length > startIndex && isValidLength(parts[startIndex])) {
    result.spread = parts[startIndex];
    startIndex += 1;
  }

  // Parse color (optional)
  if (parts.length > startIndex && isValidColor(parts[startIndex])) {
    result.color = parts[startIndex];
  }

  result.valid = true;
  return result;
}

/**
 * Check if a value is a valid CSS length
 */
function isValidLength(value: string): boolean {
  const match = value.match(/^(-?\d*\.?\d+)(px|rem|em|%|vh|vw|vmin|vmax|ch|ex)?$/);
  if (!match) return false;

  const numericValue = parseFloat(match[1]);
  return !isNaN(numericValue);
}

/**
 * Check if a length value is negative
 */
function isNegativeLength(value: string): boolean {
  return value.startsWith('-');
}

/**
 * Validate a single shadow value
 */
function validateShadowValue(
  path: string,
  value: string,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult | null {
  const parsed = parseBoxShadow(value);

  if (!parsed.valid) {
    return {
      severity: 'error',
      code: SHADOW_FORMAT_CODE,
      message: `Invalid shadow format: "${value}"`,
      path,
      suggestion: parsed.error || 'Use valid box-shadow syntax: offset-x offset-y [blur-radius] [spread-radius] [color] [inset]',
      example: `// Examples:\n// "${path}": "0 1px 2px 0 rgba(0,0,0,0.05)"\n// "${path}": "0 4px 6px -1px rgba(0,0,0,0.1)"`
    };
  }

  const issues: string[] = [];

  // Check for negative blur-radius
  if (parsed.blur && isNegativeLength(parsed.blur)) {
    issues.push('Blur-radius should not be negative');
  }

  // Check for color format
  if (parsed.color) {
    const format = getColorFormat(parsed.color);
    if (format === 'hex3' || format === 'hex4') {
      issues.push('Consider using full hex color format (hex6) for better precision');
    }
  }

  if (issues.length > 0) {
    return {
      severity,
      code: SHADOW_FORMAT_CODE,
      message: `Shadow format issues: ${issues.join(', ')}`,
      path,
      suggestion: 'Review the shadow value for best practices.',
      example: `// Example:\n// "${path}": "0 1px 2px 0 rgba(0,0,0,0.05)"`
    };
  }

  return null;
}

/**
 * Check for shadow scale consistency
 */
function checkShadowScaleConsistency(
  shadows: Record<string, string>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  const keys = Object.keys(shadows);
  if (keys.length < 2) return results;

  // Expected shadow scale order
  const expectedOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const orderedKeys = keys.filter(k => expectedOrder.includes(k)).sort((a, b) => {
    return expectedOrder.indexOf(a) - expectedOrder.indexOf(b);
  });

  if (orderedKeys.length < 2) return results;

  // Parse shadows to compare blur values
  const blurValues: Array<{ key: string; blur: number | null }> = [];

  for (const key of orderedKeys) {
    const parsed = parseBoxShadow(shadows[key]);
    let blur: number | null = null;

    if (parsed.blur) {
      const match = parsed.blur.match(/^(-?\d*\.?\d+)(px|rem|em)?$/);
      if (match) {
        blur = parseFloat(match[1]);
      }
    }

    blurValues.push({ key, blur });
  }

  // Check for monotonic progression
  for (let i = 1; i < blurValues.length; i++) {
    const prev = blurValues[i - 1];
    const curr = blurValues[i];

    if (prev.blur !== null && curr.blur !== null) {
      if (curr.blur <= prev.blur) {
        results.push({
          severity,
          code: SHADOW_FORMAT_CODE,
          message: `Non-monotonic shadow scale: "${curr.key}" blur (${curr.blur}px) is not greater than "${prev.key}" (${prev.blur}px)`,
          path: `shadows.${curr.key}`,
          suggestion: 'Shadow blur values should increase with scale size.',
          example: `// Example:\n// "shadows.${prev.key}": "${shadows[prev.key]}"\n// "shadows.${curr.key}": "0 ${curr.blur + 2}px ..."`
        });
      }
    }
  }

  return results;
}

/**
 * Validate all shadow formats
 */
export function validateShadowFormat(
  tokens: TokensForValidation,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!tokens.shadows) {
    return results;
  }

  const shadows = tokens.shadows as Record<string, string>;

  // Validate each shadow value
  for (const [key, value] of Object.entries(shadows)) {
    const result = validateShadowValue(`shadows.${key}`, value, severity);
    if (result) {
      results.push(result);
    }
  }

  // Check for scale consistency
  results.push(...checkShadowScaleConsistency(shadows, severity));

  return results;
}

/**
 * Get a summary of shadow format issues
 */
export function getShadowFormatSummary(issues: ShadowFormatIssue[]): string {
  if (issues.length === 0) {
    return 'No shadow format issues found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${issues.length} shadow format issue${issues.length > 1 ? 's' : ''}:`);

  for (const issue of issues) {
    summary.push(`  • ${issue.path}: ${issue.issue}`);
    summary.push(`    ${issue.details}`);
    summary.push(`    💡 ${issue.suggestion}`);
  }

  return summary.join('\n');
}
