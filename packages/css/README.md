# @ngcorex/css

![NPM Version](https://img.shields.io/npm/v/%40ngcorex%2Fcss?style=flat-square&logo=npm&labelColor=%23D50100&color=%23000) ![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcss?style=flat-square) ![Static Badge](https://img.shields.io/badge/Github-Repo-blue?style=flat-square&logo=github) ![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcss?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000) ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/arkdezin/ngcorex)

Core engine for **ngCorex**.

This package provides:

- design token normalization
- constraint validation
- CSS variable generation
- optional CSS layer wrapping

It is intended to be used via the ngCorex CLI, not directly in applications.

## Installation

```bash
npm install @ngcorex/css
````

## Supported Token Categories

ngCorex supports the following design token categories:

| Category | Description | Example Values |
| ---------- | ------------- | ---------------- |
| `spacing` | Spacing scale for margins, padding, gaps | `"4px"`, `"1rem"`, `"0.5em"` |
| `colors` | Color palette with nested shades | `"#f3f4f6"`, `"rgb(37, 99, 235)"` |
| `radius` | Border radius values | `"4px"`, `"8px"`, `"16px"`, `"full"` |
| `zIndex` | Z-index layer values | `"1000"`, `"2000"`, `"3000"` |
| `typography` | Font properties (fontSize, fontWeight, lineHeight) | See below |
| `shadows` | Box shadow values | `"0 1px 2px 0 rgba(0,0,0,0.05)"` |

### Typography Sub-categories

| Sub-category | Description | Example Values |
| ------------- | ------------- | ---------------- |
| `fontSize` | Font size values | `"0.75rem"`, `"16px"`, `"1.25em"` |
| `fontWeight` | Font weight values | `"400"`, `"500"`, `"bold"`, `"700"` |
| `lineHeight` | Line height values | `"1.25"`, `"1.5"`, `"1.75"` |

## Token Source

Tokens can be provided either inline via configuration or from an external `tokens.json` file when using the ngCorex CLI.

External token files are the **recommended approach** for larger projects, as they keep design tokens portable, auditable, and framework-agnostic.

## Usage

This package is usually consumed internally by the CLI.

Example:

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    file: 'src/styles/ngcorex.css'
  }
});
```

## License

MIT
