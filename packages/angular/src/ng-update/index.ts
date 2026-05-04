import {
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';

import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

import packageJson from '../../package.json' with { type: 'json' };

const NGCOREX_VERSION = `^${packageJson.version}`;

interface NgUpdateOptions {
  skipInstall?: boolean;
  skipBuild?: boolean;
}

/**
 * Main ng-update schematic entry point.
 * Called by `ng update @ngcorex/angular`.
 *
 * Responsibilities:
 *  1. Bump @ngcorex/cli to the version matching this package.
 *  2. Ensure build scripts are present in the host project.
 *  3. Migrate configuration files if a migration is needed.
 *  4. Print next-step guidance.
 */
export function ngUpdate(options: NgUpdateOptions = {}): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`🔄 Updating ngCorex to v${packageJson.version}...`);

    updateDependencies(tree, context);
    ensureScripts(tree, context);
    migrateConfig(tree, context);

    context.logger.info('');
    context.logger.info(`✅ ngCorex updated to v${packageJson.version}!`);

    if (!options.skipBuild) {
      context.logger.info('');
      context.logger.info('Next steps:');
      context.logger.info('  Run `ngcorex build` to regenerate your CSS');
      context.logger.info('  Review CHANGELOG.md for any breaking changes');
    }

    return tree;
  };
}

/* -------------------------------------------------------------------------- */
/*  Dependency update                                                         */
/* -------------------------------------------------------------------------- */

function updateDependencies(tree: Tree, context: SchematicContext) {
  const pkgPath = '/package.json';
  if (!tree.exists(pkgPath)) {
    context.logger.warn('⚠ No package.json found — skipping dependency update');
    return;
  }

  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Dev,
    name: '@ngcorex/cli',
    version: NGCOREX_VERSION,
  });

  context.logger.info(`✔ @ngcorex/cli updated to ${NGCOREX_VERSION}`);
}

/* -------------------------------------------------------------------------- */
/*  Ensure build scripts                                                      */
/* -------------------------------------------------------------------------- */

function ensureScripts(tree: Tree, context: SchematicContext) {
  const pkgPath = '/package.json';
  if (!tree.exists(pkgPath)) return;

  const pkg = JSON.parse(tree.read(pkgPath)!.toString());
  let modified = false;

  pkg.scripts = pkg.scripts || {};

  const scripts: Record<string, string> = {
    'ngcorex:build': 'ngcorex build',
    'ngcorex:watch': 'ngcorex build --watch',
  };

  for (const [name, script] of Object.entries(scripts)) {
    if (!pkg.scripts[name]) {
      pkg.scripts[name] = script;
      modified = true;
    }
  }

  if (modified) {
    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    context.logger.info('✔ Ensured ngCorex build scripts are present');
  }
}

/* -------------------------------------------------------------------------- */
/*  Configuration migration                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Placeholder for future config migrations.
 * When a breaking change requires updating `ngcorex.config.ts` or
 * `tokens.json`, add the migration logic here and gate it by the
 * target version.
 */
function migrateConfig(tree: Tree, context: SchematicContext) {
  const configPath = 'ngcorex.config.ts';

  if (!tree.exists(configPath)) {
    context.logger.warn(
      '⚠ ngcorex.config.ts not found — run `ngcorex init` to create it'
    );
    return;
  }

  // Example migration (uncomment when needed):
  //
  // let content = tree.read(configPath)!.toString();
  // if (content.includes('someOldOption')) {
  //   content = content.replace('someOldOption', 'newOption');
  //   tree.overwrite(configPath, content);
  //   context.logger.info('✔ Migrated ngcorex.config.ts: someOldOption → newOption');
  // }

  context.logger.info('✔ No configuration migrations required');
}
