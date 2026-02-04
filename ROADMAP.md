# ngCorex Public Roadmap

This roadmap outlines the **general direction** of ngCorex development.
It is not a promise, timeline, or commitment to specific delivery dates.

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

Gradually support additional common design token categories, such as:

- typography
- border radius
- shadows
- z-index

Each category will follow the same principles:

- simple configuration
- strong validation
- deterministic output

---

### Improved Developer Experience

Focus on better feedback and clarity:

- clearer CLI summaries
- more helpful warnings
- easier-to-understand errors
- better documentation examples

---

### Token Validation & Safety

Introduce additional **non-blocking** validations to help catch common issues early:

- invalid values or formats
- duplicated tokens
- inconsistent scales

The goal is to assist developers, not restrict them.

---

## Medium-Term Exploration (Opinionated but Optional)

### Optional Defaults & Presets

Explore providing optional starter configurations to reduce setup friction:

- example token scales
- recommended file structures
- documented best practices

These will always be:

- optional
- transparent
- fully customizable

---

### Documentation as a First-Class Feature

Expand documentation to cover:

- design token fundamentals
- build-time CSS workflows
- common pitfalls in large codebases
- practical guidance, not marketing

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
