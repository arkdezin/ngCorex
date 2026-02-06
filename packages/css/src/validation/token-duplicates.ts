/**
 * Duplicate token detection
 * Checks for duplicate token names across different categories
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
 * Find all duplicate tokens across categories
 */
export function findDuplicateTokens(tokens: TokensForValidation, file: string = 'tokens.json'): DuplicateToken[] {
  const tokenMap = new Map<string, TokenLocation[]>();

  // Collect all tokens from all categories
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
        collectNestedTokens(category, name, file, tokenMap);
      }
    } else {
      // Handle flat token structures (spacing, radius, zIndex, shadows)
      if (typeof category === 'object' && category !== null) {
        for (const [key, value] of Object.entries(category)) {
          const location: TokenLocation = {
            file,
            category: name,
            key,
            path: `${name}.${key}`
          };

          if (!tokenMap.has(key)) {
            tokenMap.set(key, []);
          }
          tokenMap.get(key)!.push(location);
        }
      }
    }
  }

  // Find duplicates (tokens with more than one location)
  const duplicates: DuplicateToken[] = [];
  for (const [name, locations] of tokenMap.entries()) {
    if (locations.length > 1) {
      duplicates.push({ name, locations });
    }
  }

  return duplicates;
}

/**
 * Collect tokens from nested structures
 */
function collectNestedTokens(
  obj: unknown,
  category: string,
  file: string,
  tokenMap: Map<string, TokenLocation[]>
): void {
  if (typeof obj !== 'object' || obj === null) return;

  for (const [key, value] of Object.entries(obj)) {
    const location: TokenLocation = {
      file,
      category,
      key,
      path: `${category}.${key}`
    };

    if (!tokenMap.has(key)) {
      tokenMap.set(key, []);
    }
    tokenMap.get(key)!.push(location);

    // Recursively collect nested tokens
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      collectNestedTokens(value, `${category}.${key}`, file, tokenMap);
    }
  }
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
