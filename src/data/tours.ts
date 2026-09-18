import type { Tour } from '../types/content'

const img = {
  philippine: '/assets/images/philippine-discovery.png',
  cebu: '/assets/images/cebutour.png',
  boracay: '/assets/images/boracay-serenity.png',
  globe: '/assets/images/AVENtures-globe.png',
}

export const tours: Tour[] = [
  {
    id: 'philippine-discovery',
    slug: 'philippine-discovery',
    title: 'Philippine Discovery',
    tagline: 'Curated multi-island adventure',
    shortDescription:
      'Limestone lagoons, island hopping, and refined coastal stays across Palawan.',
    coverImage: img.philippine,
    gallery: [img.philippine, img.cebu, img.boracay, img.globe],
    duration: '7 days / 6 nights',
    startingPrice: 'From $1,890',
    location: 'Palawan, Philippines',
    highlights: [
      'Private island-hopping in El Nido',
      'Boutique beachfront lodging',
      'Sunset cruise with canapés',
      'Airport transfers & bilingual host',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Puerto Princesa',
        description:
          'Meet-and-greet at the airport, scenic transfer to El Nido, and an evening welcome dinner overlooking the bay.',
      },
      {
        day: 2,
        title: 'Secret Lagoons & Cliffs',
        description:
          'Guided exploration of Big Lagoon and Secret Beach with a private banca and picnic lunch on a quiet sandbar.',
      },
      {
        day: 3,
        title: 'Island Culture & Slow Afternoon',
        description:
          'Visit a local craft market, optional spa hour, and free time for kayaking or paddleboarding.',
      },
      {
        day: 4,
        title: 'Coron Highlands Preview',
        description:
          'Optional flight hop to Coron for twin lagoons and a private viewpoint sunset.',
      },
      {
        day: 5,
        title: 'Reef Snorkel Day',
        description:
          'Snorkel crystal reefs with a marine guide, followed by a candlelit beach dinner.',
      },
      {
        day: 6,
        title: 'Leisure & Farewell',
        description:
          'Unscheduled morning for rest, then a farewell cocktail cruise at golden hour.',
      },
      {
        day: 7,
        title: 'Departure',
        description:
          'Private transfer to the airport with assistance through check-in.',
      },
    ],
    inclusions: [
      '6 nights boutique accommodation',
      'Daily breakfast and select dinners',
      'Private island tours and transfers',
      'English-speaking local host',
    ],
    exclusions: [
      'International airfare',
      'Travel insurance',
      'Personal expenses and tips',
    ],
    featured: true,
  },
  {
    id: 'cebu-tour',
    slug: 'cebu-tour',
    title: 'Cebu Tour',
    tagline: 'Coastlines, culture & city lights',
    shortDescription:
      'From Magellan’s Cross to turquoise shores — Cebu’s highlights in one elegant itinerary.',
    coverImage: img.cebu,
    gallery: [img.cebu, img.philippine, img.boracay],
    duration: '5 days / 4 nights',
    startingPrice: 'From $1,240',
    location: 'Cebu, Philippines',
    highlights: [
      'Historic Cebu City walking tour',
      'Kawasan Falls canyoneering option',
      'Moalboal sardine run snorkel',
      'Waterfront hotel stay',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Cebu',
        description:
          'Airport greeting, hotel check-in, and an evening stroll through the historic quarter.',
      },
      {
        day: 2,
        title: 'Heritage & Harbor',
        description:
          'Basilica del Santo Niño, Magellan’s Cross, and a private lunch overlooking the harbor.',
      },
      {
        day: 3,
        title: 'South Coast Adventure',
        description:
          'Day trip to Kawasan Falls or Moalboal reefs with gourmet picnic and return by dusk.',
      },
      {
        day: 4,
        title: 'Island Escape',
        description:
          'Optional day trip to Bantayan or Malapascua for white-sand leisure.',
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Leisurely morning and private airport transfer.',
      },
    ],
    inclusions: [
      '4 nights hotel accommodation',
      'Daily breakfast',
      'Private city and coastal tours',
      'Airport transfers',
    ],
    exclusions: [
      'Domestic and international flights',
      'Optional adventure surcharges',
      'Meals not listed',
    ],
    featured: true,
  },
  {
    id: 'boracay-serenity',
    slug: 'boracay-serenity',
    title: 'Boracay Serenity',
    tagline: 'White sand, soft evenings',
    shortDescription:
      'Unhurried days on Station 1 beaches with sailing at sunset and quiet luxury stays.',
    coverImage: img.boracay,
    gallery: [img.boracay, img.philippine, img.cebu],
    duration: '4 days / 3 nights',
    startingPrice: 'From $980',
    location: 'Boracay, Philippines',
    highlights: [
      'Beachfront boutique resort',
      'Private paraw sunset sail',
      'Island hopping to Crystal Cove',
      'Spa credit included',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Shoreline',
        description:
          'Speedboat transfer from Caticlan, welcome drink, and free afternoon on White Beach.',
      },
      {
        day: 2,
        title: 'Island Hopping',
        description:
          'Private boat to nearby coves with snorkeling gear and a beach barbecue lunch.',
      },
      {
        day: 3,
        title: 'Sail & Spa',
        description:
          'Morning spa treatment, afternoon free, and a classic paraw sunset sail.',
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Check-out and assisted transfer to the airport pier.',
      },
    ],
    inclusions: [
      '3 nights beachfront stay',
      'Daily breakfast',
      'Sunset sail experience',
      'Spa credit',
    ],
    exclusions: [
      'Flights to Caticlan / Kalibo',
      'Alcoholic beverages',
      'Travel insurance',
    ],
    featured: true,
  },
  {
    id: 'south-korea-kwave',
    slug: 'south-korea-kwave',
    title: 'South Korea — Experience the K-Wave',
    tagline: 'Culture, cuisine & city nights',
    shortDescription:
      'Seoul’s skyline, historic palaces, and K-culture highlights — crafted for first-timers and return explorers.',
    coverImage: img.globe,
    gallery: [img.globe, img.philippine, img.cebu],
    duration: '6 days / 5 nights',
    startingPrice: 'From $2,150',
    location: 'Seoul & surrounds, South Korea',
    highlights: [
      'Gyeongbokgung palace & hanbok option',
      'Gangnam & Hongdae evenings',
      'DMZ day trip available',
      'Street-food tasting walk',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Seoul',
        description:
          'Airport meet, hotel check-in in Gangnam or Myeongdong, and a gentle evening orientation walk.',
      },
      {
        day: 2,
        title: 'Palaces & Bukchon',
        description:
          'Guided visit to Gyeongbokgung and Bukchon Hanok Village with optional hanbok photo hour.',
      },
      {
        day: 3,
        title: 'Modern Seoul',
        description:
          'N Seoul Tower views, Insadong crafts, and a curated K-beauty and café circuit.',
      },
      {
        day: 4,
        title: 'Day Trip Choice',
        description:
          'Choose DMZ highlights or a coastal escape to Nami Island / Gapyeong.',
      },
      {
        day: 5,
        title: 'Food & Nightlife',
        description:
          'Market tasting tour, Korean BBQ dinner, and free time in Hongdae or Itaewon.',
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Hotel checkout and private transfer to ICN or GMP.',
      },
    ],
    inclusions: [
      '5 nights centrally located hotel',
      'Daily breakfast',
      'Private or small-group city tours',
      'Airport transfers',
    ],
    exclusions: [
      'International airfare',
      'Korea Electronic Travel Authorization fees',
      'Personal shopping and tips',
    ],
    featured: false,
  },
]
