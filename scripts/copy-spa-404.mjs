import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = join(root, 'dist', 'index.html')
const notFoundPath = join(root, 'dist', '404.html')

if (!existsSync(indexPath)) {
    console.error('dist/index.html is missing. Run the Vite build first.')
    process.exit(1)
}

copyFileSync(indexPath, notFoundPath)
console.log('Copied dist/index.html to dist/404.html')
