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
    <section id="testimonials" className="page-section">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl text-gold-gradient sm:text-4xl">
            What travelers say
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
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
              className="flex flex-col border-t border-white/10 pt-6"
            >
              <StarRating rating={item.rating} />
              <p className="mt-4 flex-1 text-base leading-relaxed text-silver/90">
                “{item.quote}”
              </p>
              <footer className="mt-6">
                <cite className="not-italic text-sm font-medium text-white">
                  {item.name}
                </cite>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold/75">
                  {item.trip}
                </p>
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
            className={filled ? 'fill-gold text-gold' : 'text-white/25'}
            aria-hidden
          />
        )
      })}
    </div>
  )
}
