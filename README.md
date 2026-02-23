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
npm run ngcorex:init
npm run ngcorex:build
ng serve
```

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
