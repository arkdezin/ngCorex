import fs from 'node:fs';
import path from 'node:path';

export async function initCommand() {
  const cwd = process.cwd();

  const tokensPath = path.resolve(cwd, 'tokens.json');
  const configPath = path.resolve(cwd, 'ngcorex.config.ts');

  let createdSomething = false;

  // tokens.json
  if (!fs.existsSync(tokensPath)) {
    fs.writeFileSync(
      tokensPath,
      JSON.stringify(
        {
          spacing: {
            "xs": "0.25rem",
            "sm": "0.5rem",
            "md": "1rem",
            "lg": "1.5rem",
            "xl": "2rem"
          },
          colors: {
            neutral: {
              "0": "#ffffff",
              "100": "#f5f5f5",
              "300": "#d4d4d4",
              "500": "#737373",
              "700": "#404040",
              "900": "#171717"
            },
            primary: {
              "500": "#2563eb"
            }
          },
          radius: {
            "sm": "0.25rem",
            "md": "0.5rem",
            "lg": "0.75rem",
            "xl": "1rem",
            "full": "9999px"
          },
          zIndex: {
            "base": "0",
            "dropdown": "1000",
            "sticky": "1020",
            "fixed": "1030",
            "modal-backdrop": "1040",
            "modal": "1050",
            "popover": "1060",
            "tooltip": "1070"
          },
          typography: {
            fontSize: {
              "xs": "0.75rem",
              "sm": "0.875rem",
              "base": "1rem",
              "lg": "1.125rem",
              "xl": "1.25rem",
              "2xl": "1.5rem",
              "3xl": "1.875rem",
              "4xl": "2.25rem"
            },
            fontWeight: {
              "light": "300",
              "normal": "400",
              "medium": "500",
              "semibold": "600",
              "bold": "700",
              "extrabold": "800"
            },
            lineHeight: {
              "none": "1",
              "tight": "1.25",
              "snug": "1.375",
              "normal": "1.5",
              "relaxed": "1.625",
              "loose": "2"
            }
          },
          shadows: {
            "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "base": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"
          }
        },
        null,
        2
      )
    );
    console.info('✔ Created tokens.json');
    createdSomething = true;
  } else {
    console.info('i tokens.json already exists — skipped');
  }

  // ngcorex.config.ts
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `import { defineNgCorexConfig } from '@ngcorex/css';

export default defineNgCorexConfig({
  output: {
    file: 'src/styles/ngcorex.css'
  }
});
`
    );
    console.info('✔ Created ngcorex.config.ts');
    createdSomething = true;
  } else {
    console.info('i ngcorex.config.ts already exists — skipped');
  }

  if (createdSomething) {
    console.info('');
    console.info('Next steps:');
    console.info('- Run `ngcorex build` to generate CSS');
    console.info('- Edit tokens.json to customize your design tokens');
  }
}
