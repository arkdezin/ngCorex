import { watch } from 'node:fs';
import { resolveConfigPath } from '../config/resolve-path.js';

export function watchConfig(
  onChange: () => void
): void {
  const configPath = resolveConfigPath();

  console.log(`✔ Watching ${configPath}`);

  let timeout: NodeJS.Timeout | null = null;

  watch(configPath, () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      console.log('\n↻ Rebuilding...\n');
      onChange();
    }, 100);
  });
}
