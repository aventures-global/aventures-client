import { motion } from 'motion/react'
import type { SiteInfo } from '../../types/content'

type WhyUsProps = {
  site: SiteInfo
}

export default function WhyUs({ site }: WhyUsProps) {
  return (
    <section id="why" className="py-35 justify-center bg-gold-band">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="site-container text-center"
      >
        <h2 className="font-serif text-4xl text-gold-ink sm:text-5xl">{site.whyUsIntro}</h2>
        <ul className="mx-auto mt-7 flex flex-col md:flex-row max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-serif text-base text-gold-ink sm:text-lg">
          {site.whyUsPoints.map((point, index) => (
            <li key={point.id} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden className='hidden md:block'>·</span>}
              {point.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
