/**
 * Scale consistency checks
 * Checks for logical progressions in token scales (e.g., spacing, radius, typography)
 */

import type {
  ValidationResult,
  TokensForValidation,
  ScaleConsistencyIssue,
  ScaleOrder
} from './types.js';

/**
 * Validation code for scale consistency
 */
const SCALE_CONSISTENCY_CODE = 'SCALE_CONSISTENCY';

/**
 * Common scale orders for different categories
 */
const COMMON_SCALE_ORDERS: Record<string, ScaleOrder> = {
  spacing: {
    category: 'spacing',
    expectedOrder: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    isNumeric: true
  },
  radius: {
    category: 'radius',
    expectedOrder: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    isNumeric: true
  },
  fontSize: {
    category: 'fontSize',
    expectedOrder: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    isNumeric: true
  },
  fontWeight: {
    category: 'fontWeight',
    expectedOrder: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
    isNumeric: true
  },
  lineHeight: {
    category: 'lineHeight',
    expectedOrder: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
    isNumeric: true
  },
  zIndex: {
    category: 'zIndex',
    expectedOrder: ['base', 'dropdown', 'sticky', 'fixed', 'modal', 'popover', 'tooltip'],
    isNumeric: true
  }
};

/**
 * Parse a CSS value to extract numeric value and unit
 */
function parseCssValue(value: string): { value: number; unit: string } | null {
  const match = value.match(/^(-?\d*\.?\d+)(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|fr|deg|rad|turn|s|ms)?$/);
  if (!match) return null;

  return {
    value: parseFloat(match[1]),
    unit: match[2] || ''
  };
}

/**
 * Check if values are in a monotonic progression
 */
function checkMonotonicProgression(
  values: number[],
  expectedIncreasing: boolean = true
): { isMonotonic: boolean; issues: number[] } {
  const issues: number[] = [];

  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    if (expectedIncreasing && diff <= 0) {
      issues.push(i);
    } else if (!expectedIncreasing && diff >= 0) {
      issues.push(i);
    }
  }

  return {
    isMonotonic: issues.length === 0,
    issues
  };
}

/**
 * Check for gaps in a numeric progression
 */
function checkForGaps(
  values: number[],
  keys: string[],
  expectedOrder: string[]
): { hasGaps: boolean; gapIndices: number[] } {
  const gapIndices: number[] = [];

  // Check if any expected keys are missing
  for (let i = 0; i < expectedOrder.length; i++) {
    if (!keys.includes(expectedOrder[i])) {
      // Find the position where this key should be
      const position = expectedOrder.indexOf(expectedOrder[i]);
      if (position < keys.length) {
        gapIndices.push(i);
      }
    }
  }

  return {
    hasGaps: gapIndices.length > 0,
    gapIndices
  };
}

/**
 * Validate scale consistency for a token category
 */
function validateScale(
  category: string,
  tokens: Record<string, string | number>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];
  const scaleOrder = COMMON_SCALE_ORDERS[category];

  if (!scaleOrder) {
    // No predefined order for this category, skip
    return results;
  }

  // Get keys in expected order (if they exist)
  const keys: string[] = [];
  const values: number[] = [];
  const keyToValueMap = new Map<string, { value: number; raw: string | number }>();

  for (const key of scaleOrder.expectedOrder) {
    if (key in tokens) {
      keys.push(key);
      const rawValue = tokens[key];
      let numericValue: number;

      if (typeof rawValue === 'number') {
        numericValue = rawValue;
      } else {
        const parsed = parseCssValue(rawValue);
        if (parsed) {
          numericValue = parsed.value;
        } else {
          // Can't parse as numeric, skip this key
          continue;
        }
      }

      values.push(numericValue);
      keyToValueMap.set(key, { value: numericValue, raw: rawValue });
    }
  }

  if (values.length < 2) {
    // Not enough values to check consistency
    return results;
  }

  // Check for monotonic progression
  const { isMonotonic, issues } = checkMonotonicProgression(values, scaleOrder.isNumeric);

  if (!isMonotonic) {
    for (const issueIndex of issues) {
      const key = keys[issueIndex];
      const prevKey = keys[issueIndex - 1];
      const currentValue = keyToValueMap.get(key)!.raw;
      const prevValue = keyToValueMap.get(prevKey)!.raw;

      results.push({
        severity,
        code: SCALE_CONSISTENCY_CODE,
        message: `Non-monotonic progression in ${category} scale: "${key}" (${currentValue}) is not greater than "${prevKey}" (${prevValue})`,
        path: `${category}.${key}`,
        suggestion: `Consider adjusting the value of "${key}" to be greater than "${prevKey}" for a consistent scale.`,
        example: `// Example:\n// ${category}.${prevKey}: ${prevValue}\n// ${category}.${key}: ${currentValue} // Should be > ${prevValue}`
      });
    }
  }

  // Check for gaps in the scale
  const { hasGaps, gapIndices } = checkForGaps(values, keys, scaleOrder.expectedOrder);

  if (hasGaps) {
    const missingKeys = gapIndices.map(i => scaleOrder.expectedOrder[i]);
    results.push({
      severity: 'info', // Gaps are less severe than non-monotonic values
      code: SCALE_CONSISTENCY_CODE,
      message: `Potential gaps in ${category} scale: missing keys ${missingKeys.map(k => `"${k}"`).join(', ')}`,
      path: category,
      suggestion: `Consider adding the missing scale keys for a more complete scale.`,
      example: `// Example:\n// ${category}.${missingKeys[0]}: "value"`
    });
  }

  return results;
}

/**
 * Validate all scales for consistency
 */
export function validateScaleConsistency(
  tokens: TokensForValidation,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Validate spacing scale
  if (tokens.spacing) {
    results.push(...validateScale('spacing', tokens.spacing as Record<string, string | number>, severity));
  }

  // Validate radius scale
  if (tokens.radius) {
    results.push(...validateScale('radius', tokens.radius as Record<string, string | number>, severity));
  }

  // Validate typography scales
  if (tokens.typography) {
    if (tokens.typography.fontSize) {
      results.push(...validateScale('fontSize', tokens.typography.fontSize as Record<string, string | number>, severity));
    }
    if (tokens.typography.fontWeight) {
      results.push(...validateScale('fontWeight', tokens.typography.fontWeight as Record<string, string | number>, severity));
    }
    if (tokens.typography.lineHeight) {
      results.push(...validateScale('lineHeight', tokens.typography.lineHeight as Record<string, string | number>, severity));
    }
  }

  // Validate z-index scale
  if (tokens.zIndex) {
    results.push(...validateScale('zIndex', tokens.zIndex as Record<string, string | number>, severity));
  }

  return results;
}

/**
 * Get a summary of scale consistency issues
 */
export function getScaleConsistencySummary(issues: ScaleConsistencyIssue[]): string {
  if (issues.length === 0) {
    return 'No scale consistency issues found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${issues.length} scale consistency issue${issues.length > 1 ? 's' : ''}:`);

  for (const issue of issues) {
    summary.push(`  • ${issue.category}: ${issue.issue}`);
    summary.push(`    ${issue.details}`);
    summary.push(`    💡 ${issue.suggestion}`);
  }

  return summary.join('\n');
}
