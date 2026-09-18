import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTours } from '../api'
import PageShell from '../components/layout/PageShell'
import type { Tour } from '../types/content'

const siteLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Why travel with us?', to: '/#why' },
  { label: 'Contact', to: '/#contact' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Blogs', to: '/blog' },
]

const serviceLinks = [
  { label: 'Flights', to: '/flights' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Cars & Transfers', to: '/cars' },
]

export default function Sitemap() {
  const [tours, setTours] = useState<Tour[]>([])

  useEffect(() => {
    void getTours().then(setTours)
  }, [])

  return (
    <PageShell title="Sitemaps" eyebrow="Index">
      <div className="grid max-w-3xl gap-12 sm:grid-cols-2">
        <section>
          <h2 className="text-sm font-semibold text-white">Site</h2>
          <ul className="mt-4 space-y-2 text-sm text-silver/80">
            {siteLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm text-silver/80">
            {serviceLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-sm font-semibold text-white">Destinations</h2>
          <ul className="mt-4 space-y-2 text-sm text-silver/80">
            {tours.map((tour) => (
              <li key={tour.id}>
                <Link to={`/destinations/${tour.slug}`} className="hover:text-white">
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  )
}
