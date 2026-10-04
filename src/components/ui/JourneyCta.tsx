import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function JourneyCta() {
    const location = useLocation()

    return (
        <section className="relative overflow-hidden bg-royal py-20 text-white sm:py-28">
            <div aria-hidden className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="site-container relative text-center">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Where will your AVENture take you?</p>
                <h2 className="mx-auto mt-4 max-w-4xl font-noto-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">Think beyond the visa. Dream about the destination.</h2>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65">Explore a destination. Discover the experience. Start imagining yourself there.</p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link to="/start-your-aventure" className="inline-flex min-w-48 items-center justify-center gap-2 bg-gold px-6 py-3 text-sm text-royal transition hover:bg-white">Start your AVENture <ArrowRight size={15} /></Link>
                    <Link to="/inquire" state={{ backgroundLocation: location }} className="inline-flex min-w-48 items-center justify-center gap-2 border border-white/35 px-6 py-3 text-sm text-white transition hover:border-white hover:bg-white hover:text-royal">Book a consultation <ArrowRight size={15} /></Link>
                </div>
            </div>
        </section>
    )
}
