# ngCorex

![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcli?style=flat-square)

## What is ngCorex?

**ngCorex** is a **design token and utility CSS engine** built for **Angular teams**.

It generates **CSS variables at build time** from structured design tokens, with strong TypeScript guarantees and enterprise-friendly constraints.

It is inspired by ideas from Tailwind, but it is **not a Tailwind clone**, **not a component library**, and **not React-focused**.

ngCorex is built for **Angular teams**, **design systems**, and **enterprise-scale governance**.

---

## What ngCorex Is

- A design token engine
- A CLI-driven build tool
- Framework-agnostic at runtime

ngCorex focuses on:

- 🎨 **Design tokens** (spacing, colors, etc.)
- 🧭 **Constraints & governance** (rules that enforce consistency)
- ⚙️ **CLI tooling** (`ngcorex build`, watch mode, dry runs)
- 🅰️ **Angular-centric workflows**
- 🏢 **Enterprise readiness** (predictable, auditable CSS output)

ngCorex generates **CSS variables**, not components.

---

## What ngCorex Is NOT

ngCorex is **not**:

- ❌ a component library
- ❌ a Tailwind replacement
- ❌ React-oriented
- ❌ runtime-dependent in the browser

All work happens **at build time**.

---

## Repository Structure

```txt
ngcorex/
├─ packages/
│  ├─ css/        → Core engine (@ngcorex/css)
│  └─ cli/        → CLI tool   (@ngcorex/cli)
├─ ngcorex.config.ts   → User config (dev-only)
├─ package.json        → Root (private)
├─ tsconfig.base.json
├─ tsconfig.json
└─ .gitignore
```

### Important Notes

- `dist/` folders are **gitignored**
- Source code lives in `src/`
- Builds happen **before publishing**
- The repo is designed to be **clean and publishable**

---

## Packages

### `@ngcorex/css`

![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcss?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000)

Core engine package.

Responsibilities:

- Design token definitions
- Token normalization
- Constraint validation
- CSS variable generation
- Optional CSS `@layer` output

Exports:

```ts
buildCssFromConfig(config)
defineNgCorexConfig(config)
```

---

### `@ngcorex/cli`

![NPM Downloads](https://img.shields.io/npm/dm/%40ngcorex%2Fcli?style=flat-square&logo=npm&logoColor=%23ffffff&labelColor=%23D50100&color=%23000)

Command-line interface.

Available commands:

```bash
ngcorex init
ngcorex build
ngcorex build --watch
ngcorex build --dry-run
ngcorex version / --version / -v
ngcorex --help / -h
```

---

## How ngCorex Works (High Level)

1. You write `ngcorex.config.ts`
2. CLI transpiles the config using **esbuild**
3. Config is loaded from a temporary `.mjs` file
4. Engine:

   - normalizes tokens
   - applies constraints
   - generates CSS variables
5. CSS is written to the output file

All of this happens **before your app runs**.

---

## Config Rules (VERY IMPORTANT)

Your `ngcorex.config.ts` **must only import from npm packages**.

### ✅ Correct

```ts
import { defineNgCorexConfig } from '@ngcorex/css';
```

### ❌ Incorrect

```ts
import { defineNgCorexConfig } from './packages/css/dist';
```

Why?

- Config is transpiled and loaded dynamically
- Relative imports break in this environment
- This rule is **strictly enforced**

---

## Requirements

Make sure you have **all of the following installed**:

### 1. Node.js

- Version: **22.x**
- Check with:

```bash
node -v
```

### 2. npm

Comes with Node.

Check with:

```bash
npm -v
```

---

## Clone the Repository

```bash
git clone https://github.com/<your-username>/ngcorex.git
cd ngcorex
```

> Replace `<your-username>` with your actual GitHub username.

---

## Install Dependencies

From the **repo root**, run:

```bash
npm install
```

This installs dependencies for:

- root
  - `@ngcorex/css`
  - `@ngcorex/cli`

---

## Build the Packages

### 1. Build the CSS engine

```bash
cd packages/css
npm run build
```

You should see:

- TypeScript compilation succeed
- `dist/` folder generated (but ignored by git)

---

### 2. Build the CLI

```bash
cd ../cli
npm run build
```

This produces the CLI executable in `dist/`.

---

### 3. Go back to root

```bash
cd ../..
```

---

## Test the CLI Locally

### Link the CLI globally (temporary)

```bash
npm link ./packages/cli
```

Now test:

```bash
ngcorex version
```

You should see the CLI version printed.

---

## Run a Build

From the repo root:

```bash
ngcorex build
```

What happens:

- `ngcorex.config.ts` is loaded
- Tokens are validated
- Constraints are applied
- CSS is generated and written to output

---

## Watch Mode

```bash
ngcorex build --watch
```

- Watches `ngcorex.config.ts`
- Rebuilds on change
- Errors do **not** crash the process

---

## Dry Run Mode

```bash
ngcorex build --dry-run
```

- Runs the full pipeline
- **Does not write files**
- Useful for debugging configs

---

## Constraint System (Current)

### Implemented Constraints

#### Spacing

- Auto-px fallback
- Configurable severity:

  - `error`
  - `warning`
  - `off`

#### Colors

- Validates:

  - `hex`
  - `rgb`
  - `rgba`
- Shade keys must be **numeric**
- No enforced semantic ordering (by design)

---

## Publishing (Dry Run)

Before publishing, always test:

```bash
npm publish --dry-run
```

Run this inside each package:

```bash
cd packages/css
npm publish --dry-run

cd ../cli
npm publish --dry-run
```

This verifies:

- package.json correctness
- files included
- entry points resolve

---

## Design Philosophy

- Incremental development
- Clarity over cleverness
- Explicit configuration
- Build-time guarantees
- Angular-first thinking

No Angular integration is planned **until the core engine is stable**.

---

## Status

- ✅ Engine works
- ✅ CLI works
- ✅ Watch mode works
- ✅ Constraints implemented
- 🧪 npm install / publish flow under validation
- 🚧 Angular integration planned later

## Contributing & Security

- See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- See [SECURITY.md](./SECURITY.md) for reporting security issues
- See [ROADMAP.md](./ROADMAP.md) for immediate roadmap
