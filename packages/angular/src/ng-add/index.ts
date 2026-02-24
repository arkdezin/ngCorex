import {
  Rule,
  Tree,
} from '@angular-devkit/schematics';

import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

import packageJson from '../../package.json' with { type: 'json' };

const NGCOREX_VERSION = `^${packageJson.version}`;
const NGCOREX_STYLE_PATH = 'src/styles/ngcorex.css';

export function ngAdd(): Rule {
  return (tree: Tree) => {
    addDependencies(tree);
    addScripts(tree);
    addAngularStyles(tree);
    
    console.log('\n✅ ngCorex has been configured!');
    console.log('🚀 Run: npm run ngcorex:setup\n');
    
    return tree;
  };
}

function addDependencies(tree: Tree) {

  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Dev,
    name: '@ngcorex/cli',
    version: NGCOREX_VERSION,
  });

  console.log('✔ ngCorex dependencies added');
}

function addScripts(tree: Tree) {
  const path = '/package.json';
  if (!tree.exists(path)) return;

  const pkg = JSON.parse(tree.read(path)!.toString());

  pkg.scripts = pkg.scripts || {};

  if (!pkg.scripts['ngcorex:init']) {
    pkg.scripts['ngcorex:init'] = 'ngcorex init';
  }

  if (!pkg.scripts['ngcorex:build']) {
    pkg.scripts['ngcorex:build'] = 'ngcorex build';
  }
  if (!pkg.scripts['ngcorex:watch']) {
    pkg.scripts['ngcorex:watch'] = 'ngcorex build --watch';
  }

  if (!pkg.scripts['ngcorex:setup']) {
    pkg.scripts['ngcorex:setup'] = 'ngcorex init && npm install && ngcorex build';
  }

  if (!pkg.scripts['ngcorex:dev']) {
    pkg.scripts['ngcorex:dev'] = 'ngcorex init && npm install && ngcorex build --watch';
  }

  // Smart override: only modify start if it's exactly "ng serve"
  if (pkg.scripts['start'] === 'ng serve') {
    pkg.scripts['start'] = 'ngcorex init && ngcorex build && ng serve';
    console.log('✔ Modified "start" script to include ngCorex commands');
  } else if (pkg.scripts['start']) {
    console.log('⚠ Custom "start" script detected - not modified');
  }

  // Always add ngcorex:start as a fallback
  if (!pkg.scripts['ngcorex:start']) {
    pkg.scripts['ngcorex:start'] = 'ngcorex init && npm install && ngcorex build && ng serve';
  }

  tree.overwrite(path, JSON.stringify(pkg, null, 2));

  console.log('✔ ngCorex scripts added');
}

function addAngularStyles(tree: Tree) {
  const path = '/angular.json';
  if (!tree.exists(path)) return;

  const angularJson = JSON.parse(tree.read(path)!.toString());

  const defaultProject =
    angularJson.defaultProject ||
    Object.keys(angularJson.projects)[0];

  const project = angularJson.projects[defaultProject];

  if (!project?.architect?.build?.options?.styles) return;

  const styles = project.architect.build.options.styles;

  if (!styles.includes(NGCOREX_STYLE_PATH)) {
    styles.push(NGCOREX_STYLE_PATH);
    tree.overwrite(path, JSON.stringify(angularJson, null, 2));
    console.log('✔ ngCorex style path added');
  }
}