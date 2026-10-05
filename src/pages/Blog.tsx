import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

export default function Blog() {
    return (
        <PageShell title="Blogs" eyebrow="Journal" noIndex>
            <div className="max-w-xl">
                <p className="text-base leading-8 text-ink/65">
                    Travel notes from the road will live here. Until the first stories are up, explore a
                    destination or follow along on Instagram.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        to="/destinations"
                        className="inline-flex items-center justify-center rounded-[3px] border-2 border-royal bg-royal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white"
                    >
                        Browse destinations
                    </Link>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center justify-center rounded-[3px] border-2 border-royal/70 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-royal transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
        </PageShell>
    )
}
