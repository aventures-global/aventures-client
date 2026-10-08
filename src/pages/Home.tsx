import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    getFaqs,
    getOffers,
    getPartners,
    getSite,
    getTestimonials,
} from '../api'
import About from '../components/home/About'
import Contact from '../components/home/Contact'
import Destinations from '../components/home/Destinations'
import Hero from '../components/home/Hero'
import Offers from '../components/home/Offers'
import Partners from '../components/home/Partners'
import Testimonials from '../components/home/Testimonials'
import TravelerQuiz from '../components/home/TravelerQuiz'
import WhyUs from '../components/home/WhyUs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import TravelAgencyJsonLd from '../components/seo/TravelAgencyJsonLd'
import { getSeoForPath } from '../data/seo'
import { useSitePage } from '../hooks/useSitePage'
import type { FaqItem, Partner, ServiceOffer, SiteInfo, Testimonial } from '../types/content'

export default function Home() {
    const location = useLocation()
    const content = useSitePage('home')
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [offers, setOffers] = useState<ServiceOffer[]>([])
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [partners, setPartners] = useState<Partner[]>([])
    const [topFaqs, setTopFaqs] = useState<FaqItem[] | null>(null)

    useEffect(() => {
        void getSite().then(setSite)
        void getOffers().then(setOffers)
        getTestimonials()
            .then(setTestimonials)
            .catch(() => setTestimonials([]))
        getPartners()
            .then(setPartners)
            .catch(() => setPartners([]))
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

    const homeSeo = getSeoForPath('/')

    return (
        <div className="luxury-paper font-poppins min-h-svh">
            <Seo title={homeSeo.title} description={homeSeo.description} path="/" />
            {site && <TravelAgencyJsonLd site={site} />}
            <Header />
            <main>
                <Hero content={content.hero} />
                <div className="relative z-10 shadow-[0_-24px_50px_-30px_rgba(22,55,101,0.35)]">
                    <Destinations />
                    <About content={content.story} />
                    <Offers offers={offers} />
                    <WhyUs content={content.whyUs} />
                    {partners.length > 0 && <Partners partners={partners} />}
                    <TravelerQuiz />
                    <Testimonials testimonials={testimonials} />
                    {site && <Contact site={site} topFaqs={topFaqs} />}
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}
