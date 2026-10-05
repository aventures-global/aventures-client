export type Partner = {
    id: string
    name: string
    logoSrc: string
}

export type ServiceOffer = {
    id: string
    title: string
    description: string
    icon: 'plane' | 'map' | 'car' | 'shield' | 'bag'
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

export type TourExperience = {
    eyebrow: string
    headline: string
    summary: string
    body: string
    image: string
}

export type Tour = {
    id: string
    slug: string
    title: string
    tagline: string
    shortDescription: string
    coverImage: string
    location: string
    experiences: TourExperience[]
    storyTitles: string[]
    travelTips: string[]
    featured: boolean
    /** Set in the admin CMS; always present on API responses. */
    region?: string
}

export type TourSummary = Pick<Tour, 'id' | 'slug' | 'title' | 'tagline' | 'coverImage' | 'location' | 'featured' | 'region'>

export type TourSearchPage = {
    items: TourSummary[]
    nextCursor: number | null
    total: number
}

export type TourSuggestion =
    | { kind: 'spelling'; suggestion: string; matches: TourSummary[] }
    | { kind: 'covered'; place: string; country: string; isCountry: boolean; matches: TourSummary[] }
    | { kind: 'nearby'; place: string; matches: (TourSummary & { distanceKm: number })[] }
    | { kind: 'none' }

export type MerchProduct = {
    id: string
    slug: string
    name: string
    tagline: string
    description: string
    price: string
    categoryId: string
    category: string
    coverImage: string
    gallery: string[]
    sizes?: string[]
    inStock: boolean
}

export type MerchCategory = {
    id: string
    name: string
    sortOrder: number
    productCount: number
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
    tiktokUrl: string
    socialHandles: {
        facebook: string
        instagram: string
        tiktok: string
    }
    whyUsIntro: string
    whyUsPoints: WhyUsPoint[]
}

export type FaqItem = {
    id: string
    question: string
    answer: string
}

export type FaqCategoryGroup = {
    id: string
    name: string
    faqs: FaqItem[]
}

export type FaqData = {
    categories: FaqCategoryGroup[]
    top: FaqItem[]
}
