import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import { useAuth } from '../lib/auth'
import { formatMoney, parsePrice } from '../lib/cart'
import { useCart } from '../lib/cartContext'
import type { SiteInfo } from '../types/content'

const primaryButtonClass =
    'inline-flex items-center justify-center gap-2 rounded-[3px] bg-royal px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-gold-deep hover:text-royal'

export default function Cart() {
    const { isLoggedIn } = useAuth()
    const { lines, updateQty, removeItem, isLoading } = useCart()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const cartSeo = getSeoForPath('/cart')

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    const rows = useMemo(
        () => lines.filter((line) => Boolean(line.product)),
        [lines],
    )

    const subtotal = useMemo(
        () =>
            rows.reduce((sum, row) => {
                if (!row.product) return sum
                return sum + parsePrice(row.product.price) * row.qty
            }, 0),
        [rows],
    )

    if (!isLoggedIn) {
        return <Navigate to="/login?next=/cart" replace />
    }

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={cartSeo.title} description={cartSeo.description} path="/cart" noIndex />
            <Header />

            <main className="flex-1">
                <div className="site-container pb-10 pt-36 sm:pt-40">
                    <Link
                        to="/shop"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-royal/65 transition hover:text-gold-deep"
                    >
                        <ArrowLeft size={16} strokeWidth={1.5} />
                        Back to shop
                    </Link>
                    <div className="border-b border-royal/15 pb-10">
                        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">The AVENTURES collection</p>
                        <h1 className="mt-4 font-noto-serif text-5xl text-royal sm:text-6xl">Your cart</h1>
                    </div>
                </div>

                <div className="site-container pb-24">
                    {isLoading ? (
                        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
                            <div className="space-y-4">
                                {[0, 1].map((i) => (
                                    <div key={i} className="h-32 animate-pulse bg-royal/10" />
                                ))}
                            </div>
                            <div className="h-56 animate-pulse bg-royal/10" />
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="mx-auto max-w-xl border border-royal/10 bg-white px-6 py-16 text-center shadow-[0_12px_35px_rgba(22,55,101,0.07)]">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal/[0.07] text-royal">
                                <ShoppingBag size={22} strokeWidth={1.3} />
                            </span>
                            <p className="mt-6 font-noto-serif text-3xl text-royal">Your cart is empty</p>
                            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-ink/60">
                                Browse the shop and add a few pieces — checkout is coming soon.
                            </p>
                            <Link to="/shop" className={`${primaryButtonClass} mt-8`}>
                                Continue shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
                            <ul className="space-y-4">
                                {rows.map((row) => {
                                    if (!row.product) return null
                                    const lineTotal = parsePrice(row.product.price) * row.qty
                                    return (
                                        <li
                                            key={row.id}
                                            className="flex gap-4 border border-royal/10 bg-white p-4 shadow-[0_12px_35px_rgba(22,55,101,0.07)] sm:gap-6 sm:p-5"
                                        >
                                            <Link
                                                to={`/shop/${row.product.slug}`}
                                                className="shrink-0 overflow-hidden bg-oat"
                                            >
                                                <SafeImage
                                                    src={row.product.coverImage}
                                                    alt={row.product.name}
                                                    className="h-24 w-24 sm:h-28 sm:w-28"
                                                    imgClassName="object-cover"
                                                />
                                            </Link>
                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold-deep">{row.product.category}</p>
                                                        <Link
                                                            to={`/shop/${row.product.slug}`}
                                                            className="mt-1 block font-noto-serif text-xl leading-snug text-royal transition hover:text-gold-deep"
                                                        >
                                                            {row.product.name}
                                                        </Link>
                                                        {row.size ? (
                                                            <p className="mt-1 text-xs text-ink/50">Size: {row.size}</p>
                                                        ) : null}
                                                        <p className="mt-1 text-sm text-ink/60">{row.product.price}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${row.product.name}`}
                                                        onClick={() => {
                                                            void removeItem(row.id)
                                                        }}
                                                        className="p-1.5 text-royal/45 transition hover:text-gold-deep"
                                                    >
                                                        <Trash2 size={16} strokeWidth={1.5} />
                                                    </button>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                                                    <div className="inline-flex items-center border border-royal/15 bg-oat">
                                                        <button
                                                            type="button"
                                                            aria-label="Decrease quantity"
                                                            className="px-2.5 py-1.5 text-royal/70 transition hover:text-gold-deep"
                                                            onClick={() => {
                                                                void updateQty(row.id, row.qty - 1)
                                                            }}
                                                        >
                                                            <Minus size={14} strokeWidth={1.5} />
                                                        </button>
                                                        <span className="min-w-8 text-center text-sm text-ink">
                                                            {row.qty}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label="Increase quantity"
                                                            className="px-2.5 py-1.5 text-royal/70 transition hover:text-gold-deep"
                                                            onClick={() => {
                                                                void updateQty(row.id, Math.min(10, row.qty + 1))
                                                            }}
                                                        >
                                                            <Plus size={14} strokeWidth={1.5} />
                                                        </button>
                                                    </div>
                                                    <p className="font-noto-serif text-lg text-royal">{formatMoney(lineTotal)}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                            <aside className="border border-royal/10 bg-white p-6 shadow-[0_12px_35px_rgba(22,55,101,0.07)] lg:sticky lg:top-28">
                                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-royal/60">Order summary</p>
                                <div className="mt-5 flex items-baseline justify-between border-t border-royal/10 pt-5">
                                    <span className="text-sm text-ink/60">Subtotal</span>
                                    <span className="font-noto-serif text-2xl text-royal">{formatMoney(subtotal)}</span>
                                </div>
                                <p className="mt-3 text-xs leading-5 text-ink/50">
                                    Shipping and tax calculated at checkout — not available in this demo.
                                </p>
                                <button
                                    type="button"
                                    disabled
                                    className={`${primaryButtonClass} mt-6 w-full cursor-not-allowed opacity-50 hover:bg-royal hover:text-cream`}
                                >
                                    Checkout coming soon
                                </button>
                                <Link
                                    to="/shop"
                                    className="mt-4 block text-center text-sm font-medium text-royal underline decoration-gold-deep/60 underline-offset-4 transition hover:text-gold-deep"
                                >
                                    Continue shopping
                                </Link>
                            </aside>
                        </div>
                    )}
                </div>
            </main>

            {site && <Footer site={site} />}
        </div>
    )
}
