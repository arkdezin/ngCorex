/**
 * Enhanced logger for ngCorex CLI with improved developer experience
 */

export type LogLevel = 'success' | 'info' | 'warning' | 'error';

export interface LogMessage {
  type: LogLevel;
  message: string;
  details?: string;
  suggestion?: string;
  location?: string;
}

export interface LogEntry {
  timestamp: number;
  message: LogMessage;
}

export interface BuildSummaryOptions {
  outputFile?: string;
  outputSize?: number;
  duration?: number;
}

/**
 * Build summary tracker
 */
export class BuildSummary {
  private tokensProcessed: Map<string, number> = new Map();
  private warnings: LogEntry[] = [];
  private errors: LogEntry[] = [];
  private startTime: number = Date.now();
  private options: BuildSummaryOptions = {};

  constructor(options: BuildSummaryOptions = {}) {
    this.options = options;
  }

  addTokenCategory(category: string, count: number): void {
    this.tokensProcessed.set(category, count);
  }

  addWarning(message: LogMessage): void {
    this.warnings.push({
      timestamp: Date.now(),
      message
    });
  }

  addError(message: LogMessage): void {
    this.errors.push({
      timestamp: Date.now(),
      message
    });
  }

  setOutputFile(file: string): void {
    this.options.outputFile = file;
  }

  setOutputSize(size: number): void {
    this.options.outputSize = size;
  }

  getWarnings(): LogEntry[] {
    return this.warnings;
  }

  getErrors(): LogEntry[] {
    return this.errors;
  }

  getTokensProcessed(): Map<string, number> {
    return this.tokensProcessed;
  }

  getDuration(): number {
    return Date.now() - this.startTime;
  }

  hasWarnings(): boolean {
    return this.warnings.length > 0;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Format file size in human-readable format
   */
  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  /**
   * Format duration in human-readable format
   */
  private formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }

  /**
   * Print the build summary
   */
  print(): void {
    const duration = this.getDuration();
    const totalTokens = Array.from(this.tokensProcessed.values()).reduce((a, b) => a + b, 0);

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  📦 Build Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    // Tokens processed
    if (this.tokensProcessed.size > 0) {
      console.log('  Tokens Processed:');
      for (const [category, count] of this.tokensProcessed.entries()) {
        console.log(`    • ${category.padEnd(12)} ${count.toString().padStart(4)} tokens`);
      }
      console.log(`    ${'─'.repeat(20)}`);
      console.log(`    ${'Total'.padEnd(12)} ${totalTokens.toString().padStart(4)} tokens`);
      console.log('');
    }

    // Output file
    if (this.options.outputFile) {
      console.log('  Output:');
      console.log(`    • File:  ${this.options.outputFile}`);
      if (this.options.outputSize) {
        console.log(`    • Size:  ${this.formatFileSize(this.options.outputSize)}`);
      }
      console.log('');
    }

    // Duration
    console.log(`  Duration: ${this.formatDuration(duration)}`);
    console.log('');

    // Warnings and errors
    if (this.hasWarnings() || this.hasErrors()) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      if (this.hasWarnings()) {
        console.log(`  ⚠️  ${this.warnings.length} Warning${this.warnings.length > 1 ? 's' : ''}`);
      }
      if (this.hasErrors()) {
        console.log(`  ❌ ${this.errors.length} Error${this.errors.length > 1 ? 's' : ''}`);
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    } else {
      console.log('  ✅ Build completed successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    }
  }

  /**
   * Print detailed warnings
   */
  printWarnings(): void {
    if (!this.hasWarnings()) return;

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  ⚠️  Warnings');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    for (const entry of this.warnings) {
      const { message } = entry;
      console.log(`  ${getIcon(message.type)} ${message.message}`);
      if (message.location) {
        console.log(`  Location: ${message.location}`);
      }
      if (message.details) {
        console.log(`  Details: ${message.details}`);
      }
      if (message.suggestion) {
        console.log(`  💡 ${message.suggestion}`);
      }
      console.log('');
    }
  }

  /**
   * Print detailed errors
   */
  printErrors(): void {
    if (!this.hasErrors()) return;

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  ❌ Errors');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');

    for (const entry of this.errors) {
      const { message } = entry;
      console.log(`  ${getIcon(message.type)} ${message.message}`);
      if (message.location) {
        console.log(`  Location: ${message.location}`);
      }
      if (message.details) {
        console.log(`  Details: ${message.details}`);
      }
      if (message.suggestion) {
        console.log(`  💡 ${message.suggestion}`);
      }
      console.log('');
    }
  }
}

/**
 * Get icon for log level
 */
function getIcon(level: LogLevel): string {
  const icons: Record<LogLevel, string> = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌'
  };
  return icons[level] || '•';
}

/**
 * Log a success message
 */
export function success(message: string): void {
  console.log(`✅ ${message}`);
}

/**
 * Log an info message
 */
export function info(message: string): void {
  console.log(`ℹ️  ${message}`);
}

/**
 * Log a warning message
 */
export function warning(message: string): void {
  console.log('');
  console.log(`⚠️  ${message}`);
  console.log('');
}

/**
 * Log an error message
 */
export function error(message: string): void {
  console.log('');
  console.log(`❌ ${message}`);
  console.log('');
}

/**
 * Handle CLI errors with improved formatting
 */
export function handleCliError(error: unknown): void {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ❌ Error');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (error instanceof Error) {
    console.log(`  ${error.message}`);
  } else {
    console.log('  Unknown error occurred');
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

/**
 * Log a section header
 */
export function section(title: string): void {
  console.log('');
  console.log(`━━━ ${title} ━━━`);
  console.log('');
}

/**
 * Log a sub-section header
 */
export function subsection(title: string): void {
  console.log('');
  console.log(`  ${title}`);
  console.log(`  ${'─'.repeat(title.length)}`);
  console.log('');
}
