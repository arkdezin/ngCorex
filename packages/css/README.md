# @ngcorex/css

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

## Usage

This package is usually consumed internally by the CLI.

Example:

```ts
import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  tokens: {
    spacing: {
      1: 4,
      2: 8
    }
  }
});
```

## License

MIT
