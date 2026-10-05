import { Car, Compass, Plane, ShieldCheck, ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { ServiceOffer } from '../../types/content'

const icons = {
    plane: Plane,
    map: Compass,
    car: Car,
    shield: ShieldCheck,
    bag: ShoppingBag,
} as const

type OffersProps = {
    offers: ServiceOffer[]
}

export default function Offers({ offers }: OffersProps) {
    return (
        <section id="services" className="page-section bg-oat">
            <div className="site-container flex min-h-0 flex-1 flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Everything considered</p>
                    <h2 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">What AVENTURES Can Offer</h2>
                    <p className="mt-4 leading-7 text-ink/60">Six essential services, thoughtfully coordinated by one travel team.</p>
                </motion.div>

                <motion.div
                    className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.11 } },
                    }}
                >
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </motion.div>

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
            variants={{
                hidden: { opacity: 0, y: 34 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
            }}
            className={`h-full ${className}`}
        >
            <div className="group flex h-full min-h-[210px] flex-col items-center justify-center gap-5 rounded-[3px] border border-royal/15 bg-white/65 p-6 text-center shadow-[0_10px_30px_rgba(22,55,101,0.05)] transition duration-500 hover:-translate-y-1 hover:border-gold-deep/45 hover:bg-white/90 hover:shadow-[0_16px_38px_rgba(22,55,101,0.09)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal/[0.07] text-royal transition-colors duration-500 group-hover:bg-royal group-hover:text-cream">
                    <Icon size={25} strokeWidth={1.25} />
                </div>
                <div className="max-w-xs">
                    <h3 className="font-noto-serif text-lg font-semibold text-ink">{offer.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/55">{offer.description}</p>
                    {offer.id === 'visa' ? (
                        <Link
                            to="/visa-assistance"
                            className="mt-4 inline-flex text-sm font-medium text-royal underline decoration-gold-deep/60 underline-offset-4 transition-colors hover:text-gold-deep"
                        >
                            Visit Visa Assistance
                        </Link>
                    ) : null}
                </div>
            </div>
        </motion.div>
    )
}
