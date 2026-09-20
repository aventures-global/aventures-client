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
      <div className="min-h-svh bg-ink">
        <Header />
        <div className="site-container grid gap-10 pb-20 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="aspect-[3/4] skeleton-shimmer rounded-2xl" />
          <div className="space-y-4 pt-4">
            <div className="h-4 w-28 skeleton-shimmer rounded" />
            <div className="h-8 w-2/3 skeleton-shimmer rounded" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-5/6 skeleton-shimmer rounded" />
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

    addItem(action.productId, action.qty, action.size)
    if (goCheckoutHint) {
      navigate('/cart')
      return
    }
    setAdded(true)
  }

  return (
    <div className="min-h-svh max-w-full overflow-x-clip bg-ink">
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
          className="mb-8 inline-flex items-center gap-2 text-sm text-silver/80 transition hover:text-gold"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <MerchGallery name={product.name} images={galleryImages} />

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-gold-gradient sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-silver/75">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-silver/90 sm:text-base">
              {product.description}
            </p>
            <p className="mt-6 font-serif text-2xl text-gold-gradient">{product.price}</p>
            <p className="mt-2 text-sm text-silver/60">
              {product.inStock ? 'In stock · demo catalog' : 'Sold out'}
              {isPhotography ? ' · archival matte' : ''}
            </p>

            <aside className="mt-8 rounded-2xl border border-white/10 bg-ink-card/50 p-6 sm:p-7">
              {product.sizes?.length ? (
                <div>
                  <p className="text-sm text-silver/80">
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
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-white/15 text-silver/80 hover:border-gold/40'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className={product.sizes?.length ? 'mt-5' : ''}>
                <label htmlFor="merch-qty" className="text-sm text-silver/80">
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
                  className="mt-2 w-24 rounded-lg border border-white/15 bg-ink-soft px-3 py-2.5 text-sm text-white outline-none focus:border-gold/60"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => requireAuthThenCart(false)}
                  className="btn-gold rounded-xl px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => requireAuthThenCart(true)}
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm text-white transition hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buy
                </button>
              </div>

              {added ? (
                <p className="mt-4 text-sm text-gold">
                  Added to cart.{' '}
                  <Link to="/cart" className="underline hover:text-ivory">
                    View cart
                  </Link>
                </p>
              ) : null}

              {!isLoggedIn ? (
                <p className="mt-5 text-xs leading-relaxed text-silver/55">
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
