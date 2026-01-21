import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

export async function loadConfig(
  configPath: string
): Promise<any> {
  const cacheDir = join(process.cwd(), '.ngcorex');
  const outFile = join(cacheDir, 'config.mjs');

  // ensure cache dir exists
  mkdirSync(cacheDir, { recursive: true });

  // transpile config to real file
  await build({
    entryPoints: [configPath],
    outfile: outFile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18'
  });

  const module = await import(
    pathToFileURL(outFile).href + `?t=${Date.now()}`
  );

  if (!module.default) {
    throw new Error(
      'ngcorex.config.ts must export a default configuration'
    );
  }

  return module.default;
}
