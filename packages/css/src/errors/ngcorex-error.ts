/**
 * Enhanced error class for ngCorex with improved developer experience
 */

/**
 * Error codes for categorizing different types of errors
 */
export enum NgCorexErrorCode {
  // Token validation errors
  TOKEN_INVALID_FORMAT = 'TOKEN_INVALID_FORMAT',
  TOKEN_INVALID_TYPE = 'TOKEN_INVALID_TYPE',
  TOKEN_DUPLICATE = 'TOKEN_DUPLICATE',
  TOKEN_MISSING = 'TOKEN_MISSING',

  // Constraint errors
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  CONSTRAINT_INVALID_CONFIG = 'CONSTRAINT_INVALID_CONFIG',

  // Config errors
  CONFIG_INVALID = 'CONFIG_INVALID',
  CONFIG_MISSING = 'CONFIG_MISSING',
  CONFIG_PARSE_ERROR = 'CONFIG_PARSE_ERROR',

  // Output errors
  OUTPUT_WRITE_ERROR = 'OUTPUT_WRITE_ERROR',
  OUTPUT_INVALID_PATH = 'OUTPUT_INVALID_PATH',

  // General errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',

  // Additional error codes for existing code
  CONSTRAINT_VIOLATION_STRING = 'Constraint violation',
  UNKNOWN_PRESET_STRING = 'Unknown preset',
  INVALID_COLOR_TOKEN_STRING = 'Invalid color token',
  INVALID_TOKEN_STRING = 'Invalid'
}

/**
 * Error location information
 */
export interface ErrorLocation {
  file?: string;
  line?: number;
  column?: number;
  path?: string; // e.g., 'tokens.json:spacing.xs'
}

/**
 * Error suggestion for fixing the issue
 */
export interface ErrorSuggestion {
  message: string;
  code?: string; // Example code showing the fix
}

/**
 * Enhanced error class with error codes, location, and suggestions
 */
export class NgCorexError extends Error {
  readonly code: NgCorexErrorCode;
  readonly location?: ErrorLocation;
  readonly suggestion?: ErrorSuggestion;
  readonly docsLink?: string;

  constructor(
    code: NgCorexErrorCode,
    message: string,
    details?: string,
    location?: ErrorLocation,
    suggestion?: ErrorSuggestion,
    docsLink?: string
  ) {
    super(formatErrorMessage(code, message, details, location, suggestion));
    this.name = 'NgCorexError';
    this.code = code;
    this.location = location;
    this.suggestion = suggestion;
    this.docsLink = docsLink;
  }

  /**
   * Get a formatted error message for display
   */
  getDisplayMessage(): string {
    let output = '';

    output += `Error: ${this.code}\n`;
    output += `Message: ${this.message}\n`;

    if (this.location) {
      const locParts: string[] = [];
      if (this.location.file) locParts.push(`file: ${this.location.file}`);
      if (this.location.path) locParts.push(`path: ${this.location.path}`);
      if (this.location.line) locParts.push(`line: ${this.location.line}`);
      if (this.location.column) locParts.push(`column: ${this.location.column}`);
      output += `Location: ${locParts.join(', ')}\n`;
    }

    if (this.suggestion) {
      output += `Suggestion: ${this.suggestion.message}\n`;
      if (this.suggestion.code) {
        output += `Example:\n${this.suggestion.code}\n`;
      }
    }

    if (this.docsLink) {
      output += `Documentation: ${this.docsLink}\n`;
    }

    return output;
  }
}

/**
 * Format error message for display
 */
function formatErrorMessage(
  code: NgCorexErrorCode,
  message: string,
  details?: string,
  location?: ErrorLocation,
  suggestion?: ErrorSuggestion
): string {
  let output = `ngCorex Error [${code}]: ${message}`;

  if (location) {
    const locParts: string[] = [];
    if (location.file) locParts.push(`file: ${location.file}`);
    if (location.path) locParts.push(`path: ${location.path}`);
    if (location.line) locParts.push(`line: ${location.line}`);
    if (location.column) locParts.push(`column: ${location.column}`);
    if (locParts.length > 0) {
      output += `\nLocation: ${locParts.join(', ')}`;
    }
  }

  if (details) {
    output += `\n\nDetails:\n${details}`;
  }

  if (suggestion) {
    output += `\n\n💡 Suggestion:\n${suggestion.message}`;
    if (suggestion.code) {
      output += `\n\nExample:\n${suggestion.code}`;
    }
  }

  return output;
}

/**
 * Helper function to create a token format error
 */
export function createTokenFormatError(
  tokenPath: string,
  value: unknown,
  expectedFormat: string,
  file?: string
): NgCorexError {
  return new NgCorexError(
    NgCorexErrorCode.TOKEN_INVALID_FORMAT,
    `Invalid token format for "${tokenPath}"`,
    `Received value: ${JSON.stringify(value)}\nExpected format: ${expectedFormat}`,
    { file, path: tokenPath },
    {
      message: `Update the token value to match the expected format.`,
      code: `// Example for ${tokenPath}:\n"${tokenPath}": "${expectedFormat}"`
    }
  );
}

/**
 * Helper function to create a token type error
 */
export function createTokenTypeError(
  tokenPath: string,
  actualType: string,
  expectedType: string,
  file?: string
): NgCorexError {
  return new NgCorexError(
    NgCorexErrorCode.TOKEN_INVALID_TYPE,
    `Invalid token type for "${tokenPath}"`,
    `Received type: ${actualType}\nExpected type: ${expectedType}`,
    { file, path: tokenPath },
    {
      message: `Update the token value to the correct type.`,
      code: `// Example for ${tokenPath}:\n"${tokenPath}": <${expectedType}>`
    }
  );
}

/**
 * Helper function to create a duplicate token error
 */
export function createDuplicateTokenError(
  tokenName: string,
  locations: string[]
): NgCorexError {
  return new NgCorexError(
    NgCorexErrorCode.TOKEN_DUPLICATE,
    `Duplicate token name found: "${tokenName}"`,
    `Token "${tokenName}" appears in multiple locations:\n${locations.map(l => `  - ${l}`).join('\n')}`,
    undefined,
    {
      message: `Rename one of the tokens to avoid conflicts.`,
      code: `// Example:\n// Change ${locations[0]} to "${tokenName}Alt"\n// or rename ${locations[1]} to "${tokenName}Alt"`
    }
  );
}

/**
 * Helper function to create a constraint violation error
 */
export function createConstraintViolationError(
  rule: string,
  message: string,
  fix: string
): NgCorexError {
  return new NgCorexError(
    NgCorexErrorCode.CONSTRAINT_VIOLATION,
    `Constraint violation: ${rule}`,
    message,
    undefined,
    {
      message: fix
    }
  );
}
