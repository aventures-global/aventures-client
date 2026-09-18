import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSite, getTours } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import SafeImage from '../components/ui/SafeImage'
import type { SiteInfo, Tour } from '../types/content'

const coverFocus: Record<string, string> = {
  'philippine-discovery': 'object-[center_12%]',
  'cebu-tour': 'object-[center_38%]',
  'boracay-serenity': 'object-[82%_58%]',
}

export default function Destinations() {
  const [tours, setTours] = useState<Tour[] | null>(null)
  const [site, setSite] = useState<SiteInfo | null>(null)

  useEffect(() => {
    void Promise.all([getTours(), getSite()]).then(([tourData, siteData]) => {
      setTours(tourData)
      setSite(siteData)
    })
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-ink">
      <Header />

      <main className="flex-1">
        <div className="site-container pt-32 pb-10 sm:pt-36 sm:pb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Signature journeys
          </p>
          <h1 className="mt-3 font-serif text-4xl text-gold-gradient sm:text-5xl">
            Destinations
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-silver/70">
            Private itineraries across the Philippines, Asia, and beyond — paced
            for discovery, comfort, and seamless planning.
          </p>
        </div>

        <div className="site-container pb-20">
          {!tours ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] skeleton-shimmer rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                >
                  <Link
                    to={`/destinations/${tour.slug}`}
                    className="group relative block overflow-hidden rounded-xl border border-white/8 transition-colors duration-500 hover:border-gold/40"
                  >
                    <SafeImage
                      src={tour.coverImage}
                      alt={tour.title}
                      className="aspect-[4/3] w-full"
                      imgClassName={`object-cover ${coverFocus[tour.id] ?? 'object-center'} transition duration-700 group-hover:scale-[1.04]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                    <span
                      aria-hidden
                      className="absolute right-3.5 top-3.5 text-gold/40 transition duration-500 group-hover:text-gold"
                    >
                      <ArrowUpRight size={18} strokeWidth={1.3} />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                        {tour.location}
                      </p>
                      <h2 className="mt-1.5 font-serif text-xl leading-snug text-white">
                        {tour.title}
                      </h2>
                      <p className="mt-1 text-sm text-white/70">{tour.tagline}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.16em] text-gold/75">
                        <span>{tour.duration}</span>
                        <span>{tour.startingPrice}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {site && <Footer site={site} />}
    </div>
  )
}
