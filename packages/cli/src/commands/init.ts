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
            "1": 4,
            "2": 8
          },
          colors: {
            gray: {
              "100": "#f3f4f6",
              "900": "#111827"
            }
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
