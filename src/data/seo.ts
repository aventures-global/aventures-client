export const DEFAULT_OG_IMAGE = '/assets/images/AVENtures-globe.png'

export const DEFAULT_DESCRIPTION =
  'AVENtures Global Resources and Travel Agency — airfare, hotels, curated tours, and visa assistance worldwide.'

export type SeoRouteCopy = {
  title: string
  description: string
}

const routeCopy: Record<string, SeoRouteCopy> = {
  '/': {
    title: 'AVENtures Global — Travel Agency',
    description: DEFAULT_DESCRIPTION,
  },
  '/destinations': {
    title: 'Destinations — AVENtures',
    description:
      'Browse signature journeys across the Philippines, Asia, and beyond — curated private trips from AVENtures.',
  },
  '/flights': {
    title: 'Flights — AVENtures',
    description:
      'Competitive airfare search and booking support coordinated with your hotels and itinerary.',
  },
  '/hotels': {
    title: 'Hotels — AVENtures',
    description:
      'Curated stays worldwide — hotel arrangements that fit the pace of your private journey.',
  },
  '/cars': {
    title: 'Cars & Transfers — AVENtures',
    description:
      'Private transfers and car arrangements, from airport meet-and-greet to local guides.',
  },
  '/faq': {
    title: 'FAQs — AVENtures',
    description:
      'Answers about planning trips, visas, flights, hotels, and traveling with AVENtures Global.',
  },
  '/blog': {
    title: 'Blogs — AVENtures',
    description:
      'Travel notes and stories from the road. Explore destinations or get in touch to plan a trip.',
  },
  '/sitemap': {
    title: 'Sitemaps — AVENtures',
    description: 'Index of pages, services, and destinations on the AVENtures website.',
  },
}

export function getSeoForPath(pathname: string): SeoRouteCopy {
  return (
    routeCopy[pathname] ?? {
      title: 'AVENtures Global — Travel Agency',
      description: DEFAULT_DESCRIPTION,
    }
  )
}
