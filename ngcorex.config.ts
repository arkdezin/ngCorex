import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    layer: 'tokens'
  },
  tokens: {
    spacing: {
      md: '12px',
      sm: '8px'
    }
  }
});
