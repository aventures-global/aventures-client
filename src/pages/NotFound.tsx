import { ArrowLeft, ArrowRight, Compass, MapPin, Plane } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getSite } from '../api'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import type { SiteInfo } from '../types/content'

export default function NotFound() {
    const location = useLocation()
    const [site, setSite] = useState<SiteInfo | null>(null)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    return (
        <div className="luxury-paper flex min-h-svh flex-col font-poppins">
            <Seo title="Page not found — AVENtures" description="That page does not exist. Return home or explore AVENtures destinations." path={location.pathname} noIndex />
            <Header />

            <main className="relative flex flex-1 items-center overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
                <div aria-hidden className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(22,55,101,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(22,55,101,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />
                <div aria-hidden className="absolute -left-28 top-28 h-80 w-80 rounded-full border border-royal/10 sm:h-[30rem] sm:w-[30rem]" />
                <div aria-hidden className="absolute -left-16 top-40 h-64 w-64 rounded-full border border-[#9b7512]/10 sm:h-[24rem] sm:w-[24rem]" />

                <div className="site-container relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-5xl">
                        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
                            <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:mx-0">
                                <span className="font-noto-serif text-[clamp(7rem,22vw,13rem)] leading-none text-royal">4</span>
                                <div className="relative mx-1 flex h-[clamp(7rem,20vw,11.5rem)] w-[clamp(7rem,20vw,11.5rem)] items-center justify-center rounded-full border border-[#9b7512]/25 bg-white/35 shadow-[0_18px_55px_rgba(22,55,101,0.1)] sm:mx-3">
                                    <img src="/assets/images/AVENtures-globe.png" alt="" className="h-[88%] w-[88%] object-contain drop-shadow-[0_8px_18px_rgba(155,117,18,0.2)]" />
                                    <span className="sr-only">0</span>
                                </div>
                                <span className="font-noto-serif text-[clamp(7rem,22vw,13rem)] leading-none text-royal">4</span>

                                <div aria-hidden className="absolute -bottom-5 left-[12%] right-[10%] flex items-center text-[#9b7512]/70">
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#9b7512] bg-oat" />
                                    <span className="w-full border-t border-dashed border-[#9b7512]/60" />
                                    <Plane size={20} className="-ml-1 shrink-0 rotate-12" />
                                </div>
                            </div>

                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#9b7512]"><Compass size={15} /> Route unavailable</div>
                                <h1 className="mt-5 font-noto-serif text-4xl leading-tight text-royal sm:text-5xl">A little off the map?</h1>
                                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-ink/55 lg:mx-0">This route may have moved, changed course, or never made it into the itinerary. Let&rsquo;s guide you somewhere inspiring instead.</p>

                                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                                    <Link to="/" className="group inline-flex items-center justify-center gap-2 rounded-[3px] bg-royal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.13em] text-cream transition hover:bg-[#9b7512]">
                                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Return home
                                    </Link>
                                    <Link to="/destinations" className="group inline-flex items-center justify-center gap-2 rounded-[3px] border border-royal/25 bg-white/40 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.13em] text-royal transition hover:border-royal hover:bg-white/75">
                                        Explore destinations <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>

                                <p className="mt-8 flex items-center justify-center gap-2 text-xs text-royal/40 lg:justify-start"><MapPin size={13} /> You reached <span className="max-w-52 truncate font-mono text-[11px] text-royal/55">{location.pathname}</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {site && <Footer site={site} />}
        </div>
    )
}
