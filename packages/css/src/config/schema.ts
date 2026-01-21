import type { TokenScale } from '../tokens/types.js';
import type { NestedTokenScale } from '../tokens/types.js';
export type ConstraintLevel = 'error' | 'warning' | 'off';

export interface ConstraintConfig {
  spacing?: {
    unit?: ConstraintLevel;
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
  colors?: {
    type?: ConstraintLevel;
    format?: ConstraintLevel;
    shadeKey?: ConstraintLevel;
  };
}


export interface TokensConfig {
    spacing?: TokenScale;
    colors?: NestedTokenScale;
    radius?: TokenScale;
    typography?: {
        fontSize?: TokenScale;
        fontWeight?: TokenScale;
        lineHeight?: TokenScale;
    };
}

export interface UtilitiesConfig {
    spacing?: {
        margin?: boolean;
        padding?: boolean;
        gap?: boolean;
    };
    color?: {
        text?: string[];
        background?: string[];
        border?: string[];
    };
    layout?: {
        display?: boolean;
        flex?: boolean;
        grid?: boolean;
    };
}

export type ConstraintSeverity = 'error' | 'warning' | 'info';

export interface ConstraintsConfig {
    forbidArbitraryValues?: {
        severity: ConstraintSeverity;
    };
    spacingScaleOnly?: {
        allowed: string[];
        severity: ConstraintSeverity;
    };
    maxUtilityCountPerElement?: {
        max: number;
        severity: ConstraintSeverity;
    };
}

export interface OutputConfig {
  file?: string;
  layer?: string;
}

export interface NgCorexConfig {
    tokens?: TokensConfig;
    utilities?: UtilitiesConfig;
    constraints?: ConstraintConfig;
    presets?: string[];
    output?: OutputConfig;
}
