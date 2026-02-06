import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    layer: 'tokens'
  },
  tokens: {
    spacing: {
      md: '12px',
      sm: '8px'
    },
    radius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px'
    }
  }
});
