import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { visaServiceHref } from '../../data/visaCatalog'
import { useVisaCatalog } from '../../hooks/useVisaCatalog'
import type { VisaCatalog, VisaServiceContent } from '../../types/visa'

const AUTOPLAY_MS = 7000
const EASE = [0.22, 1, 0.36, 1] as const

export default function VisaServices() {
    const catalog = useVisaCatalog()
    if (!catalog || catalog.services.length === 0) return null
    return <VisaServicesCarousel catalog={catalog} />
}

function VisaServicesCarousel({ catalog }: { catalog: VisaCatalog }) {
    const services = catalog.services
    const reduceMotion = useReducedMotion()
    const headingId = useId()
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [paused, setPaused] = useState(false)
    const [tabHidden, setTabHidden] = useState(() => document.hidden)
    const [inView, setInView] = useState(false)
    const [announce, setAnnounce] = useState(false)
    const regionRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)

    const count = services.length
    const current = services[index]
    const autoplayOn = !reduceMotion && !paused && !tabHidden && inView

    const goTo = useCallback(
        (next: number, dir: number, fromManual: boolean) => {
            const wrapped = ((next % count) + count) % count
            setDirection(dir)
            setIndex(wrapped)
            setAnnounce(fromManual)
        },
        [count],
    )

    const goPrev = useCallback(() => goTo(index - 1, -1, true), [goTo, index])
    const goNext = useCallback(() => goTo(index + 1, 1, true), [goTo, index])

    useEffect(() => {
        const onVisibility = () => setTabHidden(document.hidden)
        document.addEventListener('visibilitychange', onVisibility)
        return () => document.removeEventListener('visibilitychange', onVisibility)
    }, [])

    useEffect(() => {
        const node = sectionRef.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
            { threshold: [0, 0.35, 0.6, 1] },
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!autoplayOn) return
        const timer = window.setTimeout(() => {
            setDirection(1)
            setIndex((currentIndex) => (currentIndex + 1) % count)
            setAnnounce(false)
        }, AUTOPLAY_MS)
        return () => window.clearTimeout(timer)
    }, [autoplayOn, count, index])

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goPrev()
        } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            goNext()
        }
    }

    const pad = (n: number) => String(n).padStart(2, '0')
    const liveLabel = announce
        ? `${current.category}. ${current.title}. ${current.description}`
        : undefined

    return (
        <section
            ref={sectionRef}
            id="visa-services"
            className="bg-white py-24 sm:py-32"
            aria-labelledby={headingId}
        >
            <div className="site-container">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">
                            Visa services
                        </p>
                        <h2
                            id={headingId}
                            className="mt-3 font-noto-serif text-3xl leading-tight text-ink sm:text-4xl"
                        >
                            U.S. Visas We Assist With
                        </h2>
                    </div>
                    <Link
                        to="/visa-assistance"
                        className="group inline-flex w-fit items-center gap-3 font-medium text-royal transition-colors hover:text-gold-deep"
                    >
                        All visa services
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                <div
                    ref={regionRef}
                    tabIndex={0}
                    role="region"
                    aria-roledescription="carousel"
                    aria-labelledby={headingId}
                    onKeyDown={onKeyDown}
                    className="mt-10 rounded-[3px] border border-royal/15 bg-cream outline-none focus-visible:ring-2 focus-visible:ring-royal/40 focus-visible:ring-offset-4"
                >
                    <div className="relative min-h-[220px] overflow-hidden px-6 py-8 sm:min-h-[200px] sm:px-10 sm:py-10">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <Slide
                                key={current.id}
                                service={current}
                                href={visaServiceHref(catalog, current)}
                                direction={direction}
                                reduceMotion={!!reduceMotion}
                            />
                        </AnimatePresence>
                        <div className="sr-only" aria-live="polite" aria-atomic="true">
                            {liveLabel}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border-t border-royal/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                        <div className="flex items-center gap-3">
                            <ControlButton label="Previous visa" onClick={goPrev}>
                                <ArrowLeft size={16} strokeWidth={1.75} />
                            </ControlButton>
                            {!reduceMotion && (
                                <ControlButton
                                    label={paused ? 'Play slideshow' : 'Pause slideshow'}
                                    onClick={() => setPaused((value) => !value)}
                                >
                                    {paused ? (
                                        <Play size={15} strokeWidth={1.75} />
                                    ) : (
                                        <Pause size={15} strokeWidth={1.75} />
                                    )}
                                </ControlButton>
                            )}
                            <ControlButton label="Next visa" onClick={goNext}>
                                <ArrowRight size={16} strokeWidth={1.75} />
                            </ControlButton>
                            <p className="ml-2 text-xs font-medium uppercase tracking-[0.2em] text-ink/45">
                                {pad(index + 1)} / {pad(count)}
                            </p>
                        </div>

                        <div
                            className="flex flex-wrap gap-2"
                            role="tablist"
                            aria-label="Visa slides"
                        >
                            {services.map((service, i) => {
                                const active = i === index
                                return (
                                    <button
                                        key={service.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        aria-label={service.shortLabel}
                                        onClick={() => goTo(i, i > index ? 1 : -1, true)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            active
                                                ? 'w-7 bg-gold-deep'
                                                : 'w-2.5 bg-royal/20 hover:bg-royal/40'
                                        }`}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Slide({
    service,
    href,
    direction,
    reduceMotion,
}: {
    service: VisaServiceContent
    href: string
    direction: number
    reduceMotion: boolean
}) {
    if (reduceMotion) {
        return (
            <div>
                <SlideBody service={service} href={href} />
            </div>
        )
    }

    return (
        <motion.div
            custom={direction}
            variants={{
                enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
                center: { opacity: 1, x: 0 },
                exit: (dir: number) => ({ opacity: 0, x: dir * -28 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: EASE }}
        >
            <SlideBody service={service} href={href} />
        </motion.div>
    )
}

function SlideBody({ service, href }: { service: VisaServiceContent; href: string }) {
    return (
        <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">
                {service.category}
            </p>
            <h3 className="mt-3 font-noto-serif text-2xl text-royal sm:text-3xl">{service.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65">{service.description}</p>
            <Link
                to={href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-royal underline decoration-gold-deep/60 underline-offset-4 transition-colors hover:text-gold-deep"
            >
                Learn more
                <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                />
            </Link>
        </div>
    )
}

function ControlButton({
    label,
    onClick,
    children,
}: {
    label: string
    onClick: () => void
    children: ReactNode
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-royal/20 text-royal transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white"
        >
            {children}
        </button>
    )
}
