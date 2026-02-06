import type { ConstraintConfig, NgCorexConfig } from '../config/schema.js';
import { validateSpacingConstraints } from './spacing.js';
import { validateColorConstraints } from './colors.js';
import { validateRadiusConstraints } from './radius.js';
import { validateZIndexConstraints } from './z-index.js';

export function runConstraints(config: NgCorexConfig): void {
  const tokens = config.tokens;
  const rules = config.constraints;

  if (!tokens) return;

  if (tokens.spacing) {
    validateSpacingConstraints(tokens.spacing, rules?.spacing);
  }

  if (tokens.colors) {
    validateColorConstraints(tokens.colors, rules?.colors);
  }

  if (tokens.radius) {
    validateRadiusConstraints(tokens.radius, rules?.radius);
  }

  if (tokens.zIndex) {
    validateZIndexConstraints(tokens.zIndex, rules?.zIndex);
  }
}
