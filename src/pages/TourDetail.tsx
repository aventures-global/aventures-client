import { ArrowLeft, ArrowRight, CalendarClock, ChevronLeft, ChevronRight, Compass, Files, Luggage, MapPin, Quote } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSite, getTestimonials, getTourBySlug, getTours } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import JourneyCta from '../components/ui/JourneyCta'
import SafeImage from '../components/ui/SafeImage'
import { EXPERIENCE_CATEGORIES } from '../data/destinationContent'
import type { SiteInfo, Testimonial, Tour, TourExperience } from '../types/content'
import NotFound from './NotFound'

const coverFocus: Record<string, string> = {
    'philippine-discovery': 'object-[center_48%]',
    'cebu-tour': 'object-[35%_55%]',
    'boracay-serenity': 'object-[center_58%]',
}

const tipIcons = [CalendarClock, Luggage, Files, Compass]

export default function TourDetail() {
    const { slug } = useParams<{ slug: string }>()
    const [tour, setTour] = useState<Tour | null | undefined>(undefined)
    const [allTours, setAllTours] = useState<Tour[]>([])
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])

    useEffect(() => {
        if (!slug) {
            setTour(null)
            return
        }
        void Promise.all([getTourBySlug(slug), getTours().catch(() => []), getSite(), getTestimonials().catch(() => [])]).then(
            ([tourData, toursData, siteData, testimonialData]) => {
                setTour(tourData)
                setAllTours(toursData)
                setSite(siteData)
                setTestimonials(testimonialData)
            },
        )
    }, [slug])

    const suggestedTours = useMemo(() => {
        if (!tour) return []
        const remaining = allTours.filter((item) => item.slug !== tour.slug)
        const sameRegion = remaining.filter((item) => item.region && item.region === tour.region)
        const others = remaining.filter((item) => !sameRegion.some((match) => match.id === item.id))
        return [...sameRegion, ...others].slice(0, 3)
    }, [allTours, tour])

    if (tour === undefined) {
        return <div className="luxury-paper min-h-svh"><Header /><div className="h-[70svh] animate-pulse bg-royal/10" /></div>
    }
    if (tour === null) return <NotFound />

    return (
        <div className="luxury-paper font-poppins min-h-svh overflow-x-clip text-ink">
            <Seo title={`${tour.title} — AVENtures`} description={tour.shortDescription || tour.tagline} path={`/destinations/${tour.slug}`} image={tour.coverImage} />
            <Header />

            <section className="relative flex min-h-[38rem] h-[76svh] items-end overflow-hidden">
                <SafeImage src={tour.coverImage} alt={tour.location} className="absolute inset-0 h-full w-full" imgClassName={`object-cover ${coverFocus[tour.id] ?? 'object-center'}`} />
                <div className="absolute inset-0 bg-[#071831]/22" />
                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#071831]/85 via-[#071831]/42 to-transparent" />
                <div className="site-container relative z-10 pb-12 sm:pb-16">
                    <Link to="/destinations" className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-gold"><ArrowLeft size={16} />Back to destinations</Link>
                    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="mt-7 max-w-4xl">
                        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold"><MapPin size={14} />{tour.location}</p>
                        <h1 className="mt-3 font-noto-serif text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl">{tour.title}</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{tour.tagline}</p>
                        <Link to={`/custom-tour?tour=${encodeURIComponent(tour.title)}`} className="mt-7 inline-flex items-center gap-2 border border-white/45 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-royal">Plan this destination <ArrowRight size={15} /></Link>
                    </motion.div>
                </div>
            </section>

            <main>
                {EXPERIENCE_CATEGORIES.map((category, index) => {
                    const experience = tour.experiences[index]
                    if (!experience) return null
                    return (
                        <ExperienceStory
                            key={category.label}
                            title={category.label}
                            experience={experience}
                            fallbackImage={tour.coverImage}
                            location={tour.location}
                            intro={index === 0}
                            reverse={index % 2 === 1}
                            tinted={index % 2 === 1}
                        />
                    )
                })}

                {tour.storyTitles.length > 0 && <EditorialSection eyebrow="Must Try · Traveler Stories" title="Stories worth following" items={tour.storyTitles} tour={tour} testimonials={testimonials} />}

                <section className="relative overflow-hidden bg-royal py-20 text-white sm:py-28">
                    <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:48px_48px]" />
                    <div aria-hidden className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-dashed border-gold/25" />
                    <div aria-hidden className="absolute -right-10 top-24 h-44 w-44 rounded-full border border-gold/15" />
                    <div className="site-container relative grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-gold">Travel Tips · Briefing</p>
                            <h2 className="mt-3 font-noto-serif text-4xl sm:text-5xl">Know before you go</h2>
                            <div className="mt-7 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/55">
                                <MapPin size={12} className="text-gold" />
                                Prepared for {tour.location}
                            </div>
                        </div>
                        <ol className="grid gap-x-9 sm:grid-cols-2">
                            {tour.travelTips.map((tip, index) => {
                                const Icon = tipIcons[index % tipIcons.length]
                                return (
                                    <li key={index} className="group flex gap-4 border-t border-gold/25 py-6">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition group-hover:bg-gold group-hover:text-royal">
                                            <Icon size={16} strokeWidth={1.5} />
                                        </span>
                                        <div>
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-gold/65">Brief 0{index + 1}</span>
                                            <p className="mt-2 text-sm leading-7 text-white/72">{tip}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </section>

                <ClientExperiences testimonials={testimonials} tour={tour} />

                {suggestedTours.length > 0 && (
                    <section className="bg-oat py-20 sm:py-28">
                        <div className="site-container"><p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">Continue exploring</p><h2 className="mt-3 font-noto-serif text-4xl text-royal sm:text-5xl">Suggested destinations</h2>
                            <div className="mt-9 grid gap-5 md:grid-cols-3">{suggestedTours.map((item) => <SuggestedDestination key={item.id} tour={item} />)}</div>
                        </div>
                    </section>
                )}

                <JourneyCta />
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}

function ExperienceStory({
    title,
    experience,
    fallbackImage,
    location,
    intro,
    reverse,
    tinted,
}: {
    title: string
    experience: TourExperience
    fallbackImage: string
    location: string
    intro: boolean
    reverse: boolean
    tinted: boolean
}) {
    return (
        <section className={`py-16 sm:py-24 ${tinted ? 'bg-white/45' : ''}`}>
            {intro && (
                <div className="site-container mb-6 sm:mb-20">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">Things to see · Digital Experience</p>
                    <h2 className="mt-3 font-noto-serif text-4xl text-royal sm:text-5xl">Explore before you travel</h2>
                    <p className="mt-5 text-sm leading-7 text-ink/55 lg:whitespace-nowrap">Begin with what to see, then continue through the flavors, experiences, culture, and everyday life that give this destination its character.</p>
                </div>
            )}
            <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="site-container grid items-center gap-9 lg:grid-cols-2 lg:gap-16"
            >
                <div className={`overflow-hidden rounded-xl shadow-[0_20px_55px_rgba(22,55,101,0.12)] ${reverse ? 'lg:order-2' : ''}`}>
                    <SafeImage
                        src={experience.image || fallbackImage}
                        alt={`${title} in ${location}`}
                        className="aspect-[4/3] w-full"
                        imgClassName="object-cover transition duration-1000 hover:scale-[1.025]"
                    />
                </div>
                <div className={reverse ? 'lg:order-1' : ''}>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">{title}</p>
                    <h3 className="mt-3 font-noto-serif text-2xl leading-tight text-royal sm:text-4xl">{experience.headline}</h3>
                    <p className="mt-1 max-w-xl text-base leading-8 text-ink/65">{experience.summary}</p>
                    <p className="mt-4 max-w-xl whitespace-pre-line text-sm leading-7 text-ink/50">{experience.body}</p>
                    <span className="mt-7 block h-px w-16 bg-[#9b7512]/55" />
                </div>
            </motion.article>
        </section>
    )
}

function EditorialSection({ eyebrow, title, items, tour, testimonials }: { eyebrow: string; title: string; items: string[]; tour: Tour; testimonials: Testimonial[] }) {
    return (
        <section className="py-20 sm:py-28">
            <div className="site-container">
                <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">{eyebrow}</p>
                <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <h2 className="font-noto-serif text-4xl text-royal sm:text-5xl">{title}</h2>
                    <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#9b7512] hover:text-royal">Read more stories <ArrowRight size={15} /></Link>
                </div>
                <div className="mt-9 grid gap-5 md:grid-cols-3">
                    {items.map((item, index) => {
                        const story = testimonials.length ? testimonials[index % testimonials.length] : null
                        const name = story?.name ?? 'AVENtures Traveler'
                        const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
                        return (
                            <article key={index} className="rounded-xl border border-royal/10 bg-white/50 p-6 shadow-[0_12px_35px_rgba(22,55,101,0.06)]">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal font-noto-serif text-sm text-gold">{initials}</span>
                                    <div><p className="text-sm font-medium text-royal">{name}</p><p className="mt-0.5 text-xs text-ink/40">{story?.trip ?? tour.location}</p></div>
                                </div>
                                <h3 className="mt-6 font-noto-serif text-2xl text-royal">{item}</h3>
                                <p className="mt-3 text-sm leading-7 text-ink/55">“{story?.quote ?? `A memorable part of our journey through ${tour.location}.`}”</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function ClientExperiences({ testimonials, tour }: { testimonials: Testimonial[]; tour: Tour }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const stories = testimonials.length
        ? testimonials.slice(0, 5)
        : [{ id: 'fallback', name: 'AVENtures Traveler', trip: tour.location, quote: 'Every detail felt considered, while the journey still left room for us to experience the destination in our own way.', rating: 5 }]
    const activeStory = stories[activeIndex]
    const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + stories.length) % stories.length)

    return (
        <section className="py-20 sm:py-28">
            <div className="site-container">
                <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#9b7512]">Client Experiences · Feedback</p>
                    <h2 className="mt-3 font-noto-serif text-4xl text-royal sm:text-5xl">Journeys shared by travelers</h2>
                </div>
                <div className="relative mt-8 px-0 sm:px-16 lg:px-20">
                    <button type="button" onClick={() => move(-1)} aria-label="Previous client experience" className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-royal/20 text-royal transition hover:border-[#9b7512] hover:bg-[#9b7512] hover:text-white sm:flex"><ChevronLeft size={19} /></button>
                    <motion.div key={activeStory.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="text-center">
                        <Quote className="mx-auto text-[#9b7512]/30" size={42} />
                        <blockquote className="mx-auto mt-5 max-w-4xl font-poppins text-xl font-normal leading-relaxed text-royal/85 sm:text-2xl lg:text-3xl">“{activeStory.quote}”</blockquote>
                        <p className="mt-7 text-xs uppercase tracking-[0.2em] text-ink/45">{activeStory.name} · {activeStory.trip}</p>
                    </motion.div>
                    <button type="button" onClick={() => move(1)} aria-label="Next client experience" className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-royal/20 text-royal transition hover:border-[#9b7512] hover:bg-[#9b7512] hover:text-white sm:flex"><ChevronRight size={19} /></button>
                    <div className="mt-8 flex justify-center gap-3 sm:hidden">
                        <button type="button" onClick={() => move(-1)} aria-label="Previous client experience" className="flex h-10 w-10 items-center justify-center rounded-full border border-royal/20 text-royal"><ChevronLeft size={18} /></button>
                        <button type="button" onClick={() => move(1)} aria-label="Next client experience" className="flex h-10 w-10 items-center justify-center rounded-full border border-royal/20 text-royal"><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SuggestedDestination({ tour }: { tour: Tour }) {
    return <Link to={`/destinations/${tour.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-royal/10"><SafeImage src={tour.coverImage} alt={tour.title} className="absolute inset-0 h-full w-full" imgClassName="object-cover transition duration-700 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5"><p className="text-[10px] uppercase tracking-[0.2em] text-gold">{tour.location}</p><h3 className="mt-2 font-noto-serif text-2xl text-white">{tour.title}</h3></div></Link>
}
