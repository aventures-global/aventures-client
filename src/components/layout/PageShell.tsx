import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getSite } from '../../api'
import { getSeoForPath } from '../../data/seo'
import Seo from '../seo/Seo'
import Footer from './Footer'
import Header from './Header'
import type { SiteInfo } from '../../types/content'

type PageShellProps = {
    title: string
    eyebrow?: string
    description?: string
    noIndex?: boolean
    appearance?: 'dark' | 'paper'
    children: ReactNode
}

export default function PageShell({
    title,
    eyebrow,
    description,
    noIndex = false,
    appearance = 'dark',
    children,
}: PageShellProps) {
    const location = useLocation()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const routeSeo = getSeoForPath(location.pathname)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    return (
        <div className={`flex min-h-svh flex-col ${appearance === 'paper' ? 'luxury-paper font-poppins' : 'bg-ink'}`}>
            <Seo
                title={routeSeo.title}
                description={description ?? routeSeo.description}
                path={location.pathname}
                noIndex={noIndex}
            />
            <Header />
            <main className="site-container flex-1 pb-24 pt-36">
                {eyebrow ? <p className={`text-sm ${appearance === 'paper' ? 'font-medium uppercase tracking-[0.28em] text-royal' : 'text-gold'}`}>{eyebrow}</p> : null}
                <h1 className={`mt-2 text-4xl sm:text-5xl ${appearance === 'paper' ? 'font-noto-serif text-royal' : 'font-serif text-gold-gradient'}`}>{title}</h1>
                <div className="mt-10">{children}</div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
