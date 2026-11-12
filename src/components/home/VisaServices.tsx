import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { visaServiceHref } from '../../data/visaCatalog'
import { useVisaCatalog } from '../../hooks/useVisaCatalog'
import type { VisaCatalog, VisaServiceContent } from '../../types/visa'

const primaryButtonClass =
    'group inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const EASE = [0.22, 1, 0.36, 1] as const

export default function VisaServices() {
    const catalog = useVisaCatalog()
    if (!catalog) return null
    const featured = catalog.services.find((service) => service.id === 'j1')
    if (!featured) return null
    return <VisaTopOffer catalog={catalog} featured={featured} />
}

function VisaTopOffer({
    catalog,
    featured,
}: {
    catalog: VisaCatalog
    featured: VisaServiceContent
}) {
    const headingId = useId()

    return (
        <section
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
                            Top offer
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="mt-10 overflow-hidden rounded-[3px] border border-royal/15 bg-cream"
                >
                    <div className="grid lg:grid-cols-2">
                        <div className="relative min-h-[220px] lg:min-h-full">
                            <img
                                src="/assets/images/visa-services.jpg"
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-royal/15" />
                        </div>
                        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
                            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]">
                                {featured.category}
                            </p>
                            <h3 className="mt-3 font-noto-serif text-2xl text-royal sm:text-3xl">
                                {featured.title}
                            </h3>
                            <p className="mt-4 max-w-xl text-base leading-7 text-ink/65">
                                {featured.description}
                            </p>
                            <Link
                                to={visaServiceHref(catalog, featured)}
                                className={`${primaryButtonClass} mt-8 w-fit`}
                            >
                                Learn more
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
