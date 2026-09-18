import { motion } from 'motion/react'
import type { SiteInfo } from '../../types/content'

type AboutProps = {
  site: SiteInfo
}

export default function About({ site }: AboutProps) {
  return (
    <section id="about" className="page-section">
      <div className="site-container grid flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl text-gold-gradient sm:text-4xl">About us</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/90 sm:text-lg">
            {site.about}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.aboutBody}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto flex w-full max-w-lg items-center justify-center"
        >
          <div className="pointer-events-none absolute inset-6 rounded-full bg-gold/15 blur-3xl" />
          <img
            src="/assets/images/AVENtures-globe.png"
            alt=""
            className="relative w-full max-w-md mix-blend-screen"
          />
        </motion.div>
      </div>
    </section>
  )
}
