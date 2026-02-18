import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM-safe __dirname replacement
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 
// Set up Nextra with its configuration
const withNextra = nextra({
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
    turbopack: {
        // 👇 Tell Next.js that the docs folder is the workspace root
        root: __dirname,
        resolveAlias: {
        // Path to your `mdx-components` file with extension
            'next-mdx-import-source-file': './mdx-components.js'
        }
    }
})