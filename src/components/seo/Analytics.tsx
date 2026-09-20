import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const gaId = (import.meta.env.VITE_GA_ID as string | undefined)?.trim()

/** Loads GA4 only when `VITE_GA_ID` is set. Renders nothing. */
export default function Analytics() {
  useEffect(() => {
    if (!gaId || typeof document === 'undefined') return

    const existing = document.getElementById('aventures-ga4')
    if (existing) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)

    const script = document.createElement('script')
    script.id = 'aventures-ga4'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
  }, [])

  return null
}
