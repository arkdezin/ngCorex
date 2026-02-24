# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning:

- MAJOR version when breaking changes are introduced
- MINOR version when new features are added
- PATCH version for bug fixes

---

## 0.2.7 - 2026-02-24

### Fixed

- **Dependency Installation** - Fixed dependency installation by adding npm install to setup scripts
  - Restored `addDependencies()` function to add packages to package.json
  - Added `npm install` to `ngcorex:setup` script
  - Added `npm install` to `ngcorex:dev` script
  - Added `npm install` to `ngcorex:start` script
  - Updated documentation to reflect the new setup flow

### Changed

- **Setup Flow** - Users now run `npm run ngcorex:setup` which includes `npm install`
  - No need to manually run `npm install` after `ng add`
  - Setup scripts handle installation automatically
  - More reliable than relying on `externalDependencies`

### Notes

- The `externalDependencies` mechanism in Angular CLI is not reliable for automatic installation
- Setup scripts now include `npm install` to ensure dependencies are properly installed
- This provides a more predictable and reliable user experience

---

## 0.2.6 - 2026-02-24

### Fixed

- **Automatic npm install** - Fixed ng-add schematic to automatically install dependencies
  - Removed `addDependencies()` function that was conflicting with `externalDependencies`
  - Now relies solely on `externalDependencies` in collection.json for automatic installation
  - Users no longer need to manually run `npm install` after `ng add @ngcorex/angular`
  - `@ngcorex/cli` is now the only external dependency (includes `@ngcorex/css` as transitive dependency)

### Changed

- **Simplified dependency management** - Reduced externalDependencies to only `@ngcorex/cli`
  - `@ngcorex/css` is automatically installed as a transitive dependency
  - Cleaner package.json with fewer direct dependencies
  - Better alignment with npm's dependency resolution

---

## 0.2.5 - 2026-02-24 Update

- Changelog updated.
- code of conduct added.
- engine added to package.json

## 0.2.5 - 2026-02-24

### Fixed

- **Angular Installation Flow** - Improved ng-add installation flow for better user experience
- **Package Documentation** - Updated README and package version for v0.2.4 release

---

## 0.2.4 - 2026-02-24

### Added

- **Angular Workflow Scripts** - Added setup, dev, and watch scripts for streamlined development workflow
- **Documentation Updates** - Updated Angular package documentation with latest ng-add changes

### Fixed

- **CLI Manual Installation** - Fixed Angular manual install for CLI package

---

## 0.2.3 - 2026-02-23

### Added

- **Angular Package Installation** - Implemented Angular package installation functionality
- **Error Handling** - Fixed Angular package installation error handling

### Fixed

- **Docs Build Error** - Fixed documentation build errors

---

## 0.2.1 - 2026-02-23

### Added

- **Angular Adapter MVP** - Complete Angular adapter with ng-add support and documentation
- **Package Descriptions** - Standardized package descriptions across the ecosystem
- **Documentation URLs** - Added documentation URLs to packages and GitHub repository

### Changed

- **CI/CD Improvements** - Enhanced CI/CD pipeline with OIDC publishing support
- **Package Publishing** - Added publishConfig with public access for npm publishing
- **Node Version Check** - Updated node version check for OIDC publishing

### Notes

- This release introduces the Angular adapter for ngCorex
- Improved package publishing workflow with OIDC provenance
- Better documentation integration across all packages

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

This release marks a stability milestone for ngCorex, establishing a reliable foundation for future expansion.

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
- Improved package for npm with github link

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
