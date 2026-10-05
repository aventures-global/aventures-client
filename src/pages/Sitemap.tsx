import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMerch, getSite, getTours } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import { aboutSectionPath, aboutTabs } from '../data/about'
import { visaPagePath, visaPages } from '../data/visaFinder'
import type { MerchProduct, SiteInfo, Tour } from '../types/content'

type SitemapLink = { label: string; to: string }

const siteLinks: SitemapLink[] = [
    { label: 'Home', to: '/' },
    { label: 'About us', to: '/#about' },
    ...aboutTabs.map((tab) => ({ label: tab.label, to: aboutSectionPath(tab.id) })),
    { label: 'Services', to: '/#services' },
    { label: 'Destinations', to: '/destinations' },
    { label: 'Shop', to: '/shop' },
    { label: 'Start your AVENture', to: '/start-your-aventure' },
    { label: 'Why travel with us?', to: '/#why' },
    { label: 'Contact', to: '/#contact' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Ask AVENtures', to: '/ask' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
]

const serviceLinks: SitemapLink[] = [
    { label: 'Flights', to: '/flights' },
    { label: 'Hotels', to: '/hotels' },
    { label: 'Cars & Transfers', to: '/cars' },
    { label: 'Visa Services', to: '/visa-assistance' },
    ...visaPages.map((page) => ({ label: page.title, to: visaPagePath(page.slug) })),
]

type SitemapGroupProps = { title: string; links: SitemapLink[]; loading?: boolean }

function SitemapGroup({ title, links, loading = false }: SitemapGroupProps) {
    return (
        <section className="border-t border-royal/15 pt-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.24em] text-royal">{title}</h2>
            {loading ? (
                <div className="mt-5 space-y-3" aria-busy="true">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-4 w-2/3 animate-pulse rounded-[3px] bg-royal/[0.08]" />
                    ))}
                </div>
            ) : (
                <ul className="mt-5 space-y-3 text-base text-ink/70">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="underline-offset-4 transition-colors hover:text-gold-deep hover:underline"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default function Sitemap() {
    const seo = getSeoForPath('/sitemap')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [tours, setTours] = useState<Tour[]>([])
    const [products, setProducts] = useState<MerchProduct[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        void getSite().then(setSite)
        Promise.all([getTours(), getMerch()])
            .then(([tourData, merchData]) => {
                setTours(tourData)
                setProducts(merchData)
            })
            .catch(() => undefined)
            .finally(() => setLoading(false))
    }, [])

    const tourLinks = tours.map((tour) => ({ label: tour.title, to: `/destinations/${tour.slug}` }))
    const productLinks = products.map((product) => ({ label: product.name, to: `/shop/${product.slug}` }))

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/sitemap" />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Index</p>
                <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">Sitemaps</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-ink/60">
                    Every page, service, destination, and shop item on the AVENtures website in one place.
                </p>

                <div className="mt-12 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    <SitemapGroup title="Site" links={siteLinks} />
                    <SitemapGroup title="Services" links={serviceLinks} />
                    <SitemapGroup title="Destinations" links={tourLinks} loading={loading} />
                    <SitemapGroup title="Shop" links={productLinks} loading={loading} />
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
