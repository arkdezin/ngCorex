# @ngcorex/cli

![NPM Version](https://img.shields.io/npm/v/%40ngcorex%2Fcli?style=flat-square&logo=npm&labelColor=%23D50100&color=%23000) ![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcli?style=flat-square) ![Static Badge](https://img.shields.io/badge/Github-Repo-blue?style=flat-square&logo=github) ![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcli?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000) ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/arkdezin/ngcorex)

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
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "full": "9999px"
  },
  "zIndex": {
    "dropdown": "1000",
    "modal": "2000",
    "toast": "3000"
  },
  "typography": {
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem"
    },
    "fontWeight": {
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    },
    "lineHeight": {
      "tight": "1.25",
      "normal": "1.5",
      "relaxed": "1.75"
    }
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0,0,0,0.05)",
    "md": "0 4px 6px -1px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px -3px rgba(0,0,0,0.1)",
    "xl": "0 20px 25px -5px rgba(0,0,0,0.1)"
  }
}
```

### Supported Token Categories

ngCorex supports the following design token categories:

| Category | Description | Example Values |
| ---------- | ------------- | ---------------- |
| `spacing` | Spacing scale for margins, padding, gaps | `"4px"`, `"1rem"`, `"0.5em"` |
| `colors` | Color palette with nested shades | `"#f3f4f6"`, `"rgb(37, 99, 235)"` |
| `radius` | Border radius values | `"4px"`, `"8px"`, `"16px"`, `"full"` |
| `zIndex` | Z-index layer values | `"1000"`, `"2000"`, `"3000"` |
| `typography` | Font properties (fontSize, fontWeight, lineHeight) | See below |
| `shadows` | Box shadow values | `"0 1px 2px 0 rgba(0,0,0,0.05)"` |

#### Typography Sub-categories

| Sub-category | Description | Example Values |
| ------------- | ------------- | ---------------- |
| `fontSize` | Font size values | `"0.75rem"`, `"16px"`, `"1.25em"` |
| `fontWeight` | Font weight values | `"400"`, `"500"`, `"bold"`, `"700"` |
| `lineHeight` | Line height values | `"1.25"`, `"1.5"`, `"1.75"` |

### Constraint Configuration

You can configure constraint levels in your `ngcorex.config.ts`:

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  constraints: {
    spacing: {
      unit: 'warning',  // Warn about unitless numbers
      format: 'error',   // Error on invalid formats
      type: 'error'      // Error on wrong types
    },
    colors: {
      format: 'error',
      shadeKey: 'error',
      type: 'error'
    },
    radius: {
      unit: 'warning',
      format: 'error',
      type: 'error'
    },
    zIndex: {
      format: 'error',
      type: 'error'
    },
    typography: {
      fontSize: {
        format: 'error',
        type: 'error'
      },
      fontWeight: {
        format: 'error',
        type: 'error'
      },
      lineHeight: {
        format: 'error',
        type: 'error'
      }
    },
    shadows: {
      format: 'error',
      type: 'error'
    }
  }
});
```

Available constraint levels: `'error'`, `'warning'`, `'off'`.

### Output Layer Configuration

You can optionally wrap generated CSS in a CSS layer for better organization and specificity control:

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    layer: 'tokens',  // Wraps CSS in @layer tokens { ... }
    file: 'src/styles/ngcorex.css'
  }
});
```

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  constraints: {
    spacing: {
      unit: 'warning',  // Warn about unitless numbers
      format: 'error',   // Error on invalid formats
      type: 'error'      // Error on wrong types
    },
    colors: {
      format: 'error',
      shadeKey: 'error',
      type: 'error'
    },
    radius: {
      unit: 'warning',
      format: 'error',
      type: 'error'
    },
    zIndex: {
      format: 'error',
      type: 'error'
    },
    typography: {
      fontSize: {
        format: 'error',
        type: 'error'
      },
      fontWeight: {
        format: 'error',
        type: 'error'
      },
      lineHeight: {
        format: 'error',
        type: 'error'
      }
    },
    shadows: {
      format: 'error',
      type: 'error'
    }
  }
});
```

Available constraint levels: `'error'`, `'warning'`, `'off'`.

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
@layer tokens {
  :root {
    --nx-spacing-xs: 1rem;
    --nx-spacing-sm: 1.25rem;
    --nx-color-gray-100: #f3f4f6;
    --nx-color-gray-900: #111827;
    --nx-radius-sm: 4px;
    --nx-radius-md: 8px;
    --nx-zIndex-dropdown: 1000;
    --nx-fontSize-xs: 0.75rem;
    --nx-fontWeight-medium: 500;
    --nx-lineHeight-normal: 1.5;
    --nx-shadows-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  }
}
```

---

## License

MIT
