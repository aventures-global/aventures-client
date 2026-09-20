const FALLBACK_SITE_URL = 'https://aventures-client.vercel.app'

/** Canonical site origin (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  return (fromEnv || FALLBACK_SITE_URL).replace(/\/$/, '')
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = getSiteUrl()
  if (!path || path === '/') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
