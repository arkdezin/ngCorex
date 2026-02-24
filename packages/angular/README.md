# @ngcorex/angular

Angular CLI integration for ngCorex - a deterministic, governance-first design token engine with build-time CSS generation.

This package provides `ng add` support and workflow wiring for Angular projects.

- It does not introduce runtime logic.
- It does not modify components.
- It does not generate styles at runtime.

All processing remains build-time only.

---

## Installation

Inside an Angular project:

```bash
npx ng add @ngcorex/angular
```

---

## What `ng add` Does

The schematic performs the following deterministic actions:

### 1. Adds devDependencies

```json
"@ngcorex/css": "^<version>",
"@ngcorex/cli": "^<version>"
```

ngCorex runs at build-time only, so both packages are installed as dev dependencies.

---

### 2. Adds CLI Scripts

```json
"scripts": {
  "ngcorex:init": "ngcorex init",
  "ngcorex:build": "ngcorex build",
  "ngcorex:watch": "ngcorex build --watch",
  "ngcorex:setup": "ngcorex init && ngcorex build",
  "ngcorex:dev": "ngcorex init && ngcorex build --watch",
  "ngcorex:start": "ngcorex init && ngcorex build && ng serve"
}
```

These scripts provide convenient workflows:

- `ngcorex:init` - Creates `tokens.json` and `ngcorex.config.ts`
- `ngcorex:build` - Generates CSS from tokens (one-time)
- `ngcorex:watch` - Watches for changes and auto-rebuilds CSS
- `ngcorex:setup` - Combines init + build for quick setup
- `ngcorex:dev` - Combines init + build with watch mode for development
- `ngcorex:start` - Combines init + build + ng serve for complete startup

**Smart `start` Script Modification:**

The schematic intelligently modifies the existing `start` script:

- If `start` is exactly `"ng serve"`, it becomes `"ngcorex init && ngcorex build && ng serve"`
- If `start` has a custom value, it remains unchanged
- `ngcorex:start` is always added as a fallback

---

### 3. Updates `angular.json`

Injects:

```
src/styles/ngcorex.css
```

into:

```
build.options.styles
```

This ensures generated CSS is included in Angular builds.

---

## First-Time Setup

After installation, you have two options:

### Quick Setup (Recommended)

```bash
npm run ngcorex:start
```

This will:

1. Generate `ngcorex.config.ts`
2. Generate `tokens.json`
3. Generate `src/styles/ngcorex.css`
4. Start the Angular dev server with ngCorex styles included

Alternatively, you can use the watch mode for development:

```bash
npm run ngcorex:dev
ng serve
```

This will:

1. Generate `ngcorex.config.ts`
2. Generate `tokens.json`
3. Generate `src/styles/ngcorex.css`
4. Start watching for changes to `tokens.json` and `ngcorex.config.ts`
5. Auto-rebuild CSS whenever tokens are modified

### Manual Setup

```bash
npm run ngcorex:init
npm run ngcorex:build
ng serve
```

This will:

1. Generate `ngcorex.config.ts`
2. Generate `tokens.json`
3. Generate `src/styles/ngcorex.css`
4. Serve Angular with ngCorex styles included

> **Note:** With manual setup, you'll need to run `npm run ngcorex:build` each time you modify `tokens.json` or `ngcorex.config.ts`. Alternatively, run `npm run ngcorex:watch` in a separate terminal for automatic rebuilds, or use `npm run ngcorex:dev` which combines init + watch.

---

## Architecture

Dependency direction:

```
Angular Project
    ↓
@ngcorex/angular
    ↓
@ngcorex/css
    ↓
@ngcorex/cli
```

The core engine never depends on Angular.

This adapter exists only to reinforce workflow and CLI integration.

---

## Versioning

The Angular adapter follows strict lockstep versioning with the ngCorex ecosystem.

Example:

```
@ngcorex/css@0.2.x
@ngcorex/angular@0.2.x
```

---

## Philosophy

ngCorex in Angular remains:

- Deterministic
- Constraint-driven
- Governance-first
- Build-time only
- Framework-agnostic at its core
