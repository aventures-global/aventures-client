import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import type { SiteInfo } from '../types/content'

type ServicePlaceholderProps = {
  title: string
  description: string
}

export default function ServicePlaceholder({ title, description }: ServicePlaceholderProps) {
  const [site, setSite] = useState<SiteInfo | null>(null)

  useEffect(() => {
    void getSite().then(setSite)
  }, [])

  return (
    <div className="min-h-svh bg-ink">
      <div className="relative overflow-hidden border-b border-white/5 bg-ink-soft">
        <div className="pointer-events-none absolute right-10 top-20 h-64 w-24 hero-beam opacity-40" />
        <Header />
        <div className="site-container relative z-10 pb-16 pt-36">
          <p className="text-sm text-gold">Coming soon</p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 font-serif text-4xl text-gold-gradient sm:text-5xl"
          >
            {title}
          </motion.h1>
          <p className="mt-4 max-w-xl text-silver/85">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/destinations"
              className="btn-gold rounded-xl px-6 py-3 text-base"
            >
              Browse destinations
            </Link>
            <Link
              to="/#contact"
              className="rounded-xl border border-white/20 px-6 py-3 font-serif text-base text-white transition-colors hover:border-gold hover:text-gold"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
      {site && <Footer site={site} />}
    </div>
  )
}
