import fs from 'node:fs';
import path from 'node:path';
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

  const outputFile =
    config.output?.file ?? 'src/styles/ngcorex.css';

  const outputPath = resolve(process.cwd(), outputFile);
  const tokensPath = path.resolve(process.cwd(), 'tokens.json');
  let fileTokens: unknown | null = null;

  if (fs.existsSync(tokensPath)) {
    const raw = fs.readFileSync(tokensPath, 'utf-8');
    fileTokens = JSON.parse(raw);
  }
  const effectiveConfig = fileTokens
    ? {
      ...config,
      tokens: fileTokens
    }
    : config;

  const css = buildCssFromConfig(effectiveConfig);
  console.log('✔ Generated CSS');

  writeCss(outputPath, css, { dryRun: options.dryRun });

  if (!options.dryRun) {
    console.log(`✔ Output written to ${outputFile}`);
  }
}
