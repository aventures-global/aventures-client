import { motion } from 'motion/react'
import type { HomePageContent } from '../../types/sitePages'

type WhyUsProps = {
    content: HomePageContent['whyUs']
}

export default function WhyUs({ content }: WhyUsProps) {
    return (
        <section id="why" className="justify-center bg-royal py-28 sm:py-36">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="site-container text-center"
            >
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">{content.eyebrow}</p>
                <h2 className="mt-4 font-noto-serif text-4xl text-cream sm:text-5xl">{content.title}</h2>
                <ul className="mx-auto mt-8 flex max-w-5xl flex-col flex-wrap items-center justify-center gap-x-4 gap-y-3 text-base text-cream/85 md:flex-row sm:text-lg">
                    {content.points.map((point, index) => (
                        <li key={index} className="flex items-center gap-3">
                            {index > 0 && <span aria-hidden className="hidden text-gold md:block">◆</span>}
                            {point}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    )
}
