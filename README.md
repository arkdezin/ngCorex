# ngCorex

![NPM License](https://img.shields.io/npm/l/%40ngcorex%2Fcli?style=flat-square)

ngCorex is a deterministic, governance-first design token engine and utility CSS generator.

It is built for enterprise-scale systems that require:

- Strong token constraints
- Predictable output
- Build-time processing
- Clear architectural boundaries

ngCorex is not a component library.
It is not a runtime styling framework.
It is not CSS-in-JS.

All processing happens at build time.

---

## Packages

ngCorex is structured as a layered ecosystem:

### Core Engine

```
@ngcorex/css
```

Build-time token normalization, validation, and CSS variable generation.

Includes CLI commands:

```bash
ngcorex init
ngcorex build
```

---

### Angular Integration

```
@ngcorex/angular
```

Angular CLI adapter that provides:

```bash
npx ng add @ngcorex/angular
```

This integration:

- Adds `@ngcorex/css` as a devDependency
- Adds CLI scripts
- Injects generated CSS into `angular.json`
- Keeps all processing build-time

No runtime logic is introduced.

---

## Quick Start (Angular)

```bash
npx ng add @ngcorex/angular
npm run ngcorex:dev
ng serve
```

The `ngcorex:dev` command automatically:

- Creates `tokens.json` and `ngcorex.config.ts`
- Generates initial CSS
- Watches for changes and auto-rebuilds

> **Alternative:** After running `ng add`, you can use `npm run ngcorex:setup` for a one-time setup, then `npm run ngcorex:watch` in a separate terminal for automatic rebuilds during development.

---

## Features

### Design Tokens

Define your design system once, use it everywhere:

- **Spacing** - Margins, padding, gaps, and layout dimensions
- **Colors** - Palettes with nested scales
- **Typography** - Font sizes, weights, and line heights
- **Radius** - Border radius values
- **Shadows** - Box shadow definitions
- **Z-Index** - Layer management
- **Opacity** - Transparency values
- **Borders** - Border widths and styles
- **Gradients** - Gradient definitions
- **Icons** - Icon sizing

### Utilities System

Generate utility classes from your tokens:

- **Spacing utilities** - `.m-{s}`, `.p-{s}`, `.gap-{s}`, `.w-{s}`, `.h-{s}`
- **Color utilities** - `.text-{color}`, `.bg-{color}`, `.border-{color}`
- **Layout utilities** - `.flex`, `.grid`, `.items-center`, `.justify-between`
- **Typography utilities** - `.text-{s}`, `.font-{s}`, `.leading-{s}`
- **Radius utilities** - `.rounded-{s}`
- **Shadow utilities** - `.shadow-{s}`
- **Opacity utilities** - `.opacity-{s}`
- **Border utilities** - `.border-w-{s}`, `.border-style-{s}`
- **Gradient utilities** - `.bg-gradient-{s}`
- **Icon utilities** - `.icon-{s}`
- **Container utility** - `.container` with configurable max-width

### Presets

Start quickly with pre-configured token sets:

- **Default preset** - Common spacing and color scales
- **Extensible** - Create custom presets for your design system
- **Composable** - Combine multiple presets with your own tokens

### Extends

Inherit and extend from base token files:

- Share tokens across multiple projects
- Create design system foundations
- Override specific values as needed

### Output Formats

Choose your preferred output format:

- **CSS variables** (default) - Standard CSS custom properties
- **SCSS variables** - SCSS variable syntax
- **SCSS map** - SCSS map format for advanced usage

---

## Philosophy

ngCorex is:

- Deterministic
- Constraint-driven
- Governance-first
- Build-time only
- Framework-agnostic at its core

The Angular adapter exists only to reinforce workflow — not to alter architecture.

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

---

## Documentation

Full documentation:

[https://ngcorex-docs.vercel.app](https://ngcorex-docs.vercel.app)

---

## Versioning

ngCorex follows semantic versioning.

Angular adapter minor version aligns with core minor version to guarantee compatibility.

Example:

```
@ngcorex/css@0.2.x
@ngcorex/angular@0.2.x
```

---

## Roadmap

- Core governance expansion
- Constraint tooling
- Visualization tooling
- Enterprise governance layer (private)

---

## License

MIT
