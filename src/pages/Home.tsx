import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  getFeaturedTours,
  getOffers,
  getSite,
  getTestimonials,
} from '../api'
import About from '../components/home/About'
import Contact from '../components/home/Contact'
import Hero from '../components/home/Hero'
import Offers from '../components/home/Offers'
import SignatureExperiences from '../components/home/SignatureExperiences'
import Testimonials from '../components/home/Testimonials'
import WhyUs from '../components/home/WhyUs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import TravelAgencyJsonLd from '../components/seo/TravelAgencyJsonLd'
import { getSeoForPath } from '../data/seo'
import type { ServiceOffer, SiteInfo, Testimonial, Tour } from '../types/content'

export default function Home() {
  const location = useLocation()
  const [site, setSite] = useState<SiteInfo | null>(null)
  const [offers, setOffers] = useState<ServiceOffer[]>([])
  const [featured, setFeatured] = useState<Tour[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    void Promise.all([
      getSite(),
      getOffers(),
      getFeaturedTours(),
      getTestimonials(),
    ]).then(([siteData, offerData, featuredData, testimonialData]) => {
      setSite(siteData)
      setOffers(offerData)
      setFeatured(featuredData)
      setTestimonials(testimonialData)
    })
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
      <div className="min-h-svh bg-ink">
        <Header />
        <div className="site-container space-y-6 py-28">
          <div className="h-14 w-2/3 max-w-md skeleton-shimmer rounded-lg" />
          <div className="h-6 w-1/2 max-w-sm skeleton-shimmer rounded-lg" />
          <div className="h-11 w-36 skeleton-shimmer rounded-lg" />
        </div>
      </div>
    )
  }

  const homeSeo = getSeoForPath('/')

  return (
    <div className="min-h-svh bg-ink">
      <Seo title={homeSeo.title} description={homeSeo.description} path="/" />
      <TravelAgencyJsonLd site={site} />
      <Header />
      <main>
        <Hero site={site} />
        <About site={site} />
        <Offers offers={offers} />
        <SignatureExperiences tours={featured} />
        <WhyUs site={site} />
        <Testimonials testimonials={testimonials} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </div>
  )
}
