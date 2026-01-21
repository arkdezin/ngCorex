import { resolveConfigPath } from '../config/resolve-path.js';
import { loadConfig } from '../config/load-config.js';
import { writeCss } from '../output/write-css.js';
import { buildCssFromConfig } from '@ngcorex/css';
import { resolve } from 'node:path';

export interface RunBuildOptions {
  dryRun?: boolean;
}

export async function runBuild(
  options: RunBuildOptions = {}
): Promise<void> {
  const configPath = resolveConfigPath();
  const config = await loadConfig(configPath);

  console.log('✔ Loaded ngcorex.config.ts');

  const css = buildCssFromConfig(config);
  console.log('✔ Generated CSS');

  const outputFile =
    config.output?.file ?? 'src/styles/ngcorex.css';

  const outputPath = resolve(process.cwd(), outputFile);

  writeCss(outputPath, css, { dryRun: options.dryRun });

  if (!options.dryRun) {
    console.log(`✔ Output written to ${outputFile}`);
  }
}
