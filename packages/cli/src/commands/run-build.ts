import fs from 'node:fs';
import path from 'node:path';
import { resolveConfigPath } from '../config/resolve-path.js';
import { loadConfig } from '../config/load-config.js';
import { writeCss } from '../output/write-css.js';
import { buildCssFromConfig, runValidations, printValidationResults, hasValidationResults, hasValidationErrors, type TokensForValidation } from '@ngcorex/css';
import { resolve } from 'node:path';
import { BuildSummary, success, info, warning, error, section } from '../utils/logger.js';

export interface RunBuildOptions {
  dryRun?: boolean;
}

let hasShownInlineTokenNotice = false;

export async function runBuild(
  options: RunBuildOptions = {}
): Promise<void> {
  const buildSummary = new BuildSummary();
  
  const configPath = resolveConfigPath();
  const config = await loadConfig(configPath);

  success('Loaded ngcorex.config.ts');

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
    } catch (err) {
      error('Invalid tokens.json');
      if (err instanceof SyntaxError) {
        console.log(`   Details: ${err.message}`);
      }
      process.exit(1);
    }
  }

  // Validate top-level token shape
  if (fileTokens !== null) {
    if (typeof fileTokens !== 'object' || Array.isArray(fileTokens)) {
      error('Invalid tokens.json');
      console.log('   Details: The file must export a JSON object at the top level.');
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
      error('Invalid tokens.json');
      console.log('   Details: The "spacing" token must be an object.');
      process.exit(1);
    }
  }

  if ('colors' in tokens) {
    if (
      typeof tokens.colors !== 'object' ||
      tokens.colors === null ||
      Array.isArray(tokens.colors)
    ) {
      error('Invalid tokens.json');
      console.log('   Details: The "colors" token must be an object.');
      process.exit(1);
    }
  }

  if ('radius' in tokens) {
    if (
      typeof tokens.radius !== 'object' ||
      tokens.radius === null ||
      Array.isArray(tokens.radius)
    ) {
      error('Invalid tokens.json');
      console.log('   Details: The "radius" token must be an object.');
      process.exit(1);
    }
  }

  if ('zIndex' in tokens) {
    if (
      typeof tokens.zIndex !== 'object' ||
      tokens.zIndex === null ||
      Array.isArray(tokens.zIndex)
    ) {
      error('Invalid tokens.json');
      console.log('   Details: The "zIndex" token must be an object.');
      process.exit(1);
    }
  }

  if ('typography' in tokens) {
    if (
      typeof tokens.typography !== 'object' ||
      tokens.typography === null ||
      Array.isArray(tokens.typography)
    ) {
      error('Invalid tokens.json');
      console.log('   Details: The "typography" token must be an object.');
      process.exit(1);
    }
  }

  if ('shadows' in tokens) {
    if (
      typeof tokens.shadows !== 'object' ||
      tokens.shadows === null ||
      Array.isArray(tokens.shadows)
    ) {
      error('Invalid tokens.json');
      console.log('   Details: The "shadows" token must be an object.');
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
        error('Invalid tokens.json');
        console.log(`   Details: Invalid spacing value for key "${key}". Expected number or string.`);
        process.exit(1);
      }
    }
  }

  // Validate radius token values
  if (fileTokens !== null) {
    const tokens = fileTokens as Record<string, unknown>;

    if (tokens.radius) {
      const radius = tokens.radius as Record<string, unknown>;

      for (const [key, value] of Object.entries(radius)) {
        if (typeof value !== 'number' && typeof value !== 'string') {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid radius value for key "${key}". Expected number or string.`);
          process.exit(1);
        }
      }
    }
  }

  // Validate z-index token values
  if (fileTokens !== null) {
    const tokens = fileTokens as Record<string, unknown>;

    if (tokens.zIndex) {
      const zIndex = tokens.zIndex as Record<string, unknown>;

      for (const [key, value] of Object.entries(zIndex)) {
        if (typeof value !== 'number' && typeof value !== 'string') {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid zIndex value for key "${key}". Expected number or string.`);
          process.exit(1);
        }
      }
    }
  }

  // Validate typography token structure
  if (fileTokens !== null) {
    const tokens = fileTokens as Record<string, unknown>;

    if (tokens.typography) {
      const typography = tokens.typography as Record<string, unknown>;

      if (typography.fontSize) {
        if (
          typeof typography.fontSize !== 'object' ||
          typography.fontSize === null ||
          Array.isArray(typography.fontSize)
        ) {
          error('Invalid tokens.json');
          console.log('   Details: The "typography.fontSize" token must be an object.');
          process.exit(1);
        }

        const fontSize = typography.fontSize as Record<string, unknown>;
        for (const [key, value] of Object.entries(fontSize)) {
          if (typeof value !== 'number' && typeof value !== 'string') {
            error('Invalid tokens.json');
            console.log(`   Details: Invalid typography.fontSize value for key "${key}". Expected number or string.`);
            process.exit(1);
          }
        }
      }

      if (typography.fontWeight) {
        if (
          typeof typography.fontWeight !== 'object' ||
          typography.fontWeight === null ||
          Array.isArray(typography.fontWeight)
        ) {
          error('Invalid tokens.json');
          console.log('   Details: The "typography.fontWeight" token must be an object.');
          process.exit(1);
        }

        const fontWeight = typography.fontWeight as Record<string, unknown>;
        for (const [key, value] of Object.entries(fontWeight)) {
          if (typeof value !== 'number' && typeof value !== 'string') {
            error('Invalid tokens.json');
            console.log(`   Details: Invalid typography.fontWeight value for key "${key}". Expected number or string.`);
            process.exit(1);
          }
        }
      }

      if (typography.lineHeight) {
        if (
          typeof typography.lineHeight !== 'object' ||
          typography.lineHeight === null ||
          Array.isArray(typography.lineHeight)
        ) {
          error('Invalid tokens.json');
          console.log('   Details: The "typography.lineHeight" token must be an object.');
          process.exit(1);
        }

        const lineHeight = typography.lineHeight as Record<string, unknown>;
        for (const [key, value] of Object.entries(lineHeight)) {
          if (typeof value !== 'number' && typeof value !== 'string') {
            error('Invalid tokens.json');
            console.log(`   Details: Invalid typography.lineHeight value for key "${key}". Expected number or string.`);
            process.exit(1);
          }
        }
      }
    }
  }

  // Validate shadows token values
  if (fileTokens !== null) {
    const tokens = fileTokens as Record<string, unknown>;

    if (tokens.shadows) {
      const shadows = tokens.shadows as Record<string, unknown>;

      for (const [key, value] of Object.entries(shadows)) {
        if (typeof value !== 'string') {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid shadows value for key "${key}". Expected string.`);
          process.exit(1);
        }
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
        error('Invalid tokens.json');
        console.log(`   Details: Color "${colorName}" must be an object of shade values.`);
        process.exit(1);
      }

      for (const [shade, value] of Object.entries(
        shades as Record<string, unknown>
      )) {
        // shade keys must be numeric
        if (!/^\d+$/.test(shade)) {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid shade key "${shade}" in color "${colorName}". Shade keys must be numeric.`);
          process.exit(1);
        }

        // value must be a string
        if (typeof value !== 'string') {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid value for ${colorName}.${shade}. Expected a color string.`);
          process.exit(1);
        }

        // very light color format validation (delegate strictness to engine)
        if (
          !value.startsWith('#') &&
          !value.startsWith('rgb(') &&
          !value.startsWith('rgba(')
        ) {
          error('Invalid tokens.json');
          console.log(`   Details: Invalid color format for ${colorName}.${shade}: "${value}".`);
          process.exit(1);
        }
      }
    }
  }
}

  // Run non-blocking validations
  if (fileTokens !== null) {
    section('Token Validation');
    
    const validationReport = runValidations(fileTokens as TokensForValidation);
    
    if (hasValidationResults(validationReport)) {
      if (hasValidationErrors(validationReport)) {
        error('Blocking validation errors found');
        console.log('   Details: Please fix the errors below before proceeding.');
        printValidationResults(validationReport);
        process.exit(1);
      } else {
        warning('Non-blocking validation warnings found');
        console.log('   Details: Review the warnings below for potential improvements.');
        printValidationResults(validationReport);
      }
    } else {
      success('Token validation passed');
    }
  }

  const effectiveConfig = fileTokens
    ? {
        ...config,
        tokens: fileTokens
      }
    : config;
  
  if (
  !fileTokens &&
  config.tokens &&
  !hasShownInlineTokenNotice
  ) {
    info('Inline tokens detected');
    console.log('   Details: Using tokens.json is recommended for larger or shared projects.');
    hasShownInlineTokenNotice = true;
  }

  section('Building CSS');
  
  const css = buildCssFromConfig(effectiveConfig);
  success('Generated CSS');

  // Count tokens for build summary
  if (effectiveConfig.tokens) {
    if (effectiveConfig.tokens.spacing) {
      buildSummary.addTokenCategory('spacing', Object.keys(effectiveConfig.tokens.spacing).length);
    }
    if (effectiveConfig.tokens.colors) {
      const colorCount = countNestedTokens(effectiveConfig.tokens.colors);
      buildSummary.addTokenCategory('colors', colorCount);
    }
    if (effectiveConfig.tokens.radius) {
      buildSummary.addTokenCategory('radius', Object.keys(effectiveConfig.tokens.radius).length);
    }
    if (effectiveConfig.tokens.zIndex) {
      buildSummary.addTokenCategory('zIndex', Object.keys(effectiveConfig.tokens.zIndex).length);
    }
    if (effectiveConfig.tokens.typography) {
      const typography = effectiveConfig.tokens.typography;
      if (typography.fontSize) {
        buildSummary.addTokenCategory('typography.fontSize', Object.keys(typography.fontSize).length);
      }
      if (typography.fontWeight) {
        buildSummary.addTokenCategory('typography.fontWeight', Object.keys(typography.fontWeight).length);
      }
      if (typography.lineHeight) {
        buildSummary.addTokenCategory('typography.lineHeight', Object.keys(typography.lineHeight).length);
      }
    }
    if (effectiveConfig.tokens.shadows) {
      buildSummary.addTokenCategory('shadows', Object.keys(effectiveConfig.tokens.shadows).length);
    }
  }

  buildSummary.setOutputFile(outputFile);

  writeCss(outputPath, css, { dryRun: options.dryRun });

  if (!options.dryRun) {
    success(`Output written to ${outputFile}`);
    
    // Get output file size
    const stats = fs.statSync(outputPath);
    buildSummary.setOutputSize(stats.size);
  }

  // Print build summary
  buildSummary.print();
}

/**
 * Count tokens in a nested structure (like colors)
 */
function countNestedTokens(obj: unknown): number {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }
  
  let count = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      count += countNestedTokens(value);
    } else {
      count++;
    }
  }
  return count;
}
