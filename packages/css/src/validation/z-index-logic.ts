/**
 * Z-index logic validation
 * Checks for logical layering and value consistency
 */

import type {
  ValidationResult,
  TokensForValidation,
  ZIndexLogicIssue
} from './types.js';

/**
 * Validation code for z-index logic
 */
const ZINDEX_LOGIC_CODE = 'ZINDEX_LOGIC';

/**
 * Common z-index layer order (from bottom to top)
 */
const COMMON_ZINDEX_LAYERS = [
  'base',      // 0 or 1
  'dropdown',  // 1000
  'sticky',    // 1020
  'fixed',     // 1030
  'modal',     // 1040
  'popover',   // 1050
  'tooltip',   // 1060
  'toast'      // 1070
];

/**
 * Default z-index values for common layers
 */
const DEFAULT_ZINDEX_VALUES: Record<string, number> = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070
};

/**
 * Parse a z-index value to extract numeric value
 */
function parseZIndexValue(value: string | number): { value: number; raw: string } | null {
  let raw: string;
  let numericValue: number;

  if (typeof value === 'number') {
    raw = value.toString();
    numericValue = value;
  } else {
    raw = value;
    const match = value.match(/^(-?\d+)$/);
    if (!match) return null;

    numericValue = parseInt(match[1], 10);
  }

  return { value: numericValue, raw };
}

/**
 * Validate a single z-index value
 */
