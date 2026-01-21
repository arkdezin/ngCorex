import type { NgCorexConfig } from '../config/schema.js';
import { presetDefault } from './default.js';

export const presetRegistry: Record<string, NgCorexConfig> = {
  default: presetDefault
};
