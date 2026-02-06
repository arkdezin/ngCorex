/**
 * Types and interfaces for non-blocking token validation
 */

import type { TokenScale, NestedTokenScale } from '../tokens/types.js';

/**
 * Validation severity level
 */
export type ValidationSeverity = 'info' | 'warning' | 'error';

/**
 * Validation result
 */
export interface ValidationResult {
  severity: ValidationSeverity;
  code: string;
  message: string;
  path: string; // e.g., 'tokens.json:spacing.xs'
  suggestion?: string;
  example?: string;
}

/**
 * Validation report containing all validation results
 */
export interface ValidationReport {
  valid: boolean;
  results: ValidationResult[];
  summary: {
    info: number;
    warning: number;
    error: number;
  };
}

/**
 * Token location for validation
 */
export interface TokenLocation {
  file: string;
  category: string;
  key: string;
  path: string;
}

/**
 * Duplicate token entry
 */
export interface DuplicateToken {
  name: string;
  locations: TokenLocation[];
}

/**
 * Scale consistency check result
 */
export interface ScaleConsistencyIssue {
  scaleName: string;
  category: string;
  issue: 'non_monotonic' | 'gaps' | 'unexpected_values';
  details: string;
  suggestion: string;
}

/**
 * Color format validation result
 */
export interface ColorFormatIssue {
  path: string;
  value: string;
  issue: 'invalid_format' | 'inconsistent_format' | 'deprecated_format';
  details: string;
  suggestion: string;
}

/**
 * Spacing format validation result
 */
export interface SpacingFormatIssue {
  path: string;
  value: string;
  issue: 'invalid_unit' | 'inconsistent_units' | 'mixed_units';
  details: string;
  suggestion: string;
}

/**
 * Shadow format validation result
 */
export interface ShadowFormatIssue {
  path: string;
  value: string;
  issue: 'invalid_syntax' | 'invalid_color' | 'invalid_offset' | 'invalid_blur' | 'invalid_spread';
  details: string;
  suggestion: string;
}

/**
 * Z-index logic validation result
 */
export interface ZIndexLogicIssue {
  path: string;
  issue: 'inconsistent_layering' | 'overlapping_values' | 'negative_values';
  details: string;
  suggestion: string;
}

/**
 * Validation configuration
 */
export interface ValidationConfig {
  /**
   * Enable/disable specific validations
   */
  enabled: {
    duplicateTokens: boolean;
    scaleConsistency: boolean;
    colorFormat: boolean;
    spacingFormat: boolean;
    shadowFormat: boolean;
    zIndexLogic: boolean;
  };

  /**
   * Severity level for non-blocking validations
   * Note: These are non-blocking and will only produce warnings/info
   */
  severity: ValidationSeverity;

  /**
   * Custom validators
   */
  customValidators?: CustomValidator[];
}

/**
 * Custom validator interface
 */
export interface CustomValidator {
  name: string;
  validate: (tokens: TokensForValidation) => ValidationResult[];
}

/**
 * Tokens structure for validation
 */
export interface TokensForValidation {
  spacing?: TokenScale;
  colors?: NestedTokenScale;
  radius?: TokenScale;
  zIndex?: TokenScale;
  typography?: {
    fontSize?: TokenScale;
    fontWeight?: TokenScale;
    lineHeight?: TokenScale;
  };
  shadows?: TokenScale;
}

/**
 * Validation context
 */
export interface ValidationContext {
  file: string;
  tokens: TokensForValidation;
  config: ValidationConfig;
}

/**
 * Expected scale order for consistency checks
 */
export interface ScaleOrder {
  category: string;
  expectedOrder: string[];
  isNumeric?: boolean; // If true, values should be numeric and increasing
}
