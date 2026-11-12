import { ArrowRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedTours } from '../../api'
import type { Tour } from '../../types/content'

const FEATURED_LIMIT = 3

type Destination = {
    rank: string
    name: string
    cardTitle: string
    location: string
    description: string
    image: string
    href: string
}

function monthEditLabel(date = new Date()) {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
    return `${month}’s curated edit`
}

function toDestination(tour: Tour, index: number): Destination {
    const shortTitle = tour.shortTitle?.trim()
    return {
        rank: String(index + 1).padStart(2, '0'),
        name: tour.title,
        cardTitle: shortTitle || tour.title,
        location: tour.location,
        description: tour.shortDescription || tour.tagline,
        image: tour.coverImage,
        href: `/destinations/${tour.slug}`,
    }
}

export default function Destinations() {
    const shouldReduceMotion = useReducedMotion()
    const [destinations, setDestinations] = useState<Destination[] | null>(null)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        let cancelled = false
        getFeaturedTours()
            .then((tours) => {
                if (cancelled) return
                const featured = tours.filter((tour) => tour.featured).slice(0, FEATURED_LIMIT)
                if (featured.length === 0) {
                    setHidden(true)
                    return
                }
                setDestinations(featured.map(toDestination))
            })
            .catch(() => {
                if (!cancelled) setHidden(true)
            })
        return () => {
            cancelled = true
        }
    }, [])

    if (hidden) return null

    return (
        <section id="destination-of-the-month" className="bg-oat py-24 sm:py-32">
            <div className="mx-auto w-full max-w-[96rem] px-6 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">
                            {monthEditLabel()}
                        </p>
                        <h2 className="mt-3 font-noto-serif text-3xl leading-tight text-ink sm:text-4xl">
                            Top Destinations of the Month
                        </h2>
                    </div>
                    <Link
                        to="/destinations"
                        className="group inline-flex w-fit items-center gap-3 font-medium text-royal transition-colors hover:text-gold-deep"
                    >
                        View all destinations
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {destinations ? (
                    <div className="mt-6 grid gap-5 lg:grid-cols-3">
                        {destinations.map((destination, index) => (
                            <DestinationCard
                                key={destination.href}
                                destination={destination}
                                index={index}
                                reduceMotion={shouldReduceMotion === true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 grid gap-5 lg:grid-cols-3">
                        {Array.from({ length: FEATURED_LIMIT }, (_, index) => (
                            <div
                                key={index}
                                className="skeleton-shimmer aspect-[16/10] rounded-[3px] lg:aspect-auto lg:h-[clamp(30rem,calc(100svh-18rem),44rem)]"
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

function DestinationCard({
    destination,
    index,
    reduceMotion,
}: {
    destination: Destination
    index: number
    reduceMotion: boolean
}) {
    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[16/10] overflow-hidden rounded-[3px] bg-royal shadow-[0_18px_55px_rgba(29,42,62,0.14)] lg:aspect-auto lg:h-[clamp(30rem,calc(100svh-18rem),44rem)]"
        >
            <img
                src={destination.image}
                alt={destination.location}
                className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1400ms] ease-in will-change-transform lg:group-hover:scale-[1.005] lg:group-hover:brightness-[0.9] lg:group-hover:blur-[0.6px]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,39,75,0.24)_0%,rgba(8,20,38,0.48)_52%,rgba(0,0,0,0.82)_100%)] opacity-100 transition-opacity duration-1000 ease-out lg:opacity-0 lg:group-hover:opacity-100" />

            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center transition duration-500 lg:flex lg:group-hover:-translate-y-4 lg:group-hover:opacity-0">
                <h3 className="max-w-[11em] px-6 text-center font-lejour text-3xl leading-tight text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)] lg:text-4xl">
                    {destination.cardTitle}
                </h3>
            </div>

            <div className="absolute inset-0 flex translate-y-0 flex-col justify-end bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.58)_18%,transparent_45%)] p-6 opacity-100 transition duration-500 lg:translate-y-6 lg:bg-transparent lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 sm:p-8">
                <span className="absolute right-5 top-4 font-noto-serif text-4xl text-white/30">
                    {destination.rank}
                </span>
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold sm:text-xs">
                    <MapPin size={14} />
                    {destination.location}
                </p>
                <h3 className="mt-3 font-lejour text-2xl text-white sm:text-3xl lg:hidden">
                    {destination.cardTitle}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:leading-7">
                    {destination.description}
                </p>
                <Link
                    to={destination.href}
                    className="group/link mt-5 inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-gold"
                >
                    Explore {destination.name}
                    <ArrowRight
                        size={17}
                        className="transition-transform group-hover/link:translate-x-1"
                    />
                </Link>
            </div>
        </motion.article>
    )
}
