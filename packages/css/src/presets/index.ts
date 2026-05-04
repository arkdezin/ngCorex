import type { NgCorexConfig } from '../config/schema.js';
import { presetDefault } from './default.js';
import { presetCamelot } from './camelot.js';
import { presetRose } from './rose.js';

export const presetRegistry: Record<string, NgCorexConfig> = {
  default: presetDefault,
  camelot: presetCamelot,
  rose: presetRose
};
