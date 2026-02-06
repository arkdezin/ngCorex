/**
 * Duplicate token detection
 * Checks for duplicate token names WITHIN the same category
 * Cross-category duplicates are allowed (e.g., radius.sm, typography.fontSize.sm)
 */

import type {
  ValidationResult,
  TokensForValidation,
  TokenLocation,
  DuplicateToken
} from './types.js';

/**
 * Validation code for duplicate tokens
 */
const DUPLICATE_TOKEN_CODE = 'DUPLICATE_TOKEN';

/**
 * Find all duplicate tokens within each category
 * Cross-category duplicates are NOT flagged (per spec X1)
 */
export function findDuplicateTokens(tokens: TokensForValidation, file: string = 'tokens.json'): DuplicateToken[] {
  const duplicates: DuplicateToken[] = [];

  // Process each category separately
  const categories: Array<{ name: keyof TokensForValidation; isNested?: boolean }> = [
    { name: 'spacing' },
    { name: 'radius' },
    { name: 'zIndex' },
    { name: 'shadows' },
    { name: 'colors', isNested: true },
    { name: 'typography', isNested: true }
  ];

  for (const { name, isNested } of categories) {
    const category = tokens[name];
    if (!category) continue;

    if (isNested) {
      // Handle nested token structures (colors, typography)
      if (typeof category === 'object' && category !== null) {
        duplicates.push(...findDuplicatesInNested(category, name, file));
      }
    } else {
      // Handle flat token structures (spacing, radius, zIndex, shadows)
      if (typeof category === 'object' && category !== null) {
        duplicates.push(...findDuplicatesInFlat(category, name, file));
      }
    }
  }

  return duplicates;
}

/**
 * Find duplicates in flat token structures
 */
function findDuplicatesInFlat(
  obj: Record<string, unknown>,
  category: string,
  file: string
): DuplicateToken[] {
  const duplicates: DuplicateToken[] = [];
  const keyMap = new Map<string, TokenLocation[]>();

  for (const [key, value] of Object.entries(obj)) {
    const location: TokenLocation = {
      file,
      category,
      key,
      path: `${category}.${key}`
    };

    if (!keyMap.has(key)) {
      keyMap.set(key, []);
    }
    keyMap.get(key)!.push(location);
  }

  // Find duplicates within this category
  for (const [name, locations] of keyMap.entries()) {
    if (locations.length > 1) {
      duplicates.push({ name, locations });
    }
  }

  return duplicates;
}

/**
 * Find duplicates in nested token structures
 * Checks for duplicates at each nesting level separately
 */
function findDuplicatesInNested(
  obj: unknown,
  category: string,
  file: string,
  path: string = category
): DuplicateToken[] {
  const duplicates: DuplicateToken[] = [];

  if (typeof obj !== 'object' || obj === null) return duplicates;

  const keyMap = new Map<string, TokenLocation[]>();

  // Check for duplicates at current level
  for (const [key, value] of Object.entries(obj)) {
    const location: TokenLocation = {
      file,
      category,
      key,
      path: `${path}.${key}`
    };

    if (!keyMap.has(key)) {
      keyMap.set(key, []);
    }
    keyMap.get(key)!.push(location);
  }

  // Add duplicates found at this level
  for (const [name, locations] of keyMap.entries()) {
    if (locations.length > 1) {
      duplicates.push({ name, locations });
    }
  }

  // Recursively check nested levels
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      duplicates.push(...findDuplicatesInNested(value, category, file, `${path}.${key}`));
    }
  }

  return duplicates;
}

/**
 * Convert duplicate tokens to validation results
 */
export function duplicateTokensToValidationResults(
  duplicates: DuplicateToken[],
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const duplicate of duplicates) {
    const locationsStr = duplicate.locations
      .map(loc => loc.path)
      .join(', ');

    results.push({
      severity,
      code: DUPLICATE_TOKEN_CODE,
      message: `Duplicate token name "${duplicate.name}" found in multiple locations`,
      path: duplicate.locations[0].path,
      suggestion: `Rename one of the tokens to avoid conflicts. Found in: ${locationsStr}`,
      example: `// Example:\n// Rename ${duplicate.locations[0].path} to "${duplicate.name}Alt"\n// or rename ${duplicate.locations[1].path} to "${duplicate.name}Alt"`
    });
  }

  return results;
}

/**
 * Validate tokens for duplicates
 */
export function validateDuplicateTokens(
  tokens: TokensForValidation,
  file: string = 'tokens.json',
  severity: 'info' | 'warning' | 'error' = 'warning'
): ValidationResult[] {
  const duplicates = findDuplicateTokens(tokens, file);
  return duplicateTokensToValidationResults(duplicates, severity);
}

/**
 * Get a summary of duplicate tokens
 */
export function getDuplicateTokensSummary(duplicates: DuplicateToken[]): string {
  if (duplicates.length === 0) {
    return 'No duplicate tokens found.';
  }

  const summary: string[] = [];
  summary.push(`Found ${duplicates.length} duplicate token name${duplicates.length > 1 ? 's' : ''}:`);

  for (const duplicate of duplicates) {
    summary.push(`  • "${duplicate.name}" appears ${duplicate.locations.length} times:`);
    for (const loc of duplicate.locations) {
      summary.push(`    - ${loc.path}`);
    }
  }

  return summary.join('\n');
}
