export type Partner = {
  id: string
  name: string
  logoSrc: string
}

export type ServiceOffer = {
  id: string
  title: string
  description: string
  icon: 'plane' | 'map' | 'car' | 'shield'
  href: string
  span: 'wide' | 'tall' | 'square'
}

export type WhyUsPoint = {
  id: string
  label: string
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  trip: string
  rating: number
}

export type TourItineraryDay = {
  day: number
  title: string
  description: string
}

export type Tour = {
  id: string
  slug: string
  title: string
  tagline: string
  shortDescription: string
  coverImage: string
  gallery: string[]
  duration: string
  startingPrice: string
  location: string
  highlights: string[]
  itinerary: TourItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  featured: boolean
}

export type MerchProduct = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: string
  category: string
  coverImage: string
  gallery: string[]
  sizes?: string[]
  inStock: boolean
}

export type SiteInfo = {
  brandName: string
  fullName: string
  tagline: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroFacts: string[]
  about: string
  aboutBody: string
  email: string
  phone: string
  phoneDisplay: string
  address: string
  addressLines: string[]
  facebookUrl: string
  instagramUrl: string
  socialHandles: {
    facebook: string
    instagram: string
  }
  whyUsIntro: string
  whyUsPoints: WhyUsPoint[]
  contactIntro: string
}
