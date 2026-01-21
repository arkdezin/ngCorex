#!/usr/bin/env node

import { runCommand } from './commands/index.js';
import { handleCliError } from './utils/logger.js';

async function main() {
  const args = process.argv.slice(2);

  try {
    await runCommand(args);
  } catch (error) {
    handleCliError(error);
    process.exit(1);
  }
}

main();
