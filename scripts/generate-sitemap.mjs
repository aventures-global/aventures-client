import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

const siteUrl = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  'https://aventures-client.vercel.app'
).replace(/\/$/, '')

const staticPaths = [
  '/',
  '/about',
  '/destinations',
  '/custom-tour',
  '/flights',
  '/hotels',
  '/cars',
  '/faq',
  '/privacy',
  '/sitemap',
]

const toursSource = readFileSync(join(root, 'src/data/tours.ts'), 'utf8')
const tourSlugs = [...toursSource.matchAll(/slug:\s*'([^']+)'/g)].map(
  (match) => match[1],
)

const paths = [
  ...staticPaths,
  ...tourSlugs.map((slug) => `/destinations/${slug}`),
]

const today = new Date().toISOString().slice(0, 10)

const urlEntries = paths
  .map((path) => {
    const loc = path === '/' ? siteUrl : `${siteUrl}${path}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)

console.log(
  `Wrote sitemap.xml (${paths.length} URLs) and robots.txt for ${siteUrl}`,
)
