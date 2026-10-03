import { Star } from 'lucide-react'
import { motion } from 'motion/react'
import type { Testimonial } from '../../types/content'

type TestimonialsProps = {
    testimonials: Testimonial[]
}

function averageRating(items: Testimonial[]) {
    if (items.length === 0) return 0
    const sum = items.reduce((acc, item) => acc + item.rating, 0)
    return Math.round((sum / items.length) * 10) / 10
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    if (testimonials.length === 0) return null

    const average = averageRating(testimonials)
    const countLabel =
        testimonials.length === 1
            ? '1 recent trip'
            : `${testimonials.length} recent trips`

    return (
        <section id="testimonials" className="bg-white py-24 sm:py-28">
            <div className="site-container">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">AVENturer stories</p>
                    <h2 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">
                        What Travelers Say
                    </h2>
                    <p className="mt-3 text-sm text-ink/50 sm:text-base">
                        {average.toFixed(1)} average · {countLabel}
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {testimonials.map((item, index) => (
                        <motion.blockquote
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="relative flex min-h-[280px] flex-col rounded-2xl border border-black/[0.06] bg-white/90 p-7 shadow-[0_18px_45px_rgba(31,39,51,0.10),0_3px_10px_rgba(31,39,51,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,39,51,0.14),0_5px_14px_rgba(31,39,51,0.07)]"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <StarRating rating={item.rating} />
                                <span className="font-noto-serif text-lg font-semibold text-royal" aria-label={`${item.rating.toFixed(1)} rating`}>
                                    {item.rating.toFixed(1)}
                                </span>
                            </div>
                            <p className="mt-4 flex-1 text-base leading-8 text-ink/70">
                                “{item.quote}”
                            </p>
                            <footer className="mt-7 flex items-center gap-3 border-t border-ink/10 pt-5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal font-noto-serif text-sm text-cream shadow-md">
                                    {item.name.charAt(0)}
                                </span>
                                <div>
                                    <cite className="not-italic text-sm font-medium text-ink">
                                        {item.name}
                                    </cite>
                                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-royal/65">
                                        {item.trip}
                                    </p>
                                </div>
                            </footer>
                        </motion.blockquote>
                    ))}
                </div>
            </div>
        </section>
    )
}

function StarRating({ rating }: { rating: number }) {
    const clamped = Math.min(5, Math.max(0, Math.round(rating)))

    return (
        <div
            className="flex gap-1"
            role="img"
            aria-label={`${clamped} out of 5 stars`}
        >
            {Array.from({ length: 5 }, (_, index) => {
                const filled = index < clamped
                return (
                    <Star
                        key={index}
                        size={16}
                        strokeWidth={1.5}
                        className={filled ? 'fill-gold-deep text-gold-deep' : 'text-royal/20'}
                        aria-hidden
                    />
                )
            })}
        </div>
    )
}
