import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getFaqs, getSite } from '../api'
import FaqBrowser from '../components/faq/FaqBrowser'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { ASK_AVENTURES_HREF } from '../data/visaFinder'
import { getSeoForPath } from '../data/seo'
import type { FaqCategoryGroup, SiteInfo } from '../types/content'

type LoadState =
    | { status: 'loading' }
    | { status: 'error' }
    | { status: 'ready'; categories: FaqCategoryGroup[] }

const askLink = (
    <Link
        to={ASK_AVENTURES_HREF}
        className="font-medium text-royal underline-offset-4 hover:text-gold-deep hover:underline"
    >
        Ask AVENtures directly
    </Link>
)

const askPrompt = (
    <div className="mt-16 border-t border-royal/15 pt-10">
        <p className="font-noto-serif text-2xl text-ink sm:text-3xl">
            Can&rsquo;t find the answer you&rsquo;re looking for?
        </p>
        <Link
            to={ASK_AVENTURES_HREF}
            className="group mt-5 inline-flex items-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white"
        >
            Ask AVENtures
            <ArrowRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
            />
        </Link>
    </div>
)

export default function Faq() {
    const seo = getSeoForPath('/faq')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [state, setState] = useState<LoadState>({ status: 'loading' })
    const location = useLocation()

    useEffect(() => {
        void getSite().then(setSite)
        getFaqs()
            .then((data) => setState({ status: 'ready', categories: data.categories }))
            .catch(() => setState({ status: 'error' }))
    }, [])

    if (location.hash === '#ask-aventures') return <Navigate to={ASK_AVENTURES_HREF} replace />

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/faq" />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Support</p>
                <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">Frequently Asked Questions</h1>
                <p className="mt-5 font-poppins text-xl text-royal sm:text-2xl">Have a question about your AVENture?</p>
                <p className="mt-3 max-w-2xl text-base leading-8 text-ink/60">
                    We&rsquo;ve gathered some of the questions applicants and travelers commonly ask about U.S. visa
                    applications, documents, fees, interviews, processing, and travel planning. Choose a category below
                    to find the information you&rsquo;re looking for.
                </p>

                <div className="mt-10">
                    {state.status === 'loading' ? (
                        <div aria-busy="true" aria-label="Loading FAQs">
                            <div className="h-14 max-w-2xl animate-pulse rounded-[3px] bg-royal/10" />
                            <div className="mt-12 max-w-3xl space-y-4">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-5 animate-pulse rounded-[3px] bg-royal/[0.08]" />
                                ))}
                            </div>
                        </div>
                    ) : state.status === 'error' ? (
                        <div className="max-w-3xl">
                            <p className="border-t border-royal/15 pt-6 text-sm leading-7 text-ink/60">
                                We could not load the questions right now. Please refresh the page, or {askLink}.
                            </p>
                        </div>
                    ) : (
                        <FaqBrowser categories={state.categories} emptyAction={askLink} footer={askPrompt} />
                    )}
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
