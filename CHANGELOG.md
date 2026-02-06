# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning:

- MAJOR version when breaking changes are introduced
- MINOR version when new features are added
- PATCH version for bug fixes

---

## 0.2.0 - 2026-02-07

### Highlights

- Validation and diagnostics stabilized
- Clear separation between errors, warnings, and informational messages
- Improved developer experience with predictable, low-noise output

### Validation

- Introduced a strict three-level validation model:
  - Errors (blocking)
  - Warnings (non-blocking)
  - Info messages (advisory)
- Validation messages now include precise token paths and actionable guidance
- Common and industry-standard patterns no longer emit warnings
- Optional scale completeness checks are reported as informational only

### Stability

- Deterministic validation behavior for the same input
- No breaking changes to valid configurations
- CSS output remains fully backward compatible

This release marks a stability milestone for ngCorex,
establishing a reliable foundation for future expansion.

---
## 0.1.7 - 2026-02-06

### Added

- **DX Improvements** - Enhanced `ngcorex init` command with comprehensive starter tokens
- **Updated Init Tokens** - Now includes all token categories (spacing, colors, radius, zIndex, typography, shadows) with sensible defaults
- **Validation Implementation** - Full constraint system implementation for all token categories:
  - Spacing validation (unit, format, type)
  - Color validation (type, format, shadeKey)
  - Radius validation (unit, format, type)
  - Z-Index validation (format, type)
  - Typography validation (fontSize, fontWeight, lineHeight format and type)
  - Shadow validation (format, type)

### Changed

- Expanded default token values in init command for better DX
- Improved token scaffolding with production-ready defaults

---

## 0.1.6 - 2026-02-06

### Added

- **Border Radius Tokens** - New token category for border radius values with validation
- **Z-Index Tokens** - New token category for z-index layer values with validation
- **Typography Tokens** - New token category with sub-categories (fontSize, fontWeight, lineHeight) with validation
- **Shadow Tokens** - New token category for box shadow values with validation
- **Documentation Updates** - Updated README files with complete token category reference and configuration examples

### Documentation

- Updated CLI README with comprehensive token category reference table
- Updated CSS package README with token category documentation
- Added constraint configuration examples in CLI README
- Added output layer configuration section in CLI README
- Updated CSS output examples to show all new token types

---

## 0.1.5 - 2026-01-28

### Fixed

- Watch mode now rebuilds when `tokens.json` changes
- Updated init placeholder with proper `tokens.json` code

### Documentation

- Updated CLI README with complete command overview

---

## 0.1.4 - 2026-01-27

### Added

- `ngcorex init` command to scaffold starter config and tokens

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
