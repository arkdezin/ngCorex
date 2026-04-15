# ngCorex Public Roadmap

This roadmap outlines the **general direction** of ngCorex development. It is not a promise, timeline, or commitment to specific delivery dates.

The project prioritizes:

- correctness over novelty
- build-time guarantees
- minimal runtime impact
- long-term maintainability

---

## Current Focus (Stability & Adoption)

### Core Engine Stabilization

- Token normalization
- Constraint enforcement
- CSS variable generation
- Backward compatibility across releases

### CLI Reliability

- Predictable build behavior
- Watch mode stability
- Clear, actionable error messages
- Safe, non-destructive init workflow

---

## Near-Term Direction (Incremental Expansion)

### Expanded Token Coverage

✅ **Completed** - All major token categories are now supported:

- spacing
- colors
- typography
- border radius
- shadows
- z-index
- opacity
- borders (width and style)
- gradients
- icons

Each category follows the same principles:

- simple configuration
- strong validation
- deterministic output

---

### Improved Developer Experience

✅ **Completed** - Enhanced developer experience:

- clearer CLI summaries
- more helpful warnings
- easier-to-understand errors
- comprehensive documentation with examples
- utilities system for rapid development
- presets for quick setup
- extends for token inheritance
- multiple output formats

Continued focus on:

- even better diagnostics
- improved error messages
- more documentation examples

---

### Token Validation & Safety

✅ **Completed** - Comprehensive validation system:

- invalid values or formats
- duplicated tokens
- inconsistent scales
- type checking for all token categories
- format validation for all token types

The goal is to assist developers, not restrict them.

---

## Medium-Term Exploration (Opinionated but Optional)

### Optional Defaults & Presets

✅ **Completed** - Presets system implemented:

- default preset with common tokens
- extensible preset registry
- documented preset usage
- custom preset creation guide

These are always:

- optional
- transparent
- fully customizable

Future exploration:

- more preset options
- industry-specific presets
- community-contributed presets

---

### Documentation as a First-Class Feature

✅ **Completed** - Comprehensive documentation:

- design token fundamentals
- build-time CSS workflows
- common pitfalls in large codebases
- practical guidance, not marketing
- utilities system guide
- presets system guide
- extends feature guide
- semantic tokens guide
- output formats guide

Continued expansion:

- more real-world examples
- video tutorials
- interactive examples

---

## Long-Term Direction (Under Observation)

### Deeper Framework Alignment

Explore tighter integration patterns with Angular workflows once the core engine has matured and usage patterns are well understood.

This work will only proceed if it:

- clearly benefits users
- does not compromise the core engine
- aligns with ngCorex’s build-time philosophy

---

## Explicit Non-Goals

The following are **not** current goals:

- Runtime styling solutions
- UI or component libraries
- Visual editors or design tools
- Framework lock-in
- Breaking changes without clear migration paths

---

## How This Roadmap Evolves

This roadmap evolves based on:

- real-world usage
- user feedback
- stability requirements
- maintainability considerations

Not every idea becomes a feature.
Not every feature moves forward quickly.

---

## Final Note

ngCorex aims to be:

> a reliable foundation for design tokens and utility CSS - not a fast-moving experiment.

Slow, predictable progress is intentional.
