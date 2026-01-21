import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function resolveConfigPath(
  customPath?: string
): string {
  const path = customPath
    ? resolve(process.cwd(), customPath)
    : resolve(process.cwd(), 'ngcorex.config.ts');

  if (!existsSync(path)) {
    throw new Error(
      `ngCorex config not found at ${path}`
    );
  }

  return path;
}
