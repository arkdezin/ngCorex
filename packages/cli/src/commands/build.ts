import { runBuild } from './run-build.js';
import { watchConfig } from '../watch/watch-config.js';

export async function buildCommand(args: string[]): Promise<void> {
  const watch = args.indexOf('--watch') !== -1;
  const dryRun = args.indexOf('--dry-run') !== -1;

  if (watch) {
    // initial build
    try {
      await runBuild({ dryRun });
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }

    // watch mode
    watchConfig(async () => {
      try {
        await runBuild({ dryRun });
      } catch (error) {
        console.error(error instanceof Error ? error.message : error);
      }
    });

    return;
  }

  // single build
  await runBuild({ dryRun });
}