function validateZIndexValue(
  path: string,
  value: string | number,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult | null {
  const parsed = parseZIndexValue(value);

  if (!parsed) {
    return {
      severity: 'error',
      code: ZINDEX_LOGIC_CODE,
      message: `Invalid z-index value: "${value}"`,
      path,
      suggestion: 'Z-index values must be integers.',
      example: `// Examples:\n// "${path}": "1000"\n// "${path}": 1000`
    };
  }

  const { value: numericValue } = parsed;

  // Check for negative values (not typically valid for z-index)
  if (numericValue < 0) {
    return {
      severity: 'warning',
      code: ZINDEX_LOGIC_CODE,
      message: `Negative z-index value: "${value}"`,
      path,
      suggestion: 'Z-index values should typically be non-negative. Use negative values only for specific use cases.',
      example: `// Change from:\n// "${path}": "${value}"\n// To:\n// "${path}": "0"`
    };
  }

  // Check for very large values (may cause issues)
  if (numericValue > 2147483647) {
    return {
      severity: 'warning',
      code: ZINDEX_LOGIC_CODE,
      message: `Very large z-index value: "${value}"`,
      path,
      suggestion: 'Z-index values should be reasonable. Consider using a smaller value.',
      example: `// Change from:\n// "${path}": "${value}"\n// To:\n// "${path}": "9999"`
    };
  }

  return null;
}

/**
 * Check for overlapping z-index values
 */
function checkOverlappingZIndexValues(
  zIndex: Record<string, string | number>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  const valueMap = new Map<number, string[]>();

  // Group keys by value
  for (const [key, value] of Object.entries(zIndex)) {
    const parsed = parseZIndexValue(value);
    if (parsed) {
      const { value: numericValue } = parsed;
      if (!valueMap.has(numericValue)) {
        valueMap.set(numericValue, []);
      }
      valueMap.get(numericValue)!.push(key);
    }
  }

  // Check for duplicate values
  for (const [value, keys] of valueMap.entries()) {
    if (keys.length > 1) {
      results.push({
        severity,
        code: ZINDEX_LOGIC_CODE,
        message: `Multiple z-index layers have the same value: ${value}`,
        path: 'zIndex',
        suggestion: `Consider using different values for each layer. Keys: ${keys.join(', ')}.`,
        example: `// Example:\n// "zIndex.${keys[0]}": "${value}"\n// "zIndex.${keys[1]}": "${value + 10}"`
      });
    }
  }

  return results;
}

/**
 * Check for inconsistent layering order
 */
function checkLayeringOrder(
  zIndex: Record<string, string | number>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Get keys that match common layers
  const commonLayersPresent = COMMON_ZINDEX_LAYERS.filter(layer => layer in zIndex);

  if (commonLayersPresent.length < 2) {
    return results;
  }

  // Sort by expected order
  const sortedByExpected = [...commonLayersPresent].sort((a, b) => {
    return COMMON_ZINDEX_LAYERS.indexOf(a) - COMMON_ZINDEX_LAYERS.indexOf(b);
  });

  // Check if values are in increasing order
  const values: Array<{ key: string; value: number }> = [];

  for (const key of sortedByExpected) {
    const parsed = parseZIndexValue(zIndex[key]);
    if (parsed) {
      values.push({ key, value: parsed.value });
    }
  }

  // Check for non-monotonic progression
  for (let i = 1; i < values.length; i++) {
    const prev = values[i - 1];
    const curr = values[i];

    if (curr.value <= prev.value) {
      const prevLayer = COMMON_ZINDEX_LAYERS.indexOf(prev.key);
      const currLayer = COMMON_ZINDEX_LAYERS.indexOf(curr.key);

      results.push({
        severity,
        code: ZINDEX_LOGIC_CODE,
        message: `Inconsistent layering: "${curr.key}" (${curr.value}) should be greater than "${prev.key}" (${prev.value})`,
        path: `zIndex.${curr.key}`,
        suggestion: `Z-index values should increase with layer depth. ${curr.key} should be above ${prev.key}.`,
        example: `// Example:\n// "zIndex.${prev.key}": "${prev.value}"\n// "zIndex.${curr.key}": "${prev.value + 10}"`
      });
    }
  }

  return results;
}

/**
 * Check for gaps in z-index scale
 */
function checkZIndexGaps(
  zIndex: Record<string, string | number>,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Get common layers that are present
  const commonLayersPresent = COMMON_ZINDEX_LAYERS.filter(layer => layer in zIndex);

  if (commonLayersPresent.length < 2) {
    return results;
  }

  // Check for missing common layers
  const missingLayers = COMMON_ZINDEX_LAYERS.filter(layer => !(layer in zIndex));

  if (missingLayers.length > 0) {
    results.push({
      severity: 'info',
      code: ZINDEX_LOGIC_CODE,
      message: `Potential gaps in z-index scale: missing layers ${missingLayers.map(l => `"${l}"`).join(', ')}`,
      path: 'zIndex',
      suggestion: 'Consider adding missing z-index layers for a complete layering system.',
      example: `// Example:\n// "zIndex.${missingLayers[0]}": "${DEFAULT_ZINDEX_VALUES[missingLayers[0]]}"`
    });
  }

  return results;
}

/**
 * Validate all z-index logic
 */
export function validateZIndexLogic(
  tokens: TokensForValidation,
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!tokens.zIndex) {
    return results;
  }

  const zIndex = tokens.zIndex as Record<string, string | number>;

  // Validate each z-index value
  for (const [key, value] of Object.entries(zIndex)) {
    const result = validateZIndexValue(`zIndex.${key}`, value, severity);
    if (result) {
      results.push(result);
    }
  }

  // Check for overlapping values
  results.push(...checkOverlappingZIndexValues(zIndex, severity));

  // Check for layering order
  results.push(...checkLayeringOrder(zIndex, severity));

  // Check for gaps
  results.push(...checkZIndexGaps(zIndex, severity));

  return results;
}

/**
 * Get a summary of z-index logic issues
 */
export function getZIndexLogicSummary(issues: ZIndexLogicIssue[]): string {
  if (issues.length === 0) {
    return 'No z-index logic issues found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${issues.length} z-index logic issue${issues.length > 1 ? 's' : ''}:`);

  for (const issue of issues) {
    summary.push(`  • ${issue.path}: ${issue.issue}`);
    summary.push(`    ${issue.details}`);
    summary.push(`    💡 ${issue.suggestion}`);
  }

  return summary.join('\n');
}
