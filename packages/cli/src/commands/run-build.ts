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
 
  // Safe JSON parsing with friendly errors
  if (fs.existsSync(tokensPath)) {
    const raw = fs.readFileSync(tokensPath, 'utf-8');

    try {
      fileTokens = JSON.parse(raw);
    } catch (error) {
      console.error('');
      console.error('❌ Invalid tokens.json');
      console.error('Failed to parse JSON.');

      if (error instanceof SyntaxError) {
        console.error(error.message);
      }

      console.error('');
      process.exit(1);
    }
  }

  // Validate top-level token shape
  if (fileTokens !== null) {
    if (typeof fileTokens !== 'object' || Array.isArray(fileTokens)) {
      console.error('');
      console.error('❌ Invalid tokens.json');
      console.error('The file must export a JSON object at the top level.');
      console.error('');
      process.exit(1);
    }
  }

  // Validate known token categories
  if (fileTokens !== null) {
  const tokens = fileTokens as Record<string, unknown>;

  if ('spacing' in tokens) {
    if (
      typeof tokens.spacing !== 'object' ||
      tokens.spacing === null ||
      Array.isArray(tokens.spacing)
    ) {
      console.error('');
      console.error('❌ Invalid tokens.json');
      console.error('The "spacing" token must be an object.');
      console.error('');
      process.exit(1);
    }
  }

  if ('colors' in tokens) {
    if (
      typeof tokens.colors !== 'object' ||
      tokens.colors === null ||
      Array.isArray(tokens.colors)
    ) {
      console.error('');
      console.error('❌ Invalid tokens.json');
      console.error('The "colors" token must be an object.');
      console.error('');
      process.exit(1);
    }
  }
}

  // Validate spacing token values
  if (fileTokens !== null) {
  const tokens = fileTokens as Record<string, unknown>;

  if (tokens.spacing) {
    const spacing = tokens.spacing as Record<string, unknown>;

    for (const [key, value] of Object.entries(spacing)) {
      if (typeof value !== 'number' && typeof value !== 'string') {
        console.error('');
        console.error('❌ Invalid tokens.json');
        console.error(
          `Invalid spacing value for key "${key}". Expected number or string.`
        );
        console.error('');
        process.exit(1);
      }
    }
  }
}

  // Validate color token structure & values
  if (fileTokens !== null) {
  const tokens = fileTokens as Record<string, unknown>;

  if (tokens.colors) {
    const colors = tokens.colors as Record<string, unknown>;

    for (const [colorName, shades] of Object.entries(colors)) {
      if (
        typeof shades !== 'object' ||
        shades === null ||
        Array.isArray(shades)
      ) {
        console.error('');
        console.error('❌ Invalid tokens.json');
        console.error(
          `Color "${colorName}" must be an object of shade values.`
        );
        console.error('');
        process.exit(1);
      }

      for (const [shade, value] of Object.entries(
        shades as Record<string, unknown>
      )) {
        // shade keys must be numeric
        if (!/^\d+$/.test(shade)) {
          console.error('');
          console.error('❌ Invalid tokens.json');
          console.error(
            `Invalid shade key "${shade}" in color "${colorName}". Shade keys must be numeric.`
          );
          console.error('');
          process.exit(1);
        }

        // value must be a string
        if (typeof value !== 'string') {
          console.error('');
          console.error('❌ Invalid tokens.json');
          console.error(
            `Invalid value for ${colorName}.${shade}. Expected a color string.`
          );
          console.error('');
          process.exit(1);
        }

        // very light color format validation (delegate strictness to engine)
        if (
          !value.startsWith('#') &&
          !value.startsWith('rgb(') &&
          !value.startsWith('rgba(')
        ) {
          console.error('');
          console.error('❌ Invalid tokens.json');
          console.error(
            `Invalid color format for ${colorName}.${shade}: "${value}".`
          );
          console.error('');
          process.exit(1);
        }
      }
    }
  }
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
