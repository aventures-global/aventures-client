import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getMerch, getMerchCategories, getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import { useAuth } from '../lib/auth'
import type { MerchCategory, MerchProduct, SiteInfo } from '../types/content'

export default function Shop() {
    const { isLoggedIn } = useAuth()
    const [products, setProducts] = useState<MerchProduct[] | null>(null)
    const [categories, setCategories] = useState<MerchCategory[]>([])
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const shopSeo = getSeoForPath('/shop')

    useEffect(() => {
        void Promise.all([getMerch(), getMerchCategories().catch(() => []), getSite()]).then(
            ([merchData, categoryData, siteData]) => {
                setProducts(merchData)
                setCategories(categoryData)
                setSite(siteData)
            },
        )
    }, [])

    const usedCategories = categories.filter((category) =>
        products?.some((product) => product.categoryId === category.id),
    )
    const param = searchParams.get('category')
    const activeCategory = usedCategories.some((category) => category.id === param) ? param : null
    const visibleProducts = activeCategory
        ? products?.filter((product) => product.categoryId === activeCategory)
        : products

    const selectCategory = (id: string | null) => {
        setSearchParams(id ? { category: id } : {}, { replace: true, preventScrollReset: true })
    }

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={shopSeo.title} description={shopSeo.description} path="/shop" />
            <Header />

            <main className="flex-1">
                <div className="site-container pb-12 pt-36 sm:pb-16 sm:pt-40">
                    <div className="flex flex-col gap-8 border-b border-royal/15 pb-12 md:flex-row md:items-end md:justify-between md:gap-12">
                        <div className="min-w-0 max-w-2xl">
                            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">The AVENTURES collection</p>
                            <h1 className="mt-4 font-noto-serif text-5xl text-royal sm:text-6xl">
                                Bring the journey home.
                            </h1>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/65 sm:text-base">
                                Apparel, totes, and destination photography prints — browse freely.
                                Adding to cart or purchasing requires an account.
                            </p>
                        </div>
                        {!isLoggedIn ? (
                            <Link
                                to="/login"
                                className="inline-flex shrink-0 items-center justify-center gap-2 border border-royal px-5 py-3 text-sm text-royal transition-colors hover:bg-royal hover:text-cream"
                            >
                                <ShoppingBag size={15} strokeWidth={1.4} aria-hidden />
                                Log in to shop
                                <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden />
                            </Link>
                        ) : null}
                    </div>
                </div>

                <div className="site-container pb-24">
                    {usedCategories.length > 1 ? (
                        <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
                            {[{ id: null, name: 'All' }, ...usedCategories].map((category) => {
                                const selected = activeCategory === category.id
                                return (
                                    <button
                                        key={category.id ?? 'all'}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => selectCategory(category.id)}
                                        className={`rounded-full border px-4 py-2 text-xs font-medium transition ${selected ? 'border-royal bg-royal text-white shadow-sm' : 'border-royal/20 bg-white/65 text-royal/75 hover:border-royal/45 hover:bg-white/85 hover:text-royal'}`}
                                    >
                                        {category.name}
                                    </button>
                                )
                            })}
                        </div>
                    ) : null}
                    {!visibleProducts ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-[4/3] animate-pulse bg-royal/10" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <AnimatePresence mode="popLayout">
                                {visibleProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ delay: Math.min(index, 6) * 0.04, duration: 0.4 }}
                                    >
                                        <Link
                                            to={`/shop/${product.slug}`}
                                            className="group block overflow-hidden border border-royal/10 bg-white shadow-[0_12px_35px_rgba(22,55,101,0.07)] transition duration-500 hover:-translate-y-1 hover:border-gold-deep/35 hover:shadow-[0_18px_45px_rgba(22,55,101,0.13)]"
                                        >
                                            <SafeImage
                                                src={product.coverImage}
                                                alt={product.name}
                                                className="aspect-[4/3] w-full overflow-hidden bg-oat"
                                                imgClassName="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                                            />
                                            <div className="p-5 sm:p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold-deep">{product.category}</p>
                                                        <h2 className="mt-2 font-noto-serif text-2xl leading-snug text-royal">{product.name}</h2>
                                                    </div>
                                                    <span aria-hidden className="mt-1 text-royal/35 transition duration-300 group-hover:text-gold-deep"><ArrowUpRight size={19} strokeWidth={1.4} /></span>
                                                </div>
                                                <p className="mt-2 text-sm leading-6 text-ink/55">{product.tagline}</p>
                                                <div className="mt-5 flex items-center justify-between border-t border-royal/10 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-royal/60">
                                                    <span>{product.inStock ? 'In stock' : 'Sold out'}</span>
                                                    <span className="font-noto-serif text-lg normal-case tracking-normal text-royal">{product.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            {site && <Footer site={site} />}
        </div>
    )
}
