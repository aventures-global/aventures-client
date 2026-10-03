import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    getFaqs,
    getOffers,
    getSite,
    getTestimonials,
} from '../api'
import About from '../components/home/About'
import Contact from '../components/home/Contact'
import Destinations from '../components/home/Destinations'
import Hero from '../components/home/Hero'
import Offers from '../components/home/Offers'
import Testimonials from '../components/home/Testimonials'
import WhyUs from '../components/home/WhyUs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import TravelAgencyJsonLd from '../components/seo/TravelAgencyJsonLd'
import { getSeoForPath } from '../data/seo'
import type { FaqItem, ServiceOffer, SiteInfo, Testimonial } from '../types/content'

export default function Home() {
    const location = useLocation()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [offers, setOffers] = useState<ServiceOffer[]>([])
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [topFaqs, setTopFaqs] = useState<FaqItem[] | null>(null)

    useEffect(() => {
        void Promise.all([
            getSite(),
            getOffers(),
            getTestimonials(),
        ]).then(([siteData, offerData, testimonialData]) => {
            setSite(siteData)
            setOffers(offerData)
            setTestimonials(testimonialData)
        })
        getFaqs()
            .then((data) => setTopFaqs(data.top))
            .catch(() => setTopFaqs([]))
    }, [])

    useEffect(() => {
        if (!site || !location.hash) return
        const id = location.hash.slice(1)
        const frame = requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        })
        return () => cancelAnimationFrame(frame)
    }, [site, location.hash])

    if (!site) {
        return (
            <div className="font-poppins relative min-h-svh overflow-hidden bg-[#e9e9e6]" aria-busy="true" aria-label="Loading homepage">
                <div className="absolute inset-x-0 top-0 z-10">
                    <div className="site-container flex items-center justify-between py-5">
                        <div className="h-8 w-36 animate-pulse rounded bg-black/10" />
                        <div className="hidden gap-6 lg:flex">
                            {Array.from({ length: 6 }, (_, index) => (
                                <div key={index} className="h-4 w-16 animate-pulse rounded bg-black/10" />
                            ))}
                        </div>
                        <div className="h-9 w-9 animate-pulse rounded-full bg-black/10 lg:hidden" />
                    </div>
                </div>

                <section className="flex min-h-svh items-center justify-center">
                    <div className="site-container flex justify-center py-32">
                        <div className="flex w-full max-w-4xl flex-col items-center" role="status">
                            <span className="sr-only">Preparing your journey</span>
                            <div className="h-[clamp(2rem,7vw,5.5rem)] w-[min(90%,48rem)] animate-pulse rounded-[3px] bg-black/10" />
                            <div className="mt-4 h-6 w-[min(65%,25rem)] animate-pulse rounded-[3px] bg-black/[0.08]" />
                            <div className="mt-7 h-12 w-52 animate-pulse rounded-[3px] bg-black/10" />
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    const homeSeo = getSeoForPath('/')

    return (
        <div className="luxury-paper font-poppins min-h-svh">
            <Seo title={homeSeo.title} description={homeSeo.description} path="/" />
            <TravelAgencyJsonLd site={site} />
            <Header />
            <main>
                <Hero />
                <Destinations />
                <About />
                <Offers offers={offers} />
                <WhyUs site={site} />
                <Testimonials testimonials={testimonials} />
                <Contact site={site} topFaqs={topFaqs} />
            </main>
            <Footer site={site} />
        </div>
    )
}
