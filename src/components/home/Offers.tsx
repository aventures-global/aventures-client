import { ArrowUpRight, Car, Compass, Plane, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { ServiceOffer } from '../../types/content'

const icons = {
  plane: Plane,
  map: Compass,
  car: Car,
  shield: ShieldCheck,
} as const

type OffersProps = {
  offers: ServiceOffer[]
}

export default function Offers({ offers }: OffersProps) {
  const wide = offers.find((o) => o.span === 'wide')
  const tall = offers.find((o) => o.span === 'tall')
  const squares = offers.filter((o) => o.span === 'square')

  return (
    <section id="services" className="page-section">
      <div className="site-container flex min-h-0 flex-1 flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-serif text-3xl text-gold-gradient sm:text-4xl"
        >
          What we offer
        </motion.h2>

        <div className="grid flex-1 gap-4 md:auto-rows-fr md:grid-cols-3 md:grid-rows-2">
          {wide && <OfferCard offer={wide} className="md:col-span-2" />}
          {tall && <OfferCard offer={tall} className="md:col-start-3 md:row-span-2" />}
          {squares.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function OfferCard({
  offer,
  className = '',
}: {
  offer: ServiceOffer
  className?: string
}) {
  const Icon = icons[offer.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className={`h-full ${className}`}
    >
      <Link
        to={offer.href}
        className="group card-surface flex h-full min-h-[250px] flex-col rounded-xl border border-white/5 p-7 transition-colors hover:border-gold/30"
      >
        <div className="flex items-start justify-between gap-4">
          <Icon className="text-gold" size={40} strokeWidth={1.1} />
          <span
            aria-hidden
            className="mt-1 text-gold/35 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
          >
            <ArrowUpRight size={22} strokeWidth={1.2} />
          </span>
        </div>
        <div className="flex-1" />
        <h3 className="text-lg font-semibold text-white">{offer.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{offer.description}</p>
        <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold/55 transition-colors duration-500 group-hover:text-gold">
          Explore
          <span className="h-px w-7 bg-gold/35 transition-all duration-500 group-hover:w-11 group-hover:bg-gold" />
        </span>
      </Link>
    </motion.div>
  )
}
