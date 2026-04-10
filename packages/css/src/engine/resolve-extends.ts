import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import type { NgCorexConfig, TokensConfig } from '../config/schema.js';
import { deepMerge } from '../utils/deep-merge.js';
import { NgCorexError, NgCorexErrorCode } from '../errors/ngcorex-error.js';

/**
 * Load a base tokens.json file and return its contents as TokensConfig.
 * Only plain JSON token files are supported (not full ngcorex.config.ts files).
 */
async function loadTokenFile(
  filePath: string,
  fromPath: string
): Promise<TokensConfig> {
  const absolutePath = resolve(dirname(fromPath), filePath);

  let raw: string;
  try {
    raw = await readFile(absolutePath, 'utf-8');
  } catch {
    throw new NgCorexError(
      NgCorexErrorCode.INVALID_TOKEN_STRING,
      `Could not load extended token file`,
      `Path: ${filePath}
Resolved to: ${absolutePath}

Fix:
Make sure the file exists and the path in "extends" is correct.
Paths are resolved relative to your ngcorex.config.ts location.`
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new NgCorexError(
      NgCorexErrorCode.INVALID_TOKEN_STRING,
      `Invalid JSON in extended token file`,
      `Path: ${filePath}

Fix:
Make sure the file is valid JSON. Only plain tokens.json files are supported,
not ngcorex.config.ts files.`
    );
  }

  return parsed as TokensConfig;
}

/**
 * Resolve all `extends` entries in a config, returning a new config
 * with the extends field removed and tokens fully merged.
 *
 * Merge order (last wins):
 *   base file 1 → base file 2 → ... → user's tokens
 *
 * @param config    The raw NgCorexConfig (may have extends field)
 * @param configFilePath  Absolute path to ngcorex.config.ts (for resolving relative paths)
 */
export async function resolveExtends(
  config: NgCorexConfig,
  configFilePath: string
): Promise<NgCorexConfig> {
  if (!config.extends) {
    return config;
  }

  const extendsPaths = Array.isArray(config.extends)
    ? config.extends
    : [config.extends];

  // Start with empty base, merge each extended file in order
  let mergedBase: TokensConfig = {};

  for (const filePath of extendsPaths) {
    const baseTokens = await loadTokenFile(filePath, configFilePath);
    mergedBase = deepMerge(mergedBase, baseTokens);
  }

  // User tokens override everything from base
  const resolvedTokens = config.tokens
    ? deepMerge(mergedBase, config.tokens)
    : mergedBase;

  // Return new config: extends removed, tokens fully resolved
  const { extends: _, ...rest } = config;
  return {
    ...rest,
    tokens: resolvedTokens
  };
}