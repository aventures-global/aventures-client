import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSite, getTours } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import DestinationsSearch from '../components/tours/DestinationsSearch'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import { useStickyCover } from '../lib/useStickyCover'
import { DEFAULT_FILTERS, filterAndSortTours, getTourRegion, type TourRegion } from '../lib/tourSearch'
import type { SiteInfo, Tour } from '../types/content'

const coverFocus: Record<string, string> = {
    'philippine-discovery': 'object-[center_45%]',
    'cebu-tour': 'object-[35%_50%]',
    'boracay-serenity': 'object-[center_58%]',
}

export default function Destinations() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [tours, setTours] = useState<Tour[] | null>(null)
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [ascending, setAscending] = useState(true)
    const [selectedRegions, setSelectedRegions] = useState<TourRegion[]>([])
    const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
    const deferredQuery = useDeferredValue(query)
    const initialGridAnimationDone = useRef(false)
    const reduceMotion = useReducedMotion()
    const [finderRef, finderTop] = useStickyCover<HTMLElement>()

    useEffect(() => {
        void Promise.all([getTours(), getSite()]).then(([tourData, siteData]) => {
            setTours(tourData)
            setSite(siteData)
        })
    }, [])

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setSearchParams((current) => {
                const next = new URLSearchParams(current)
                const value = query.trim()
                if (value) next.set('q', value)
                else next.delete('q')
                return next
            }, { replace: true })
        }, 300)
        return () => window.clearTimeout(timeout)
    }, [query, setSearchParams])

    const visibleTours = useMemo(() => {
        if (!tours) return []
        const filtered = filterAndSortTours(tours, { ...DEFAULT_FILTERS, query: deferredQuery })
            .filter((tour) => selectedRegions.length === 0 || selectedRegions.includes(getTourRegion(tour) as TourRegion))
        return filtered.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
    }, [tours, deferredQuery, ascending, selectedRegions])
    const clearFilters = () => {
        setQuery('')
        setSelectedRegions([])
    }
    const destinationsSeo = getSeoForPath('/destinations')

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={destinationsSeo.title} description={destinationsSeo.description} path="/destinations" />
            <Header />
            <main className="flex-1">
                <section
                    ref={finderRef}
                    className={`${reduceMotion ? 'relative' : 'sticky z-0'} flex h-[490px] has-[[aria-expanded=true]]:z-20 items-center bg-oat pt-20`}
                    style={reduceMotion ? undefined : { top: finderTop }}
                    aria-labelledby="destination-finder-title"
                >
                    <img
                        src="/assets/images/europe-journeys.jpg?v=1"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,49,0.23),rgba(10,35,70,0.32),rgba(5,18,38,0.45))]" />
                    <div className="site-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto flex h-[260px] max-w-6xl flex-col justify-center rounded-xl border border-royal/10 bg-white/55 px-5 shadow-[0_20px_60px_rgba(22,55,101,0.08)] backdrop-blur-sm sm:px-8"
                        >
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9b7512]">Find your next AVENtures</p>
                            <h1 id="destination-finder-title" className="mt-2 whitespace-nowrap font-noto-serif text-[clamp(1.15rem,5.7vw,1.875rem)] leading-tight text-royal sm:text-4xl">Where would you like to go?</h1>
                            <div className="mt-5">
                                <DestinationsSearch query={query} onQueryChange={setQuery} selectedRegions={selectedRegions} onRegionsChange={setSelectedRegions} />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="relative z-10 bg-white pb-36 pt-24 shadow-[0_-24px_50px_-30px_rgba(22,55,101,0.35)] sm:pb-44 sm:pt-32" aria-labelledby="journeys-title">
                    <div className="site-container flex items-end justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">Curated journeys</p>
                            <h2 id="journeys-title" className="mt-2 font-noto-serif text-3xl text-ink sm:text-4xl">Explore destinations</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setAscending((value) => !value)}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#9b7512] transition-colors hover:bg-royal/5 hover:text-royal"
                            aria-label={ascending ? 'Currently sorted A to Z. Sort Z to A' : 'Currently sorted Z to A. Sort A to Z'}
                            title={ascending ? 'A–Z' : 'Z–A'}
                        >
                            {ascending ? <ArrowDown size={19} strokeWidth={1.7} /> : <ArrowUp size={19} strokeWidth={1.7} />}
                        </button>
                    </div>

                    {!tours ? (
                        <div className="site-container mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-royal/10" />)}</div>
                    ) : visibleTours.length === 0 ? (
                        <div className="site-container mt-7"><div className="border border-royal/10 bg-white/45 px-6 py-16 text-center"><p className="font-noto-serif text-2xl text-royal">No journeys matched</p><p className="mt-3 text-sm text-ink/60">Try another place or broaden your filters.</p>{(query.trim() || selectedRegions.length > 0) && <button type="button" onClick={clearFilters} className="mt-6 text-sm font-medium text-[#9b7512] hover:underline">Clear filters</button>}</div></div>
                    ) : (
                        <motion.div
                            className="site-container mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                            initial={initialGridAnimationDone.current ? false : 'hidden'}
                            animate="visible"
                            onAnimationComplete={() => {
                                initialGridAnimationDone.current = true
                            }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
                        >
                                {visibleTours.map((tour) => (
                                    <motion.article key={tour.id} initial={initialGridAnimationDone.current ? false : undefined} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}>
                                        <Link to={`/destinations/${tour.slug}`} className="group relative block overflow-hidden rounded-xl border border-royal/10 shadow-[0_12px_35px_rgba(22,55,101,0.08)] transition duration-500 hover:border-[#9b7512]/40 hover:shadow-[0_18px_45px_rgba(22,55,101,0.14)]">
                                            <SafeImage src={tour.coverImage} alt={tour.title} className="aspect-[4/3] w-full" imgClassName={`object-cover ${coverFocus[tour.id] ?? 'object-center'} transition duration-700 group-hover:scale-[1.01]`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
                                            <span aria-hidden className="absolute right-3.5 top-3.5 text-gold/45 transition duration-500 group-hover:text-gold"><ArrowUpRight size={18} strokeWidth={1.3} /></span>
                                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{tour.location}</p>
                                                <h3 className="mt-1.5 font-noto-serif text-xl leading-snug text-white">{tour.title}</h3>
                                                <p className="mt-1 text-sm text-white/70">{tour.tagline}</p>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                        </motion.div>
                    )}
                </section>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
