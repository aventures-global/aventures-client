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
    children: ReactNode
}

export default function PageShell({
    title,
    eyebrow,
    description,
    noIndex = false,
    children,
}: PageShellProps) {
    const location = useLocation()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const routeSeo = getSeoForPath(location.pathname)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo
                title={routeSeo.title}
                description={description ?? routeSeo.description}
                path={location.pathname}
                noIndex={noIndex}
            />
            <Header />
            <main className="site-container flex-1 pb-24 pt-36">
                {eyebrow ? <p className="text-sm font-medium uppercase tracking-[0.28em] text-royal">{eyebrow}</p> : null}
                <h1 className="mt-2 font-noto-serif text-4xl text-royal sm:text-5xl">{title}</h1>
                <div className="mt-10">{children}</div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
