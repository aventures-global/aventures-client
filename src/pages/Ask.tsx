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
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Ask AVENtures</p>
                <h1 className="mt-4 max-w-3xl font-noto-serif text-4xl text-ink sm:text-5xl">
                    Can&rsquo;t find the answer you&rsquo;re looking for? Ask AVENtures!
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-ink/60">
                    Have a question about your visa or travel plans? Send your question to AVENtures and our team will
                    be happy to assist.
                </p>

                <div className="mt-10">
                    <AskAventures
                        form={askForm}
                        email={site?.email}
                        suggestions={<AskSuggestions faqs={faqs} question={askForm.fields.question} />}
                    />
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
