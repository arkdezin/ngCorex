// A simple scale like spacing, radius, font sizes
export type TokenScale = Record<string, string>;

// Nested scales (used for colors)
export type NestedTokenScale = Record<string, TokenScale>;

// Normalized token structure
export interface NormalizedToken {
  name: string;        // e.g. color-primary-500
  cssVariable: string; // e.g. --nx-color-primary-500
  value: string;       // e.g. #6366f1
}

// Grouped normalized tokens
export type NormalizedTokenGroup = Record<string, NormalizedToken>;
