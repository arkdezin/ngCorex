import { buildCommand } from './build.js';
import { versionCommand } from './version.js';

export async function runCommand(args: string[]): Promise<void> {
  const command = args[0];

  switch (command) {
    case 'build':
      await buildCommand(args.slice(1));
      break;

    case 'version':
    case '--version':
    case '-v':
      await versionCommand();
      break;

    default:
      printHelp();
  }
}

function printHelp() {
  console.log(`
ngCorex CLI

Usage:
  ngcorex build        Generate CSS
  ngcorex build --watch
  ngcorex version      Show version
`);
}
