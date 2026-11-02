import { Download, FileText, FileWarning } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { apiFetch, getApiUrl } from '../lib/apiClient'
import { useAuth } from '../lib/auth'
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
            booking: {
                paymentStatus: string
                currency: string
                remainingCents: number
                remaining: string
                payable: boolean
            } | null
        }
    }
}

export default function SharedQuotation() {
    const { token = '' } = useParams()
    const { token: authToken, isLoggedIn, logout } = useAuth()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [data, setData] = useState<ShareLookup | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [paying, setPaying] = useState(false)
    const [payError, setPayError] = useState<string | null>(null)
    const [wrongAccount, setWrongAccount] = useState(false)

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
    const booking = quote?.booking
    const loginNext = `/quotes/shared/${encodeURIComponent(token)}`

    async function handlePay() {
        setPayError(null)
        setWrongAccount(false)

        if (!isLoggedIn || !authToken) {
            window.location.assign(`/login?next=${encodeURIComponent(loginNext)}`)
            return
        }

        setPaying(true)
        try {
            const result = await apiFetch<{ url: string }>(
                `/api/quotation-shares/${encodeURIComponent(token)}/checkout-session`,
                { method: 'POST', token: authToken },
            )
            window.location.assign(result.url)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unable to start payment'
            if (message.toLowerCase().includes('issued to') || message.toLowerCase().includes('forbidden')) {
                setWrongAccount(true)
            }
            setPayError(message)
            setPaying(false)
        }
    }

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

                                {booking?.payable ? (
                                    <div className="mt-8 border-t border-royal/10 pt-6">
                                        <p className="text-sm text-ink/60">
                                            Remaining balance{' '}
                                            <span className="font-medium text-royal">{booking.remaining}</span>
                                        </p>
                                        <button
                                            type="button"
                                            disabled={paying}
                                            onClick={() => void handlePay()}
                                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal disabled:cursor-wait disabled:opacity-70"
                                        >
                                            {paying
                                                ? 'Redirecting…'
                                                : isLoggedIn
                                                  ? `Pay remaining ${booking.remaining}`
                                                  : 'Sign in to pay'}
                                        </button>
                                        {!isLoggedIn ? (
                                            <p className="mt-3 text-center text-xs text-ink/50">
                                                Use the account this quotation was issued to.
                                            </p>
                                        ) : null}
                                        {wrongAccount ? (
                                            <div className="mt-4 rounded-[3px] border border-royal/15 bg-royal/[0.04] px-4 py-3 text-sm text-ink/70">
                                                <p>
                                                    This quotation belongs to a different account. Sign out and sign in
                                                    with the assigned customer account to pay.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="mt-2 text-sm font-medium text-royal underline decoration-gold-deep underline-offset-4"
                                                    onClick={() =>
                                                        void logout().then(() => {
                                                            window.location.assign(
                                                                `/login?next=${encodeURIComponent(loginNext)}`,
                                                            )
                                                        })
                                                    }
                                                >
                                                    Switch account
                                                </button>
                                            </div>
                                        ) : null}
                                        {payError && !wrongAccount ? (
                                            <p className="mt-3 text-center text-sm text-red-800">{payError}</p>
                                        ) : null}
                                    </div>
                                ) : booking && booking.remainingCents <= 0 ? (
                                    <p className="mt-8 text-center text-sm text-ink/55">This quotation is paid in full.</p>
                                ) : (
                                    <p className="mt-8 text-center text-sm text-ink/50">
                                        Online payment is not available for this quotation yet.
                                    </p>
                                )}

                                {quote.hasPdf ? (
                                    <a
                                        href={getApiUrl(
                                            `/api/quotation-shares/${encodeURIComponent(token)}/pdf`,
                                        )}
                                        className={`inline-flex w-full items-center justify-center gap-2 rounded-[3px] px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                                            booking?.payable
                                                ? 'mt-3 border border-royal/20 bg-transparent text-royal hover:border-royal/40'
                                                : 'mt-8 bg-royal text-cream hover:bg-gold-deep hover:text-royal'
                                        }`}
                                    >
                                        <Download size={16} strokeWidth={1.6} />
                                        Download PDF
                                    </a>
                                ) : !booking?.payable ? (
                                    <p className="mt-8 text-center text-sm text-ink/50">
                                        PDF is not available for this quotation yet.
                                    </p>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {site ? <Footer site={site} /> : null}
        </div>
    )
}
