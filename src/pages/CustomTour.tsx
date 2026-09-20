import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import CustomTourForm from '../components/services/CustomTourForm'
import Seo from '../components/seo/Seo'
import { getSeoForPath } from '../data/seo'
import type { SiteInfo } from '../types/content'

const description =
  'Tell us where you want to go. We will reply with a private itinerary shaped around your dates, pace, and company — this is a request, not an instant booking.'

export default function CustomTour() {
  const [site, setSite] = useState<SiteInfo | null>(null)
  const routeSeo = getSeoForPath('/custom-tour')

  useEffect(() => {
    void getSite().then(setSite)
  }, [])

  return (
    <div className="min-h-svh bg-ink">
      <Seo title={routeSeo.title} description={description} path="/custom-tour" />
      <div className="relative overflow-hidden border-b border-white/5 bg-ink-soft">
        <div className="pointer-events-none absolute right-10 top-20 h-64 w-24 hero-beam opacity-40" />
        <Header />
        <div className="site-container relative z-10 pb-12 pt-36">
          <p className="text-sm text-gold">By request</p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 font-serif text-4xl text-gold-gradient sm:text-5xl"
          >
            Custom tour
          </motion.h1>
          <p className="mt-4 max-w-xl text-silver/85">{description}</p>
        </div>
      </div>

      <div className="site-container grid gap-12 py-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {site ? (
            <CustomTourForm fallbackEmail={site.email} />
          ) : (
            <div className="space-y-4">
              <div className="h-12 skeleton-shimmer rounded-lg" />
              <div className="h-12 skeleton-shimmer rounded-lg" />
              <div className="h-32 skeleton-shimmer rounded-lg" />
            </div>
          )}
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 text-sm text-silver/90"
        >
          <p className="leading-relaxed text-muted">
            Share as much as you know — destinations, dates, and whether you need domestic
            or international flights. A host follows up by email or phone with a proposed
            plan. There is no live checkout on this page.
          </p>
          {site && (
            <div className="space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 hover:text-gold"
              >
                <Mail size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{site.email}</span>
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex items-start gap-3 hover:text-gold"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{site.phoneDisplay}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}
          <Link
            to="/destinations"
            className="inline-flex text-sm text-gold transition hover:text-ivory"
          >
            Or browse destinations →
          </Link>
        </motion.aside>
      </div>

      {site && <Footer site={site} />}
    </div>
  )
}
