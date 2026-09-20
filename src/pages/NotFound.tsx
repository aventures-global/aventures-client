import { Link, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'

export default function NotFound() {
  const location = useLocation()

  return (
    <div className="min-h-svh bg-ink">
      <Seo
        title="Page not found — AVENtures"
        description="That page does not exist. Return home or explore AVENtures destinations."
        path={location.pathname}
        noIndex
      />
      <Header />
      <main className="site-container flex flex-col items-start pb-24 pt-36">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">404</p>
        <h1 className="mt-3 font-serif text-4xl text-gold-gradient">Page not found</h1>
        <p className="mt-4 max-w-md text-silver/80">
          That route does not exist yet. Return home or explore our destinations.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/"
            className="btn-gold rounded-xl px-6 py-3 text-base"
          >
            Home
          </Link>
          <Link
            to="/destinations"
            className="rounded-xl border border-white/20 px-6 py-3 font-serif text-base text-white transition-colors hover:border-gold hover:text-gold"
          >
            Destinations
          </Link>
        </div>
      </main>
    </div>
  )
}
