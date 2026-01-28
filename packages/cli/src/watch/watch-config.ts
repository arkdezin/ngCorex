import { watch, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { resolveConfigPath } from '../config/resolve-path.js';

export function watchConfig(
  onChange: () => void
): void {
  const configPath = resolveConfigPath();
  const tokensPath = resolve(process.cwd(), 'tokens.json');

  console.log(`✔ Watching ${configPath}`);

  if (existsSync(tokensPath)) {
    console.log(`✔ Watching ${tokensPath}`);
  }

  let timeout: NodeJS.Timeout | null = null;

  const triggerRebuild = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      console.log('\n↻ Rebuilding...\n');
      onChange();
    }, 100);
  };

  // Watch config
  watch(configPath, triggerRebuild);

  // Watch tokens.json (if present)
  if (existsSync(tokensPath)) {
    watch(tokensPath, triggerRebuild);
  }
}
