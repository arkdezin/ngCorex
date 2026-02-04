# @ngcorex/cli

![NPM Version](https://img.shields.io/npm/v/%40ngcorex%2Fcli?style=flat-square&logo=npm&labelColor=%23D50100&color=%23000) ![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcli?style=flat-square) ![Static Badge](https://img.shields.io/badge/Github-Repo-blue?style=flat-square&logo=github) ![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcli?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000)

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

## Getting Started

### Installation

Install the CLI as a dev dependency:

```bash
npm install -D @ngcorex/cli
```

> The CLI depends on `@ngcorex/css`, which will be installed automatically.

### Initialize ngCorex

To quickly get started, run:

```bash
ngcorex init
```

This will create:

- `tokens.json`
- `ngcorex.config.ts`

If the files already exist, they will not be overwritten.

***Or Create files manually:***

### Create tokens.json

Create a `tokens.json` file at your project root:

```json
{
  "spacing": {
            "xs": "1rem",
            "sm": "1.25rem"
          },
  "colors": {
    "gray": {
      "100": "#f3f4f6",
      "900": "#111827"
    }
  }
}
```

If `tokens.json` is present, it is used automatically.

## Configuration File

The CLI expects a file named:

### Create ngcorex.config.ts

Create a `ngcorex.config.ts` file at your project root:

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    file: 'src/styles/ngcorex.css'
  }
});
```

In case you want to output in layer
**add:**

```ts
export default defineNgCorexConfig({
  output: {
    layer: 'layer-name',
    file: 'src/styles/ngcorex.css'
  }
});
```

### Important Rules

- The config file **must import from npm packages only**
- Relative imports are **not allowed**
- The config is transpiled internally using esbuild

---

## Command Overview

The ngCorex CLI supports the following commands:

- `ngcorex init` - create starter config and tokens
- `ngcorex build` - generate CSS from tokens
- `ngcorex build --watch` - rebuild on file changes
- `ngcorex build --dry-run` - validate without writing files
- `ngcorex version` / `--version` / `-v` - print CLI version
- `ngcorex --help` / `-h` - show help information

## Commands

### Initialize

```bash
npx ngcorex init
```

---

### Build CSS

```bash
npx ngcorex build
```

- Loads `ngcorex.config.ts`
- Generates CSS output
- Writes the output file

---

### Watch Mode

```bash
npx ngcorex build --watch
```

- Watches `ngcorex.config.ts`
- Watches `tokens.json` (if present)
- Rebuilds CSS when either file changes

---

### Dry Run

```bash
npx ngcorex build --dry-run
```

- Runs the full pipeline
- Does NOT write any files
- Useful for testing configuration

---

### Version

```bash
npx ngcorex version
```

Prints the CLI version.

---

### Help

```bash
npx ngcorex --help
```

Prints available commands and usage information.

---

## Output

The CLI generates CSS variables based on your tokens and constraints.

Example output:

```css
:root {
  --nx-spacing-xs: 1rem;
  --nx-spacing-sm: 1.25rem;
  --nx-color-gray-100: #f3f4f6;
  --nx-color-gray-900: #111827;
}
```

---

## License

MIT
