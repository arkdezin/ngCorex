import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export interface WriteCssOptions {
  dryRun?: boolean;
}

export function writeCss(
  filePath: string,
  css: string,
  options: WriteCssOptions = {}
): void {
  if (options.dryRun) {
    console.log(`ℹ Dry run – skipping write to ${filePath}`);
    return;
  }

  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });

  writeFileSync(filePath, css, 'utf-8');
}
