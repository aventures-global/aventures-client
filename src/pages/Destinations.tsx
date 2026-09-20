import { ArrowUpRight, Compass } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSite, getTours } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import DestinationsSearch from '../components/tours/DestinationsSearch'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import {
  filterAndSortTours,
  filtersFromSearchParams,
  hasActiveFilters,
  searchParamsFromFilters,
  type TourSearchFilters,
} from '../lib/tourSearch'
import type { SiteInfo, Tour } from '../types/content'

const coverFocus: Record<string, string> = {
  'philippine-discovery': 'object-[center_45%]',
  'cebu-tour': 'object-[35%_50%]',
  'boracay-serenity': 'object-[center_58%]',
  'south-korea-kwave': 'object-[center_45%]',
  'japan-tradition': 'object-[center_48%]',
  'usa-dream-big': 'object-[center_48%]',
  'thailand-calling': 'object-[center_45%]',
  'indonesia-escape': 'object-[center_48%]',
  'europe-journeys': 'object-[center_45%]',
}

export default function Destinations() {
  const [tours, setTours] = useState<Tour[] | null>(null)
  const [site, setSite] = useState<SiteInfo | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  )

  useEffect(() => {
    void Promise.all([getTours(), getSite()]).then(([tourData, siteData]) => {
      setTours(tourData)
      setSite(siteData)
    })
  }, [])

  const visibleTours = useMemo(
    () => (tours ? filterAndSortTours(tours, filters) : []),
    [tours, filters],
  )

  const updateFilters = (next: TourSearchFilters) => {
    const params = searchParamsFromFilters(next)
    setSearchParams(params, { replace: true })
  }

  const clearFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const destinationsSeo = getSeoForPath('/destinations')

  return (
    <div className="flex min-h-svh flex-col bg-ink">
      <Seo
        title={destinationsSeo.title}
        description={destinationsSeo.description}
        path="/destinations"
      />
      <Header />

      <main className="flex-1">
        <div className="site-container pt-32 pb-8 sm:pt-36 sm:pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
            <div className="min-w-0 max-w-md">
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
                Signature journeys
              </p>
              <h1 className="mt-3 font-serif text-4xl text-gold-gradient sm:text-5xl">
                Destinations
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-silver/70">
                Private itineraries across the Philippines, Asia, the USA, and
                beyond — paced for discovery, comfort, and seamless planning.
              </p>
            </div>
            <Link
              to="/custom-tour"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 font-serif text-sm text-white transition-colors hover:border-gold/50 hover:text-gold md:mt-9"
            >
              <Compass size={15} strokeWidth={1.4} aria-hidden />
              Book a custom tour
              <ArrowUpRight size={14} strokeWidth={1.4} aria-hidden />
            </Link>
          </div>

          <div className="mt-8 max-w-3xl">
            <DestinationsSearch
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              resultCount={tours ? visibleTours.length : 0}
              totalCount={tours?.length ?? 0}
            />
          </div>
        </div>

        <div className="site-container pb-20">
          {!tours ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] skeleton-shimmer rounded-xl" />
              ))}
            </div>
          ) : visibleTours.length === 0 ? (
            <div className="rounded-xl border border-white/10 px-6 py-16 text-center">
              <p className="font-serif text-2xl text-white">No journeys matched</p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-silver/70">
                Try another place name, broaden the region, or clear filters to see
                the full collection.
              </p>
              {hasActiveFilters(filters) ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 text-sm font-medium text-gold transition hover:text-ivory"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: Math.min(index, 6) * 0.04, duration: 0.4 }}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
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
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {site && <Footer site={site} />}
    </div>
  )
}
