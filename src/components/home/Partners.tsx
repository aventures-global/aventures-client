import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Partner } from '../../types/content'
import PartnerCard from '../partners/PartnerCard'

type PartnersProps = {
    partners: Partner[]
}

const VISIBLE_COUNT = 3

const itemWidthClass = 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'

export default function Partners({ partners }: PartnersProps) {
    const isCarousel = partners.length > VISIBLE_COUNT

    return (
        <section id="partners" className="bg-white py-24 sm:py-28">
            <div className="site-container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Our partners</p>
                    <h2 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">Trusted Partners</h2>
                    <div className="mx-auto mt-6 h-px w-16 bg-gold-deep" />
                    <p className="mt-7 text-base leading-8 text-ink/70 sm:text-lg">
                        Working alongside established firms so every visa and transition is handled with care.
                    </p>
                </motion.div>

                {isCarousel ? (
                    <PartnerCarousel partners={partners} />
                ) : (
                    <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-6">
                        {partners.map((partner, index) => (
                            <RevealItem key={partner.id} index={index} className={itemWidthClass}>
                                <PartnerCard partner={partner} />
                            </RevealItem>
                        ))}
                    </div>
                )}

                {isCarousel ? (
                    <div className="mt-10 text-center">
                        <Link
                            to="/partners"
                            className="inline-flex items-center gap-3 border-b border-gold-deep pb-1.5 text-sm font-medium uppercase tracking-[0.18em] text-royal transition-colors hover:text-gold-deep"
                        >
                            See all partners
                            <ArrowRight size={16} aria-hidden />
                        </Link>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

function RevealItem({ index, className, children }: { index: number; className: string; children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(index, VISIBLE_COUNT - 1) * 0.08 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

function PartnerCarousel({ partners }: PartnersProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(true)

    const updateEdges = useCallback(() => {
        const track = trackRef.current
        if (!track) return
        // A couple of pixels of slack absorbs sub-pixel rounding at the ends.
        setCanPrev(track.scrollLeft > 2)
        setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 2)
    }, [])

    useEffect(() => {
        updateEdges()
        window.addEventListener('resize', updateEdges)
        return () => window.removeEventListener('resize', updateEdges)
    }, [updateEdges, partners.length])

    const move = (direction: -1 | 1) => {
        const track = trackRef.current
        track?.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
    }

    return (
        <div className="relative mx-auto mt-12 max-w-6xl sm:px-14">
            <CarouselArrow label="Previous partners" onClick={() => move(-1)} disabled={!canPrev} className="left-0">
                <ArrowLeft size={20} />
            </CarouselArrow>
            {/* Vertical padding keeps the card hover lift and shadows from being clipped by the scroll container. */}
            <div
                ref={trackRef}
                onScroll={updateEdges}
                className="no-scrollbar -my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto py-4"
                aria-label="Partners"
            >
                {partners.map((partner, index) => (
                    <RevealItem
                        key={partner.id}
                        index={index}
                        className="shrink-0 snap-start basis-[85%] md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
                    >
                        <PartnerCard partner={partner} />
                    </RevealItem>
                ))}
            </div>
            <CarouselArrow label="Next partners" onClick={() => move(1)} disabled={!canNext} className="right-0">
                <ArrowRight size={20} />
            </CarouselArrow>
        </div>
    )
}

function CarouselArrow({
    children,
    label,
    onClick,
    disabled,
    className,
}: {
    children: ReactNode
    label: string
    onClick: () => void
    disabled: boolean
    className: string
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-royal/20 bg-white text-royal shadow-md transition hover:border-gold-deep hover:text-gold-deep disabled:pointer-events-none disabled:opacity-35 sm:flex ${className}`}
        >
            {children}
        </button>
    )
}
