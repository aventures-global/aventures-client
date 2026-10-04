import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMerchBySlug, getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import MerchGallery from '../components/shop/MerchGallery'
import { useAuth } from '../lib/auth'
import { setPendingCartAction } from '../lib/cart'
import { useCart } from '../lib/cartContext'
import type { MerchProduct, SiteInfo } from '../types/content'
import NotFound from './NotFound'

export default function MerchDetail() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    const { addItem } = useCart()
    const [product, setProduct] = useState<MerchProduct | null | undefined>(undefined)
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [size, setSize] = useState<string>('')
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        if (!slug) {
            setProduct(null)
            return
        }
        setProduct(undefined)
        setAdded(false)
        void Promise.all([getMerchBySlug(slug), getSite()]).then(([merchData, siteData]) => {
            setProduct(merchData)
            setSite(siteData)
            if (merchData?.sizes?.length) {
                setSize(merchData.sizes[0])
            } else {
                setSize('')
            }
            setQty(1)
        })
    }, [slug])

    if (product === undefined) {
        return (
            <div className="luxury-paper font-poppins min-h-svh">
                <Header />
                <div className="site-container grid gap-10 pb-20 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                    <div className="aspect-[3/4] animate-pulse bg-royal/10" />
                    <div className="space-y-4 pt-4">
                        <div className="h-4 w-28 animate-pulse bg-royal/10" />
                        <div className="h-8 w-2/3 animate-pulse bg-royal/10" />
                        <div className="h-4 w-full animate-pulse bg-royal/10" />
                        <div className="h-4 w-5/6 animate-pulse bg-royal/10" />
                    </div>
                </div>
            </div>
        )
    }

    if (product === null) {
        return <NotFound />
    }

    const isPhotography = product.category === 'Photography'
    const galleryImages =
        product.gallery.length > 0 ? product.gallery : [product.coverImage]

    function requireAuthThenCart(goCheckoutHint: boolean) {
        const action = {
            productId: product!.id,
            qty,
            size: size || undefined,
        }

        if (!isLoggedIn) {
            setPendingCartAction(action)
            navigate(`/login?next=${encodeURIComponent(`/shop/${product!.slug}`)}`)
            return
        }

        addItem(action.productId, action.qty, action.size).then(() => {
            if (goCheckoutHint) {
                navigate('/cart')
                return
            }
            setAdded(true)
        })
    }

    return (
        <div className="luxury-paper font-poppins min-h-svh max-w-full overflow-x-clip">
            <Seo
                title={`${product.name} — AVENtures Shop`}
                description={product.tagline}
                path={`/shop/${product.slug}`}
                image={product.coverImage}
            />
            <Header />

            <main className="site-container min-w-0 pb-20 pt-28 sm:pt-32">
                <Link
                    to="/shop"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-royal/65 transition hover:text-gold-deep"
                >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                    Back to shop
                </Link>

                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
                    <MerchGallery name={product.name} images={galleryImages} />

                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                            {product.category}
                        </p>
                        <h1 className="mt-2 font-noto-serif text-4xl text-royal sm:text-5xl">
                            {product.name}
                        </h1>
                        <p className="mt-3 text-base text-ink/55">{product.tagline}</p>
                        <p className="mt-6 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
                            {product.description}
                        </p>
                        <p className="mt-7 font-noto-serif text-3xl text-royal">{product.price}</p>
                        <p className="mt-2 text-sm text-ink/50">
                            {product.inStock ? 'In stock · demo catalog' : 'Sold out'}
                            {isPhotography ? ' · archival matte' : ''}
                        </p>

                        <aside className="mt-8 border border-royal/10 bg-white p-6 shadow-[0_16px_45px_rgba(22,55,101,0.08)] sm:p-7">
                            {product.sizes?.length ? (
                                <div>
                                    <p className="text-sm font-medium text-royal/75">
                                        {isPhotography ? 'Print size' : 'Size'}
                                    </p>
                                    <div
                                        className="mt-2 flex flex-wrap gap-2"
                                        role="group"
                                        aria-label={isPhotography ? 'Print size' : 'Size'}
                                    >
                                        {product.sizes.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setSize(option)}
                                                aria-pressed={size === option}
                                                className={`rounded-lg border px-3.5 py-2 text-sm transition ${
                                                    size === option
                                                        ? 'border-royal bg-royal text-cream'
                                                        : 'border-royal/15 text-royal/70 hover:border-gold-deep/60'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <div className={product.sizes?.length ? 'mt-5' : ''}>
                                <label htmlFor="merch-qty" className="text-sm font-medium text-royal/75">
                                    Quantity
                                </label>
                                <input
                                    id="merch-qty"
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={qty}
                                    onChange={(event) =>
                                        setQty(Math.max(1, Math.min(10, Number(event.target.value) || 1)))
                                    }
                                    className="mt-2 w-24 border border-royal/15 bg-oat px-3 py-2.5 text-sm text-ink outline-none transition focus:border-gold-deep"
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <button
                                    type="button"
                                    disabled={!product.inStock}
                                    onClick={() => requireAuthThenCart(false)}
                                    className="bg-royal px-6 py-3 text-sm text-cream transition hover:bg-gold-deep hover:text-royal disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    disabled={!product.inStock}
                                    onClick={() => requireAuthThenCart(true)}
                                    className="border border-royal px-6 py-3 text-sm text-royal transition hover:bg-royal hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Buy
                                </button>
                            </div>

                            {added ? (
                                <p className="mt-4 text-sm text-royal">
                                    Added to cart.{' '}
                                    <Link to="/cart" className="underline decoration-gold-deep underline-offset-4 hover:text-gold-deep">
                                        View cart
                                    </Link>
                                </p>
                            ) : null}

                            {!isLoggedIn ? (
                                <p className="mt-5 text-xs leading-relaxed text-ink/50">
                                    You can browse without an account. Add to cart and Buy will ask you to
                                    log in (demo — any details work).
                                </p>
                            ) : null}
                        </aside>
                    </div>
                </div>
            </main>

            {site && <Footer site={site} />}
        </div>
    )
}
