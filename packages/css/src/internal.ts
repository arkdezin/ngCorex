import { buildCssFromConfig } from './engine/build-css.js';
import type { NgCorexConfig } from './config/schema.js';

const testConfig: NgCorexConfig = {
  presets: ['default'],
  output: {
    layer: 'tokens'
  }  
};

const css = buildCssFromConfig(testConfig);

console.log(css);
