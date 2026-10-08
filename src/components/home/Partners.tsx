import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { Partner } from '../../types/content'
import SafeImage from '../ui/SafeImage'

type PartnersProps = {
    partners: Partner[]
}

function initials(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean)
    return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
}

export default function Partners({ partners }: PartnersProps) {
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

                <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
                    {partners.map((partner, index) => (
                        <motion.article
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="flex flex-col rounded-2xl border border-black/[0.06] bg-white/90 p-7 shadow-[0_18px_45px_rgba(31,39,51,0.10),0_3px_10px_rgba(31,39,51,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,39,51,0.14),0_5px_14px_rgba(31,39,51,0.07)] sm:p-8"
                        >
                            <div className="flex h-16 items-center">
                                {partner.logoSrc ? (
                                    <SafeImage
                                        src={partner.logoSrc}
                                        alt={`${partner.name} logo`}
                                        className="h-full w-40"
                                        imgClassName="object-contain object-left"
                                    />
                                ) : (
                                    <span
                                        className="flex h-16 w-16 items-center justify-center rounded-full bg-royal font-noto-serif text-xl text-cream shadow-md"
                                        aria-hidden
                                    >
                                        {initials(partner.name)}
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-6 font-noto-serif text-2xl text-royal">{partner.name}</h3>
                            {partner.description ? (
                                <p className="mt-3 flex-1 text-sm leading-7 text-ink/60">{partner.description}</p>
                            ) : (
                                <div className="flex-1" />
                            )}
                            {partner.url ? (
                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-7 inline-flex items-center gap-3 self-start border-b border-gold-deep pb-1.5 text-sm font-medium uppercase tracking-[0.18em] text-royal transition-colors hover:text-gold-deep"
                                >
                                    Visit site
                                    <ArrowRight size={16} aria-hidden />
                                    <span className="sr-only">(opens {partner.name} in a new tab)</span>
                                </a>
                            ) : null}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
