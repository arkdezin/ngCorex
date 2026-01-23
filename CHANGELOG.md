# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning:

- MAJOR version when breaking changes are introduced
- MINOR version when new features are added
- PATCH version for bug fixes

---

## 0.1.3 - 2026-01-23

### Added

- Informational CLI guidance recommending `tokens.json` when inline tokens are used
- Improved Readme for npm packages and github
Improved package for npm with github link

---

## 0.1.2 - 2026-01-22

### Added

- Support for external `tokens.json` as a token source
- Friendly validation and error messages for token files

### Documentation

- Added getting started guide using `tokens.json`
- Improved npm package keywords

---

## v0.1.1 - 2026-01-21

### Fixed

- Fixed CLI runtime crash caused by missing `esbuild` dependency
- Moved `esbuild` to runtime `dependencies` for `@ngcorex/cli`
- Ensured `npx ngcorex version` works in fresh installs

### Notes

- This is a patch release for the CLI only
- No changes to `@ngcorex/css`

---

## v0.1.0 - 2026-01-21

### Added

- Initial release of `@ngcorex/css`
  - Design token normalization
  - Constraint system (spacing, colors)
  - CSS variable generation
- Initial release of `@ngcorex/cli`
  - `ngcorex build`
  - `ngcorex build --watch`
  - `ngcorex build --dry-run`
  - `ngcorex version`
- ESM + TypeScript setup
- Scoped npm packages under `@ngcorex`
- MIT license

### Notes

- First public release of ngCorex
