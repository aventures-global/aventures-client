import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

export default function Blog() {
  return (
    <PageShell title="Blogs" eyebrow="Journal" noIndex>
      <div className="max-w-xl">
        <p className="text-base leading-relaxed text-silver/85">
          Travel notes from the road will live here. Until the first stories are up, explore a
          destination or follow along on Instagram.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/destinations" className="btn-gold rounded-xl px-6 py-3 text-base">
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
    </PageShell>
  )
}
