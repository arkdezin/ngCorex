import type { NgCorexConfig } from '../config/schema.js';

export const presetDefault: NgCorexConfig = {
  tokens: {
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    colors: {
      neutral: {
        0: '#ffffff',
        100: '#f5f5f5',
        300: '#d4d4d4',
        500: '#737373',
        700: '#404040',
        900: '#171717'
      },
      primary: {
        500: '#2563eb'
      }
    }
  }
};
