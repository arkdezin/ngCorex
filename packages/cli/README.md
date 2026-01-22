# @ngcorex/cli

Command-line interface for **ngCorex**.

This package provides the `ngcorex` CLI used to build CSS from an
`ngcorex.config.ts` file using the ngCorex engine.

It is intended to be installed as a development dependency in projects
that use ngCorex.

---

## What This CLI Does

The ngCorex CLI:

- loads `ngcorex.config.ts`
- validates design tokens
- applies constraints
- generates CSS variables
- writes the output CSS file
- supports watch mode and dry runs

All work happens **at build time**.

---

## Installation

Install the CLI as a dev dependency:

```bash
npm install --save-dev @ngcorex/cli
````

> The CLI depends on `@ngcorex/css`, which will be installed automatically.

---

## Commands

### Build CSS

```bash
npx ngcorex build
```

* Loads `ngcorex.config.ts`
* Generates CSS output
* Writes the output file

---

### Watch Mode

```bash
npx ngcorex build --watch
```

* Watches `ngcorex.config.ts`
* Rebuilds on change
* Does not exit on errors

---

### Dry Run

```bash
npx ngcorex build --dry-run
```

* Runs the full pipeline
* Does NOT write any files
* Useful for testing configuration

---

### Version

```bash
npx ngcorex version
```

Prints the CLI version.

---

## Configuration File

The CLI expects a file named:

```file
ngcorex.config.ts
```

### Example

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  tokens: {
    spacing: {
      1: '4',
      2: '8'
    }
  }
});
```

### Important Rules

* The config file **must import from npm packages only**
* Relative imports are **not allowed**
* The config is transpiled internally using esbuild

---

## Output

The CLI generates CSS variables based on your tokens and constraints.

Example output:

```css
:root {
  --spacing-1: 4px;
  --spacing-2: 8px;
}
```

---

## License

MIT