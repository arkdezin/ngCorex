import { Rule, Tree } from '@angular-devkit/schematics';
import { readFileSync } from 'fs';
import { join } from 'path';

const NGCOREX_STYLE_PATH = 'src/styles/ngcorex.css';

function getNgCorexVersion(): string {
  try {
    const packageJsonPath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8')
    );
    return `^${packageJson.version}`;
  } catch {
    return '^0.0.0';
  }
}

export function ngAdd(): Rule {
  return (tree: Tree) => {
    addPackageJsonChanges(tree);
    addAngularStyles(tree);

    return tree;
  };
}

function addPackageJsonChanges(tree: Tree) {
  const packageJsonPath = '/package.json';

  if (!tree.exists(packageJsonPath)) {
    console.log('❌ package.json not found');
    return;
  }

  const buffer = tree.read(packageJsonPath);
  if (!buffer) return;

  const packageJson = JSON.parse(buffer.toString());

  // Scripts
  packageJson.scripts = packageJson.scripts || {};

  if (!packageJson.scripts['ngcorex:init']) {
    packageJson.scripts['ngcorex:init'] = 'ngcorex init';
  }

  if (!packageJson.scripts['ngcorex:build']) {
    packageJson.scripts['ngcorex:build'] = 'ngcorex build';
  }

  // Dev dependency
  packageJson.devDependencies = packageJson.devDependencies || {};

  if (!packageJson.devDependencies['@ngcorex/css']) {
    packageJson.devDependencies['@ngcorex/css'] = getNgCorexVersion();
    console.log('✔ @ngcorex/css added as devDependency');
  }

  tree.overwrite(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );

  console.log('✔ ngCorex scripts added to package.json');
}

function addAngularStyles(tree: Tree) {
  const angularJsonPath = '/angular.json';

  if (!tree.exists(angularJsonPath)) {
    console.log('⚠ angular.json not found');
    return;
  }

  const buffer = tree.read(angularJsonPath);
  if (!buffer) return;

  const angularJson = JSON.parse(buffer.toString());

  const defaultProject =
    angularJson.defaultProject ||
    Object.keys(angularJson.projects)[0];

  const project = angularJson.projects[defaultProject];

  if (
    !project?.architect?.build?.options?.styles
  ) {
    console.log('⚠ Could not locate build styles array');
    return;
  }

  const styles = project.architect.build.options.styles;

  if (!styles.includes(NGCOREX_STYLE_PATH)) {
    styles.push(NGCOREX_STYLE_PATH);
    console.log('✔ ngCorex style path added to angular.json');
  }

  tree.overwrite(
    angularJsonPath,
    JSON.stringify(angularJson, null, 2)
  );
}