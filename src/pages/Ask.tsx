import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getFaqs, getSite } from '../api'
import AskAventures from '../components/faq/AskAventures'
import AskSuggestions from '../components/faq/AskSuggestions'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import { useAskForm } from '../hooks/useAskForm'
import type { FaqData, FaqItem, SiteInfo } from '../types/content'

function publishedFaqs(data: FaqData): FaqItem[] {
    const unique = new Map<string, FaqItem>()
    for (const category of data.categories) {
        for (const faq of category.faqs) unique.set(faq.id, faq)
    }
    for (const faq of data.top) unique.set(faq.id, faq)
    return [...unique.values()]
}

export default function Ask() {
    const seo = getSeoForPath('/ask')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [faqs, setFaqs] = useState<FaqItem[]>([])
    const [searchParams] = useSearchParams()
    const askForm = useAskForm(searchParams.get('visa'))

    useEffect(() => {
        void getSite().then(setSite)
        getFaqs()
            .then((data) => setFaqs(publishedFaqs(data)))
            .catch(() => setFaqs([]))
    }, [])

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path="/ask" />
            <Header />
            <main className="site-container flex-1 pb-20 pt-28 sm:pt-32">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Ask AVENtures</p>
                <h1 className="mt-3 font-noto-serif text-[clamp(1.75rem,2.9vw,2.5rem)] leading-tight text-ink lg:whitespace-nowrap">
                    Can&rsquo;t find the answer you&rsquo;re looking for? Ask AVENtures!
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-ink/60">
                    Have a question about your visa or travel plans? Send your question to AVENtures and our team will
                    be happy to assist.
                </p>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
                    <AskAventures form={askForm} email={site?.email} />
                    {askForm.status !== 'sent' && <AskSuggestions faqs={faqs} question={askForm.fields.question} />}
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
