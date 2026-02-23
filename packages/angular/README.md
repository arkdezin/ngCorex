# @ngcorex/angular

Angular CLI integration for ngCorex - a deterministic, governance-first design token engine with build-time CSS generation.

This package provides `ng add` support and workflow wiring for Angular projects.

It does not introduce runtime logic.
It does not modify components.
It does not generate styles at runtime.

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

### 1. Adds devDependency

```json
"@ngcorex/css": "^<version>"
```

ngCorex runs at build-time only, so it is installed as a dev dependency.

---

### 2. Adds CLI Scripts

```json
"scripts": {
  "ngcorex:init": "ngcorex init",
  "ngcorex:build": "ngcorex build"
}
```

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

After installation:

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

---

## Architecture

Dependency direction:

```
Angular Project
    ↓
@ngcorex/angular
    ↓
@ngcorex/css
```

The core engine never depends on Angular.

This adapter exists only to reinforce workflow.

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
