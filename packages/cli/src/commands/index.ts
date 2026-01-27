import { buildCommand } from './build.js';
import { versionCommand } from './version.js';
import { initCommand } from './init.js';

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
    
    case 'init': {
      await initCommand();
      return;
    }
      
    case '--help':
    case '-h':
      printHelp();
      return;

    default:
      printHelp();
  }
}

function printHelp() {
  console.log(`
ngCorex CLI

Usage:
  ngcorex init         Create starter config and tokens
  ngcorex build        Generate CSS
  ngcorex build --watch
  ngcorex version      Show version
`);
}
