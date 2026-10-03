import { useEffect, useState } from 'react'
import { getFaqs, getSite } from '../api'
import AskAventures from '../components/faq/AskAventures'
import FaqBrowser from '../components/faq/FaqBrowser'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import { useAskForm } from '../hooks/useAskForm'
import type { FaqCategoryGroup, SiteInfo } from '../types/content'

type LoadState =
    | { status: 'loading' }
    | { status: 'error' }
    | { status: 'ready'; categories: FaqCategoryGroup[] }

const ASK_ID = 'ask-aventures'

function scrollToAsk() {
    const section = document.getElementById(ASK_ID)
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    section.querySelector<HTMLInputElement>('input:not([tabindex="-1"])')?.focus({ preventScroll: true })
}

export default function Faq() {
    const seo = getSeoForPath('/faq')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [state, setState] = useState<LoadState>({ status: 'loading' })
    const askForm = useAskForm()

    const askLink = (
        <button
            type="button"
            onClick={scrollToAsk}
            className="font-medium text-royal underline-offset-4 hover:text-gold-deep hover:underline"
        >
            Ask AVENtures directly
        </button>
    )
    const ask = <AskAventures id={ASK_ID} form={askForm} email={site?.email} />

    useEffect(() => {
        void getSite().then(setSite)
        getFaqs()
            .then((data) => setState({ status: 'ready', categories: data.categories }))
            .catch(() => setState({ status: 'error' }))
    }, [])

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/faq" />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Support</p>
                <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">Frequently Asked Questions</h1>
                <p className="mt-5 font-noto-serif text-xl text-royal sm:text-2xl">Have a question about your AVENture?</p>
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
                                We could not load the questions right now. Please refresh the page, or ask your
                                question below.
                            </p>
                            {ask}
                        </div>
                    ) : (
                        <FaqBrowser categories={state.categories} emptyAction={askLink} footer={ask} />
                    )}
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
