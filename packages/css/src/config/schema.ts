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
  enabled?: boolean;
  output?: string; // output file path, default 'src/styles/ngcorex.utilities.css'

  spacing?: {
    margin?: boolean;  // generates .m-{s}, .mt-{s}, .mr-{s}, .mb-{s}, .ml-{s}, .mx-{s}, .my-{s}
    padding?: boolean; // generates .p-{s}, .pt-{s}, .pr-{s}, .pb-{s}, .pl-{s}, .px-{s}, .py-{s}
    gap?: boolean;     // generates .gap-{s}
    width?: boolean;   // generates .w-{s}
    height?: boolean;  // generates .h-{s}
  };

  color?: {
    text?: string[];        // palette names e.g. ['primary', 'neutral'] → .text-primary-500
    background?: string[];  // palette names → .bg-primary-500
    border?: string[];      // palette names → .border-primary-500
  };

  layout?: {
    display?: boolean; // .flex .inline-flex .block .inline-block .inline .hidden
    flex?: boolean;    // .flex-row .flex-col .flex-wrap .items-center .justify-center .justify-between
    grid?: boolean;    // .grid .grid-cols-{1-12}
  };

  typography?: {
    fontSize?: boolean;   // .text-{s} → font-size
    fontWeight?: boolean; // .font-{s} → font-weight
    lineHeight?: boolean; // .leading-{s} → line-height
  };

  radius?: boolean;    // .rounded-{s} → border-radius
  shadows?: boolean;   // .shadow-{s} → box-shadow
  opacity?: boolean;   // .opacity-{s} → opacity

  borders?: {
    width?: boolean; // .border-w-{s} → border-width
    style?: boolean; // .border-style-{s} → border-style
  };

  gradients?: boolean; // .bg-gradient-{s} → background
  icons?: boolean;     // .icon-{s} → width + height

  container?: {
    enabled?: boolean;
    maxWidth?: string; // default '1280px'
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
  extends?: string | string[];  // NEW — path(s) to base tokens.json files
  tokens?: TokensConfig;
  semantic?: SemanticTokensConfig;
  utilities?: UtilitiesConfig;
  constraints?: ConstraintConfig;
  presets?: string[];
  output?: OutputConfig;
}
