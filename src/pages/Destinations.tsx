import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import DestinationsSearch from '../components/tours/DestinationsSearch'
import LoadMoreSentinel from '../components/tours/LoadMoreSentinel'
import SafeImage from '../components/ui/SafeImage'
import { getSeoForPath } from '../data/seo'
import { useTourSearch } from '../hooks/useTourSearch'
import { useTourSuggestions } from '../hooks/useTourSuggestions'
import { useStickyCover } from '../lib/useStickyCover'
import { REGION_OPTIONS, type TourRegion } from '../lib/tourSearch'
import type { SiteInfo, TourSummary } from '../types/content'

const REGION_IDS = new Set<string>(REGION_OPTIONS.filter((option) => option.id !== 'all').map((option) => option.id))

function headerHeight() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72
}

const coverFocus: Record<string, string> = {
    'philippine-discovery': 'object-[center_45%]',
    'cebu-tour': 'object-[35%_50%]',
    'boracay-serenity': 'object-[center_58%]',
}

function DestinationCard({ tour, badge }: { tour: TourSummary; badge?: string }) {
    return (
        <Link to={`/destinations/${tour.slug}`} className="group relative block overflow-hidden rounded-xl border border-royal/10 shadow-[0_12px_35px_rgba(22,55,101,0.08)] transition duration-500 hover:border-[#9b7512]/40 hover:shadow-[0_18px_45px_rgba(22,55,101,0.14)]">
            <SafeImage src={tour.coverImage} alt={tour.title} className="aspect-[4/3] w-full" imgClassName={`object-cover ${coverFocus[tour.id] ?? 'object-center'} transition duration-700 group-hover:scale-[1.01]`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
            {badge && <span className="absolute left-3.5 top-3.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">{badge}</span>}
            <span aria-hidden className="absolute right-3.5 top-3.5 text-gold/45 transition duration-500 group-hover:text-gold"><ArrowUpRight size={18} strokeWidth={1.3} /></span>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{tour.location}</p>
                <h3 className="mt-1.5 font-noto-serif text-xl leading-snug text-white">{tour.title}</h3>
                <p className="mt-1 text-sm text-white/70">{tour.tagline}</p>
            </div>
        </Link>
    )
}

export default function Destinations() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
    const [initialGridAnimationDone, setInitialGridAnimationDone] = useState(false)
    const reduceMotion = useReducedMotion()
    const [finderRef, finderTop] = useStickyCover<HTMLElement>()
    const searchBoxRef = useRef<HTMLDivElement>(null)
    const resultsRef = useRef<HTMLElement>(null)
    const resultsHeadingRef = useRef<HTMLDivElement>(null)
    const compactBarRef = useRef<HTMLDivElement>(null)
    const [showCompactSearch, setShowCompactSearch] = useState(false)

    const appliedQuery = searchParams.get('q') ?? ''
    const regionsParam = searchParams.get('regions') ?? ''
    const selectedRegions = useMemo(
        () => regionsParam.split(',').filter((region): region is TourRegion => REGION_IDS.has(region)),
        [regionsParam],
    )
    const ascending = searchParams.get('dir') !== 'desc'

    const updateParams = useCallback(
        (patch: Record<string, string | null>) => {
            setSearchParams((current) => {
                const next = new URLSearchParams(current)
                for (const [key, value] of Object.entries(patch)) {
                    if (value) next.set(key, value)
                    else next.delete(key)
                }
                return next
            }, { replace: true })
        },
        [setSearchParams],
    )

    const searchParamsKey = useMemo(
        () => ({ q: appliedQuery, regions: selectedRegions, dir: ascending ? ('asc' as const) : ('desc' as const) }),
        [appliedQuery, selectedRegions, ascending],
    )
    const { data, isPending, isError, isPlaceholderData, isFetchNextPageError, refetch, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useTourSearch(searchParamsKey)
    const visibleTours = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data])
    const total = data?.pages[0]?.total ?? 0
    const suggestions = useTourSuggestions(appliedQuery, Boolean(data) && !isPlaceholderData && total === 0)
    const suggestion = suggestions.data

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    useEffect(() => {
        const update = () => {
            const box = searchBoxRef.current
            const results = resultsRef.current
            if (!box || !results) return
            const boxBottom = box.getBoundingClientRect().bottom
            setShowCompactSearch(results.getBoundingClientRect().top < boxBottom || boxBottom < headerHeight())
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    const searchChanged = useRef(false)
    useEffect(() => {
        if (!searchChanged.current) {
            searchChanged.current = true
            return
        }
        const heading = resultsHeadingRef.current
        if (!heading) return
        const offset = headerHeight() + (compactBarRef.current?.offsetHeight ?? 0) + 16
        const top = heading.getBoundingClientRect().top
        if (top < offset) {
            window.scrollTo({ top: window.scrollY + top - offset, behavior: reduceMotion ? 'auto' : 'smooth' })
        }
    }, [searchParamsKey, reduceMotion])

    useEffect(() => {
        const timeout = window.setTimeout(() => updateParams({ q: query.trim() || null }), 300)
        return () => window.clearTimeout(timeout)
    }, [query, updateParams])

    const setSelectedRegions = (regions: TourRegion[]) => updateParams({ regions: regions.join(',') || null })
    const toggleSort = () => updateParams({ dir: ascending ? 'desc' : null })
    const clearFilters = () => {
        setQuery('')
        updateParams({ q: null, regions: null })
    }
    const applySuggestion = (term: string) => {
        setQuery(term)
        updateParams({ q: term, regions: null })
    }
    const loadMore = useCallback(() => {
        void fetchNextPage()
    }, [fetchNextPage])
    const hasFilters = Boolean(appliedQuery.trim() || selectedRegions.length > 0)
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
                            <div ref={searchBoxRef} className="mt-5">
                                <DestinationsSearch query={query} onQueryChange={setQuery} selectedRegions={selectedRegions} onRegionsChange={setSelectedRegions} />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <AnimatePresence>
                    {showCompactSearch && (
                        <motion.div
                            ref={compactBarRef}
                            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-x-0 top-[var(--header-height,4.5rem)] z-[70] border-b border-royal/10 bg-white/95 shadow-[0_10px_30px_rgba(22,55,101,0.08)] backdrop-blur-md"
                            role="search"
                            aria-label="Search destinations"
                        >
                            <div className="site-container py-2.5">
                                <div className="mx-auto max-w-6xl">
                                    <DestinationsSearch compact query={query} onQueryChange={setQuery} selectedRegions={selectedRegions} onRegionsChange={setSelectedRegions} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section ref={resultsRef} className="relative z-10 bg-white pb-36 pt-24 shadow-[0_-24px_50px_-30px_rgba(22,55,101,0.35)] sm:pb-44 sm:pt-32" aria-labelledby="journeys-title">
                    <div ref={resultsHeadingRef} className="site-container flex items-end justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">Curated journeys</p>
                            <h2 id="journeys-title" className="mt-2 font-noto-serif text-3xl text-ink sm:text-4xl">Explore destinations</h2>
                            <p className="mt-2 min-h-5 text-xs text-ink/50" aria-live="polite">
                                {data && total > 0 ? `Showing ${visibleTours.length} of ${total} journey${total === 1 ? '' : 's'}` : ''}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={toggleSort}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#9b7512] transition-colors hover:bg-royal/5 hover:text-royal"
                            aria-label={ascending ? 'Currently sorted A to Z. Sort Z to A' : 'Currently sorted Z to A. Sort A to Z'}
                            title={ascending ? 'A–Z' : 'Z–A'}
                        >
                            {ascending ? <ArrowDown size={19} strokeWidth={1.7} /> : <ArrowUp size={19} strokeWidth={1.7} />}
                        </button>
                    </div>

                    {isPending ? (
                        <div className="site-container mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-royal/10" />)}</div>
                    ) : isError && !isFetchNextPageError ? (
                        <div className="site-container mt-7"><div className="border border-royal/10 bg-white/45 px-6 py-16 text-center"><p className="font-noto-serif text-2xl text-royal">We couldn't load journeys</p><p className="mt-3 text-sm text-ink/60">Check your connection and try again.</p><button type="button" onClick={() => void refetch()} className="mt-6 text-sm font-medium text-[#9b7512] hover:underline">Try again</button></div></div>
                    ) : visibleTours.length === 0 ? (
                        <div className="site-container mt-7">
                            {suggestions.isFetching ? (
                                <div className="border border-royal/10 bg-white/45 px-6 py-16 text-center" aria-busy="true">
                                    <p className="sr-only">Looking for the closest journeys</p>
                                    <div className="mx-auto h-6 w-64 max-w-full animate-pulse rounded bg-royal/10" />
                                    <div className="mx-auto mt-4 h-4 w-48 max-w-full animate-pulse rounded bg-royal/5" />
                                </div>
                            ) : suggestion?.kind === 'spelling' ? (
                                <div className="border border-royal/10 bg-white/45 px-6 py-12 text-center">
                                    <p className="font-noto-serif text-2xl text-royal">
                                        Did you mean{' '}
                                        <button type="button" onClick={() => applySuggestion(suggestion.suggestion)} className="cursor-pointer capitalize text-[#9b7512] underline decoration-[#9b7512]/40 underline-offset-4 hover:decoration-[#9b7512]">{suggestion.suggestion}</button>?
                                    </p>
                                    <p className="mt-3 text-sm text-ink/60">No journeys matched “{appliedQuery}”.</p>
                                    <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
                                        {suggestion.matches.map((tour) => <DestinationCard key={tour.id} tour={tour} />)}
                                    </div>
                                </div>
                            ) : suggestion?.kind === 'covered' ? (
                                <div className="border border-royal/10 bg-white/45 px-6 py-12 text-center">
                                    <p className="font-noto-serif text-2xl text-royal">
                                        {suggestion.isCountry ? `Our journeys in ${suggestion.country}` : <>Looking for <span className="capitalize">{suggestion.place}</span>?</>}
                                    </p>
                                    <p className="mt-3 text-sm text-ink/60">
                                        {suggestion.isCountry ? 'Here is everything we currently offer there.' : `These journeys are in ${suggestion.country}, the closest we offer.`}
                                    </p>
                                    <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
                                        {suggestion.matches.map((tour) => <DestinationCard key={tour.id} tour={tour} />)}
                                    </div>
                                    <p className="mt-6 text-[11px] text-ink/40">
                                        Place data ©{' '}
                                        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="hover:underline">OpenStreetMap contributors</a>
                                    </p>
                                </div>
                            ) : suggestion?.kind === 'nearby' ? (
                                <div className="border border-royal/10 bg-white/45 px-6 py-12 text-center">
                                    <p className="font-noto-serif text-2xl text-royal">We don't run trips to <span className="capitalize">{suggestion.place}</span> yet</p>
                                    <p className="mt-3 text-sm text-ink/60">Here are the closest journeys we offer.</p>
                                    <div className="mx-auto mt-8 grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
                                        {suggestion.matches.map((tour) => <DestinationCard key={tour.id} tour={tour} badge={`~${tour.distanceKm.toLocaleString()} km away`} />)}
                                    </div>
                                    <p className="mt-6 text-[11px] text-ink/40">
                                        Place data ©{' '}
                                        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="hover:underline">OpenStreetMap contributors</a>
                                    </p>
                                </div>
                            ) : (
                                <div className="border border-royal/10 bg-white/45 px-6 py-16 text-center"><p className="font-noto-serif text-2xl text-royal">No journeys matched</p><p className="mt-3 text-sm text-ink/60">Try another place or broaden your filters.</p>{hasFilters && <button type="button" onClick={clearFilters} className="mt-6 text-sm font-medium text-[#9b7512] hover:underline">Clear filters</button>}</div>
                            )}
                        </div>
                    ) : (
                        <>
                        <motion.div
                            className={`site-container mt-7 grid gap-4 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${isPlaceholderData ? 'opacity-60' : ''}`}
                            aria-busy={isPlaceholderData}
                            initial={initialGridAnimationDone ? false : 'hidden'}
                            animate="visible"
                            onAnimationComplete={() => setInitialGridAnimationDone(true)}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
                        >
                                {visibleTours.map((tour) => (
                                    <motion.article key={tour.id} initial={initialGridAnimationDone ? false : undefined} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}>
                                        <DestinationCard tour={tour} />
                                    </motion.article>
                                ))}
                        </motion.div>
                        {isFetchNextPageError ? (
                            <div className="site-container mt-10 text-center">
                                <p className="text-sm text-ink/60">We couldn't load more journeys.</p>
                                <button type="button" onClick={loadMore} className="mt-3 text-sm font-medium text-[#9b7512] hover:underline">Try again</button>
                            </div>
                        ) : (
                            <LoadMoreSentinel hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} onLoadMore={loadMore} />
                        )}
                        </>
                    )}
                </section>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
