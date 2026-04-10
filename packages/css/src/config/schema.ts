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
  radius?: {
    unit?: ConstraintLevel;
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
  zIndex?: {
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
  typography?: {
    fontSize?: {
      format?: ConstraintLevel;
      type?: ConstraintLevel;
    };
    fontWeight?: {
      format?: ConstraintLevel;
      type?: ConstraintLevel;
    };
    lineHeight?: {
      format?: ConstraintLevel;
      type?: ConstraintLevel;
    };
  };
  shadows?: {
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
   opacity?: {
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
  borders?: {
    width?: {
      unit?: ConstraintLevel;
      format?: ConstraintLevel;
      type?: ConstraintLevel;
    };
    style?: {
      format?: ConstraintLevel;
      type?: ConstraintLevel;
    };
  };
  gradients?: {
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
  icons?: {
    unit?: ConstraintLevel;
    format?: ConstraintLevel;
    type?: ConstraintLevel;
  };
}


export interface TokensConfig {
  spacing?: TokenScale;
  colors?: NestedTokenScale;
  radius?: TokenScale;
  zIndex?: TokenScale;
  typography?: {
      fontSize?: TokenScale;
      fontWeight?: TokenScale;
      lineHeight?: TokenScale;
  };
  shadows?: TokenScale;
    opacity?: TokenScale;
  borders?: {
    width?: TokenScale;
    style?: TokenScale;
  };
  gradients?: TokenScale;
  icons?: TokenScale;
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
  format?: 'css' | 'scss-variables' | 'scss-map'; 
}

// Add this new type
export interface SemanticTokensConfig {
  [category: string]: Record<string, string>;
}

export interface NgCorexConfig {
  tokens?: TokensConfig;
  semantic?: SemanticTokensConfig;
  utilities?: UtilitiesConfig;
  constraints?: ConstraintConfig;
  presets?: string[];
  output?: OutputConfig;
}
