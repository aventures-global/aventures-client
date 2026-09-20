import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMerch, getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import { useAuth } from '../lib/auth'
import type { MerchProduct, SiteInfo } from '../types/content'

export default function Shop() {
  const { isLoggedIn } = useAuth()
  const [products, setProducts] = useState<MerchProduct[] | null>(null)
  const [site, setSite] = useState<SiteInfo | null>(null)
  const shopSeo = getSeoForPath('/shop')

  useEffect(() => {
    void Promise.all([getMerch(), getSite()]).then(([merchData, siteData]) => {
      setProducts(merchData)
      setSite(siteData)
    })
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-ink">
      <Seo title={shopSeo.title} description={shopSeo.description} path="/shop" />
      <Header />

      <main className="flex-1">
        <div className="site-container pt-32 pb-8 sm:pt-36 sm:pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
            <div className="min-w-0 max-w-md">
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Merchandise</p>
              <h1 className="mt-3 font-serif text-4xl text-gold-gradient sm:text-5xl">
                Shop
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-silver/70">
                Apparel, totes, and destination photography prints — browse freely.
                Adding to cart or purchasing requires an account.
              </p>
            </div>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 font-serif text-sm text-white transition-colors hover:border-gold/50 hover:text-gold md:mt-9"
              >
                <ShoppingBag size={15} strokeWidth={1.4} aria-hidden />
                Log in to shop
                <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>

        <div className="site-container pb-20">
          {!products ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/3] skeleton-shimmer rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
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
                      className="group relative block overflow-hidden rounded-xl border border-white/8 transition-colors duration-500 hover:border-gold/40"
                    >
                      <SafeImage
                        src={product.coverImage}
                        alt={product.name}
                        className="aspect-[4/3] w-full"
                        imgClassName="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                      <span
                        aria-hidden
                        className="absolute right-3.5 top-3.5 text-gold/40 transition duration-500 group-hover:text-gold"
                      >
                        <ArrowUpRight size={18} strokeWidth={1.3} />
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                          {product.category}
                        </p>
                        <h2 className="mt-1.5 font-serif text-xl leading-snug text-white">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-sm text-white/70">{product.tagline}</p>
                        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.16em] text-gold/75">
                          <span>{product.inStock ? 'In stock' : 'Sold out'}</span>
                          <span>{product.price}</span>
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
