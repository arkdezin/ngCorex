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
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem"
  },
  "colors": {
    "neutral": {
      "0": "#ffffff",
      "100": "#f5f5f5",
      "300": "#d4d4d4",
      "500": "#737373",
      "700": "#404040",
      "900": "#171717"
    },
    "primary": {
      "500": "#2563eb"
    }
  },
  "radius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "full": "9999px"
  },
  "zIndex": {
    "base": "0",
    "dropdown": "1000",
    "sticky": "1020",
    "fixed": "1030",
    "modal-backdrop": "1040",
    "modal": "1050",
    "popover": "1060",
    "tooltip": "1070"
  },
  "typography": {
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "fontWeight": {
      "light": "300",
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700",
      "extrabold": "800"
    },
    "lineHeight": {
      "none": "1",
      "tight": "1.25",
      "snug": "1.375",
      "normal": "1.5",
      "relaxed": "1.625",
      "loose": "2"
    }
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "base": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"
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
    /* Spacing */
    --nx-spacing-xs: 0.25rem;
    --nx-spacing-sm: 0.5rem;
    --nx-spacing-md: 1rem;
    --nx-spacing-lg: 1.5rem;
    --nx-spacing-xl: 2rem;

    /* Colors */
    --nx-color-neutral-0: #ffffff;
    --nx-color-neutral-100: #f5f5f5;
    --nx-color-neutral-500: #737373;
    --nx-color-neutral-900: #171717;
    --nx-color-primary-500: #2563eb;

    /* Radius */
    --nx-radius-sm: 0.25rem;
    --nx-radius-md: 0.5rem;
    --nx-radius-lg: 0.75rem;
    --nx-radius-xl: 1rem;
    --nx-radius-full: 9999px;

    /* Z-Index */
    --nx-zIndex-base: 0;
    --nx-zIndex-dropdown: 1000;
    --nx-zIndex-modal: 1050;
    --nx-zIndex-tooltip: 1070;

    /* Typography */
    --nx-fontSize-xs: 0.75rem;
    --nx-fontSize-base: 1rem;
    --nx-fontSize-xl: 1.25rem;
    --nx-fontSize-3xl: 1.875rem;
    --nx-fontWeight-normal: 400;
    --nx-fontWeight-bold: 700;
    --nx-lineHeight-normal: 1.5;
    --nx-lineHeight-loose: 2;

    /* Shadows */
    --nx-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --nx-shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --nx-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --nx-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --nx-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
}
```

---

## License

MIT
