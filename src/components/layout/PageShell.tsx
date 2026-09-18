import { useEffect, useState, type ReactNode } from 'react'
import { getSite } from '../../api'
import Footer from './Footer'
import Header from './Header'
import type { SiteInfo } from '../../types/content'

type PageShellProps = {
  title: string
  eyebrow?: string
  children: ReactNode
}

export default function PageShell({ title, eyebrow, children }: PageShellProps) {
  const [site, setSite] = useState<SiteInfo | null>(null)

  useEffect(() => {
    void getSite().then(setSite)
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-ink">
      <Header />
      <main className="site-container flex-1 pb-24 pt-36">
        {eyebrow ? <p className="text-sm text-gold">{eyebrow}</p> : null}
        <h1 className="mt-2 font-serif text-4xl text-gold-gradient sm:text-5xl">{title}</h1>
        <div className="mt-10">{children}</div>
      </main>
      {site && <Footer site={site} />}
    </div>
  )
}
