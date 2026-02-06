/**
 * Main validation entry point
 * Coordinates all non-blocking token validations
 */

import type {
  ValidationReport,
  ValidationResult,
  ValidationConfig,
  TokensForValidation
} from './types.js';

import { validateDuplicateTokens } from './token-duplicates.js';
import { validateScaleConsistency } from './scale-consistency.js';
import { validateColorFormat } from './color-format.js';
import { validateSpacingFormat } from './spacing-format.js';
import { validateShadowFormat } from './shadow-format.js';
import { validateZIndexLogic } from './z-index-logic.js';

/**
 * Default validation configuration
 */
export const DEFAULT_VALIDATION_CONFIG: ValidationConfig = {
  enabled: {
    duplicateTokens: true,
    scaleConsistency: true,
    colorFormat: true,
    spacingFormat: true,
    shadowFormat: true,
    zIndexLogic: true
  },
  severity: 'warning'
};

/**
 * Run all enabled validations on tokens
 */
export function runValidations(
  tokens: TokensForValidation,
  config: ValidationConfig = DEFAULT_VALIDATION_CONFIG
): ValidationReport {
  const results: ValidationResult[] = [];

  // Run duplicate token validation
  if (config.enabled.duplicateTokens) {
    const duplicateResults = validateDuplicateTokens(tokens, 'tokens.json', config.severity);
    results.push(...duplicateResults);
  }

  // Run scale consistency validation
  if (config.enabled.scaleConsistency) {
    const scaleResults = validateScaleConsistency(tokens, config.severity);
    results.push(...scaleResults);
  }

  // Run color format validation
  if (config.enabled.colorFormat) {
    const colorResults = validateColorFormat(tokens, config.severity);
    results.push(...colorResults);
  }

  // Run spacing format validation
  if (config.enabled.spacingFormat) {
    const spacingResults = validateSpacingFormat(tokens, config.severity);
    results.push(...spacingResults);
  }

  // Run shadow format validation
  if (config.enabled.shadowFormat) {
    const shadowResults = validateShadowFormat(tokens, config.severity);
    results.push(...shadowResults);
  }

  // Run z-index logic validation
  if (config.enabled.zIndexLogic) {
    const zIndexResults = validateZIndexLogic(tokens, config.severity);
    results.push(...zIndexResults);
  }

  // Run custom validators
  if (config.customValidators) {
    for (const validator of config.customValidators) {
      const customResults = validator.validate(tokens);
      results.push(...customResults);
    }
  }

  // Count results by severity
  const summary = {
    info: results.filter(r => r.severity === 'info').length,
    warning: results.filter(r => r.severity === 'warning').length,
    error: results.filter(r => r.severity === 'error').length
  };

  // Report is valid if there are no errors (warnings and info are non-blocking)
  const valid = summary.error === 0;

  return {
    valid,
    results,
    summary
  };
}

/**
 * Run validations and return only warnings and errors (filter out info)
 */
export function runValidationsWithoutInfo(
  tokens: TokensForValidation,
  config: ValidationConfig = DEFAULT_VALIDATION_CONFIG
): ValidationReport {
  const report = runValidations(tokens, config);
  const filteredResults = report.results.filter(r => r.severity !== 'info');

  return {
    valid: report.valid,
    results: filteredResults,
    summary: {
      info: 0,
      warning: filteredResults.filter(r => r.severity === 'warning').length,
      error: filteredResults.filter(r => r.severity === 'error').length
    }
  };
}

/**
 * Get a human-readable summary of the validation report
 */
export function getValidationSummary(report: ValidationReport): string {
  const lines: string[] = [];

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('  🔍 Token Validation Report');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  if (report.valid) {
    lines.push('  ✅ No blocking errors found');
  } else {
    lines.push(`  ❌ ${report.summary.error} error${report.summary.error > 1 ? 's' : ''} found`);
  }

  if (report.summary.warning > 0) {
    lines.push(`  ⚠️  ${report.summary.warning} warning${report.summary.warning > 1 ? 's' : ''}`);
  }

  if (report.summary.info > 0) {
    lines.push(`  ℹ️  ${report.summary.info} info message${report.summary.info > 1 ? 's' : ''}`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  return lines.join('\n');
}

/**
 * Print validation results grouped by severity
 */
export function printValidationResults(report: ValidationReport): void {
  if (report.results.length === 0) {
    console.log('✅ No validation issues found');
    return;
  }

  // Print errors first
  const errors = report.results.filter(r => r.severity === 'error');
  if (errors.length > 0) {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  ❌ ${errors.length} Error${errors.length > 1 ? 's' : ''}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    for (const result of errors) {
      console.log(`  ❌ ${result.message}`);
      console.log(`  Path: ${result.path}`);
      if (result.suggestion) {
        console.log(`  💡 ${result.suggestion}`);
      }
      console.log('');
    }
  }

  // Print warnings
  const warnings = report.results.filter(r => r.severity === 'warning');
  if (warnings.length > 0) {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  ⚠️  ${warnings.length} Warning${warnings.length > 1 ? 's' : ''}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    for (const result of warnings) {
      console.log(`  ⚠️  ${result.message}`);
      console.log(`  Path: ${result.path}`);
      if (result.suggestion) {
        console.log(`  💡 ${result.suggestion}`);
      }
      console.log('');
    }
  }

  // Print info messages
  const info = report.results.filter(r => r.severity === 'info');
  if (info.length > 0) {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  ℹ️  ${info.length} Info Message${info.length > 1 ? 's' : ''}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    for (const result of info) {
      console.log(`  ℹ️  ${result.message}`);
      console.log(`  Path: ${result.path}`);
      if (result.suggestion) {
        console.log(`  💡 ${result.suggestion}`);
      }
      console.log('');
    }
  }
}

/**
 * Check if validation report has any results
 */
export function hasValidationResults(report: ValidationReport): boolean {
  return report.results.length > 0;
}

/**
 * Check if validation report has errors
 */
export function hasValidationErrors(report: ValidationReport): boolean {
  return report.summary.error > 0;
}

/**
 * Check if validation report has warnings
 */
export function hasValidationWarnings(report: ValidationReport): boolean {
  return report.summary.warning > 0;
}

/**
 * Check if validation report has info messages
 */
export function hasValidationInfo(report: ValidationReport): boolean {
  return report.summary.info > 0;
}
