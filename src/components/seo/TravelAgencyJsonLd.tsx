import { useEffect } from 'react'
import type { SiteInfo } from '../../types/content'
import { absoluteUrl, getSiteUrl } from '../../lib/siteUrl'
import { DEFAULT_OG_IMAGE } from '../../data/seo'

type JsonLdProps = {
  site: SiteInfo
}

/** Injects TravelAgency / LocalBusiness structured data for the homepage. */
export default function TravelAgencyJsonLd({ site }: JsonLdProps) {
  useEffect(() => {
    const id = 'aventures-travel-agency-jsonld'
    const existing = document.getElementById(id)
    existing?.remove()

    const data = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: site.fullName,
      alternateName: site.brandName,
      description: site.about,
      url: getSiteUrl(),
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.addressLines[0],
        addressLocality: 'Sacramento',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      sameAs: [site.facebookUrl, site.instagramUrl].filter(Boolean),
    }

    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.getElementById(id)?.remove()
    }
  }, [site])

  return null
}
