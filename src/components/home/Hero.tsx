import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { SiteInfo } from '../../types/content'

type HeroProps = {
  site: SiteInfo
}

export default function Hero({ site }: HeroProps) {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* Reverse-T beam: light pools along the bottom, shaft rises from its centre. */}
      <div className="hero-beam-field pointer-events-none absolute inset-0" aria-hidden>
        <div className="beam-ambient absolute bottom-0 left-[72%] h-full w-[64rem] -translate-x-1/2" />
        <div className="beam-glow absolute bottom-0 left-[72%] h-full w-36 -translate-x-1/2" />
        <div className="beam-core absolute bottom-0 left-[72%] h-full w-5 -translate-x-1/2" />
        <div className="beam-foot absolute bottom-0 left-[72%] h-56 w-[38rem] -translate-x-1/2" />
        <div className="beam-foot-line absolute bottom-0 left-[72%] h-5 w-[30rem] -translate-x-1/2" />
      </div>

      <div className="site-container relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
            {site.heroEyebrow}
          </p>
          <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.12] text-white sm:text-5xl lg:text-[3.4rem]">
            {site.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/85 sm:text-lg sm:leading-relaxed">
            {site.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="btn-gold inline-flex justify-center rounded-xl px-8 py-3.5 text-base shadow-[0_0_46px_rgba(255,195,0,0.22)] sm:text-lg"
            >
              {site.heroPrimaryCta}
            </a>
            <Link
              to="/destinations"
              className="inline-flex justify-center rounded-xl border border-white/20 px-8 py-3.5 font-serif text-base text-white transition-colors hover:border-gold/50 hover:text-gold sm:text-lg"
            >
              {site.heroSecondaryCta}
            </Link>
          </div>

          <ul className="mt-10 flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            {site.heroFacts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden className="text-white/25">
                    ·
                  </span>
                )}
                {fact.startsWith('+') ? (
                  <a
                    href={`tel:${site.phone}`}
                    className="transition-colors hover:text-silver"
                  >
                    {fact}
                  </a>
                ) : (
                  fact
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
