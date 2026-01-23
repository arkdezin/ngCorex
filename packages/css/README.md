# @ngcorex/css

![NPM Version](https://img.shields.io/npm/v/%40ngcorex%2Fcss?style=flat-square&logo=npm&labelColor=%23D50100&color=%23000) ![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcss?style=flat-square) ![Static Badge](https://img.shields.io/badge/Github-Repo-blue?style=flat-square&logo=github) ![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcss?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000)

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
