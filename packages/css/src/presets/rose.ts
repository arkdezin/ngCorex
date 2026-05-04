import type { NgCorexConfig } from '../config/schema.js';

export const presetRose: NgCorexConfig = {
    tokens: {
        colors: {
            neutral: {
                '50': '#f9fafb',
                '100': '#f3f4f6',
                '200': '#e5e7eb',
                '300': '#d1d5db',
                '400': '#9ca3af',
                '500': '#6b7280',
                '600': '#4b5563',
                '700': '#374151',
                '800': '#1f2937',
                '900': '#111827',
                '950': '#030712',
                },
            primary: {
                '50': '#fff1f2',
                '100': '#ffe4e6',
                '200': '#fecdd3',
                '300': '#fda4af',
                '400': '#fb7185',
                '500': '#f43f5e',
                '600': '#e11d48',
                '700': '#be123c',
                '800': '#9f1239',
                '900': '#881337',
                '950': '#4c0519',
            },
            success: {
              "100": "#dcfce7",
              "500": "#22c55e",
              "700": "#15803d"
            },
            warning: {
              "100": "#fef9c3",
              "500": "#eab308",
              "700": "#a16207"
            },
            error: {
              "100": "#fee2e2",
              "500": "#ef4444",
              "700": "#b91c1c"
            },
            info: {
              "100": "#dbeafe",
              "500": "#2b7fff",
              "700": "#193cb8"  
            }
        }
    }
};