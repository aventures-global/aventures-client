import { Download, FileText, FileWarning } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { apiFetch, getApiUrl } from '../lib/apiClient'
import type { SiteInfo } from '../types/content'

type ShareLookup = {
    share: {
        id: string
        expiresAt: string
        viewCount: number
        maxViews: number | null
        quotation: {
            number: string
            title: string
            status: string
            currency: string
            totalCents: number
            total: string
            customerMessage: string | null
            validUntil: string | null
            hasPdf: boolean
            items: Array<{
                title: string
                description: string | null
                quantity: number
                unitCents: number
                lineCents: number
                isOptional: boolean
                selected: boolean
                unit: string
                line: string
            }>
        }
    }
}

export default function SharedQuotation() {
    const { token = '' } = useParams()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [data, setData] = useState<ShareLookup | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
        void apiFetch<ShareLookup>(`/api/quotation-shares/${encodeURIComponent(token)}`)
            .then((result) => {
                if (!cancelled) setData(result)
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setData(null)
                    setError(err.message || 'This share link is unavailable')
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => {
            cancelled = true
        }
    }, [token])

    const quote = data?.share.quotation

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo
                title="Shared quotation — AVENtures"
                description="Review a quotation shared with you by AVENtures."
                path={`/quotes/shared/${token}`}
                noIndex
            />
            <Header />
            <main className="flex-1">
                <div className="site-container pb-24 pt-36 sm:pt-40">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">
                        Shared quotation
                    </p>
                    <h1 className="mt-4 font-noto-serif text-4xl text-royal sm:text-5xl">Your quote</h1>

                    <div className="mt-10 max-w-2xl border border-royal/10 bg-white px-6 py-10 shadow-[0_12px_35px_rgba(22,55,101,0.07)]">
                        {loading ? (
                            <div className="h-28 animate-pulse bg-royal/10" />
                        ) : error || !quote ? (
                            <div className="text-center">
                                <FileWarning size={28} className="mx-auto text-royal/45" strokeWidth={1.4} />
                                <p className="mt-4 font-medium text-royal">Link unavailable</p>
                                <p className="mt-2 text-sm text-ink/55">
                                    {error ?? 'This share link is invalid, expired, or revoked.'}
                                </p>
                                <Link
                                    to="/"
                                    className="mt-6 inline-flex text-sm text-royal underline decoration-gold-deep underline-offset-4"
                                >
                                    Back to home
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-start gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal/[0.07] text-royal">
                                        <FileText size={20} strokeWidth={1.4} />
                                    </span>
                                    <div className="min-w-0">
                                        <h2 className="font-medium text-royal">
                                            {quote.number} · {quote.title}
                                        </h2>
                                        <p className="mt-1 text-sm text-ink/55">
                                            Total {quote.total}
                                            {quote.validUntil
                                                ? ` · valid until ${new Date(quote.validUntil).toLocaleDateString()}`
                                                : ''}
                                            {' · '}expires {new Date(data!.share.expiresAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {quote.customerMessage ? (
                                    <p className="mt-6 text-sm leading-relaxed text-ink/70">{quote.customerMessage}</p>
                                ) : null}

                                <ul className="mt-6 space-y-3 border-t border-royal/10 pt-6">
                                    {quote.items.map((item, index) => (
                                        <li key={`${item.title}-${index}`} className="text-sm">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-royal">
                                                    {item.title}
                                                    {item.isOptional ? ' (optional)' : ''}
                                                    {item.isOptional && !item.selected ? ' — not selected' : ''}
                                                </span>
                                                <span className="shrink-0 tabular-nums text-ink/70">{item.line}</span>
                                            </div>
                                            {item.description ? (
                                                <p className="mt-1 text-ink/50">{item.description}</p>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>

                                {quote.hasPdf ? (
                                    <a
                                        href={getApiUrl(
                                            `/api/quotation-shares/${encodeURIComponent(token)}/pdf`,
                                        )}
                                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal"
                                    >
                                        <Download size={16} strokeWidth={1.6} />
                                        Download PDF
                                    </a>
                                ) : (
                                    <p className="mt-8 text-center text-sm text-ink/50">
                                        PDF is not available for this quotation yet.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {site ? <Footer site={site} /> : null}
        </div>
    )
}
