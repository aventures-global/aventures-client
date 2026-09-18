import { useEffect, useState } from 'react'
import {
  getFeaturedTours,
  getOffers,
  getSite,
} from '../api'
import About from '../components/home/About'
import Contact from '../components/home/Contact'
import Hero from '../components/home/Hero'
import Offers from '../components/home/Offers'
import SignatureExperiences from '../components/home/SignatureExperiences'
import WhyUs from '../components/home/WhyUs'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import type { ServiceOffer, SiteInfo, Tour } from '../types/content'

export default function Home() {
  const [site, setSite] = useState<SiteInfo | null>(null)
  const [offers, setOffers] = useState<ServiceOffer[]>([])
  const [featured, setFeatured] = useState<Tour[]>([])

  useEffect(() => {
    void Promise.all([
      getSite(),
      getOffers(),
      getFeaturedTours(),
    ]).then(([siteData, offerData, featuredData]) => {
      setSite(siteData)
      setOffers(offerData)
      setFeatured(featuredData)
    })
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [site])

  if (!site) {
    return (
      <div className="min-h-svh bg-ink">
        <div className="site-container space-y-6 py-28">
          <div className="h-14 w-2/3 max-w-md skeleton-shimmer rounded-lg" />
          <div className="h-6 w-1/2 max-w-sm skeleton-shimmer rounded-lg" />
          <div className="h-11 w-36 skeleton-shimmer rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-ink">
      <Header />
      <main>
        <Hero site={site} />
        <About site={site} />
        <Offers offers={offers} />
        <SignatureExperiences tours={featured} />
        <WhyUs site={site} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </div>
  )
}
