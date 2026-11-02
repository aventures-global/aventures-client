import { CheckCircle2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import type { SiteInfo } from '../types/content'

export default function PaymentComplete() {
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status') === 'success' ? 'success' : 'cancel'
    const token = searchParams.get('token')
    const [site, setSite] = useState<SiteInfo | null>(null)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    const shareHref = token ? `/quotes/shared/${encodeURIComponent(token)}` : null

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo
                title={status === 'success' ? 'Payment received — AVENtures' : 'Payment cancelled — AVENtures'}
                description="Stripe Checkout return page for quotation payments."
                path="/payments/complete"
                noIndex
            />
            <Header />
            <main className="flex-1">
                <div className="site-container pb-24 pt-36 sm:pt-40">
                    <div className="mx-auto max-w-lg border border-royal/10 bg-white px-6 py-12 text-center shadow-[0_12px_35px_rgba(22,55,101,0.07)]">
                        {status === 'success' ? (
                            <>
                                <CheckCircle2 size={36} className="mx-auto text-royal" strokeWidth={1.4} />
                                <h1 className="mt-5 font-noto-serif text-3xl text-royal">Payment received</h1>
                                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                                    Thank you. Your payment is being confirmed. If the balance does not update within a
                                    few moments, refresh your quotation or contact AVENtures.
                                </p>
                            </>
                        ) : (
                            <>
                                <XCircle size={36} className="mx-auto text-royal/50" strokeWidth={1.4} />
                                <h1 className="mt-5 font-noto-serif text-3xl text-royal">Payment cancelled</h1>
                                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                                    No charge was made. You can return to your quotation and try again whenever you are
                                    ready.
                                </p>
                            </>
                        )}

                        <div className="mt-8 flex flex-col gap-3">
                            {shareHref ? (
                                <Link
                                    to={shareHref}
                                    className="inline-flex w-full items-center justify-center rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal"
                                >
                                    Back to quotation
                                </Link>
                            ) : null}
                            <Link
                                to="/"
                                className="text-sm text-royal underline decoration-gold-deep underline-offset-4"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            {site ? <Footer site={site} /> : null}
        </div>
    )
}
