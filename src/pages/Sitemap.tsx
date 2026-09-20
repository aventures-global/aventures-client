import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMerch, getTours } from '../api'
import PageShell from '../components/layout/PageShell'
import type { MerchProduct, Tour } from '../types/content'

const siteLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/#about' },
  { label: 'About us (full story)', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Shop', to: '/shop' },
  { label: 'Custom tour', to: '/custom-tour' },
  { label: 'Why travel with us?', to: '/#why' },
  { label: 'Contact', to: '/#contact' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy' },
]

const serviceLinks = [
  { label: 'Flights', to: '/flights' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Cars & Transfers', to: '/cars' },
]

export default function Sitemap() {
  const [tours, setTours] = useState<Tour[]>([])
  const [products, setProducts] = useState<MerchProduct[]>([])

  useEffect(() => {
    void Promise.all([getTours(), getMerch()]).then(([tourData, merchData]) => {
      setTours(tourData)
      setProducts(merchData)
    })
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
          <h2 className="mt-10 text-sm font-semibold text-white">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm text-silver/80">
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/shop/${product.slug}`} className="hover:text-white">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  )
}
