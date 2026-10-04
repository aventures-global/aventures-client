import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

/** Same fallback as src/lib/siteUrl.ts when VITE_SITE_URL is unset. */
const FALLBACK_SITE_URL = 'https://aventures-client.vercel.app'

const preexistingEnv = new Set(
    Object.entries(process.env)
        .filter(([, value]) => value != null && value !== '')
        .map(([key]) => key),
)

/** Vite-style env files, lowest priority first. Existing process.env wins. */
function loadEnvFiles() {
    const fromFiles = {}
    for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
        const filePath = join(root, name)
        if (!existsSync(filePath)) continue
        for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
            const trimmed = line.trim()
            if (!trimmed || trimmed.startsWith('#')) continue
            const eq = trimmed.indexOf('=')
            if (eq <= 0) continue
            const key = trimmed.slice(0, eq).trim()
            if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue
            let value = trimmed.slice(eq + 1).trim()
            if (
                (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
                (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
            ) {
                value = value.slice(1, -1)
            }
            fromFiles[key] = value
        }
    }
    return (key) => {
        if (preexistingEnv.has(key)) return process.env[key]
        return fromFiles[key]
    }
}

const env = loadEnvFiles()

function cleanSiteUrl(value) {
    return value
        .trim()
        .replace(/^['"]+|['"]+$/g, '')
        .replace(/\/+$/, '')
}

const siteUrl = cleanSiteUrl(env('VITE_SITE_URL') || env('SITE_URL') || FALLBACK_SITE_URL)

const staticPaths = [
    '/',
    '/about',
    '/destinations',
    '/shop',
    '/custom-tour',
    '/flights',
    '/hotels',
    '/cars',
    '/visa-assistance',
    '/services/visa/tourist',
    '/services/visa/k1-k2',
    '/services/visa/j1',
    '/services/visa/r1-r2',
    '/services/visa/p1-p2',
    '/services/visa/e2',
    '/faq',
    '/ask',
    '/privacy',
    '/terms',
    '/sitemap',
]

const toursSource = readFileSync(join(root, 'src/data/tours.ts'), 'utf8')
const tourSlugs = [...toursSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])

const merchSource = readFileSync(join(root, 'src/data/merch.ts'), 'utf8')
const merchSlugs = [...merchSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])

const paths = [
    ...staticPaths,
    ...tourSlugs.map((slug) => `/destinations/${slug}`),
    ...merchSlugs.map((slug) => `/shop/${slug}`),
]

const today = new Date().toISOString().slice(0, 10)

function xmlEscape(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}

const urlEntries = paths
    .map((path) => {
        const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
        return `  <url>
    <loc>${xmlEscape(loc)}</loc>
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

console.log(`Wrote sitemap.xml (${paths.length} URLs) and robots.txt for ${siteUrl}`)
