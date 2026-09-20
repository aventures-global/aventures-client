import type { Tour } from '../types/content'

const img = {
  philippine: '/assets/images/philippine-discovery.jpg?v=5',
  cebu: '/assets/images/cebutour.jpg?v=4',
  boracay: '/assets/images/boracay-serenity.jpg?v=5',
  globe: '/assets/images/AVENtures-globe.png',
  korea: '/assets/images/south-korea-kwave.jpg?v=4',
  japan: '/assets/images/japan-tradition.jpg?v=4',
  usa: '/assets/images/usa-dream-big.jpg?v=4',
  thailand: '/assets/images/thailand-calling.jpg?v=1',
  indonesia: '/assets/images/indonesia-escape.jpg?v=1',
  europe: '/assets/images/europe-journeys.jpg?v=1',
}

const g = (name: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/assets/images/gallery/${name}-gallery-${i + 1}.jpg?v=1`)

export const tours: Tour[] = [
  {
    id: 'philippine-discovery',
    slug: 'philippine-discovery',
    title: 'Philippine Discovery',
    tagline: 'Curated multi-island adventure',
    shortDescription:
      'Limestone lagoons, island hopping, and refined coastal stays across Palawan.',
    coverImage: img.philippine,
    gallery: g('philippine', 5),
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
    gallery: g('cebu', 4),
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
    gallery: g('boracay', 3),
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
    coverImage: img.korea,
    gallery: g('korea', 5),
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
  {
    id: 'japan-tradition',
    slug: 'japan-tradition',
    title: 'Japan — Where Tradition Meets Tomorrow',
    tagline: 'Temples, cities & timeless craft',
    shortDescription:
      'From timeless temples and breathtaking landscapes to vibrant cities and unforgettable experiences — a private Japan journey for first-timers and return explorers.',
    coverImage: img.japan,
    gallery: g('japan', 4),
    duration: '7 days / 6 nights',
    startingPrice: 'From $2,480',
    location: 'Tokyo & Kyoto, Japan',
    highlights: [
      'Tokyo skyline & Shibuya evenings',
      'Kyoto temples and traditional districts',
      'Optional Mount Fuji day trip',
      'Kaiseki or izakaya tasting dinner',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Tokyo',
        description:
          'Airport meet, hotel check-in in Shinjuku or Ginza, and a gentle evening orientation walk.',
      },
      {
        day: 2,
        title: 'Classic Tokyo',
        description:
          'Meiji Shrine, Harajuku crafts, and a curated afternoon in Asakusa with skyline views at dusk.',
      },
      {
        day: 3,
        title: 'Modern City Rhythm',
        description:
          'TeamLab or museum hour, Shibuya Crossing, and free time for shopping or a private food walk.',
      },
      {
        day: 4,
        title: 'Travel to Kyoto',
        description:
          'Shinkansen transfer west, hotel check-in near Gion or Kawaramachi, and an evening stroll in the old quarter.',
      },
      {
        day: 5,
        title: 'Temples & Gardens',
        description:
          'Guided visits to Fushimi Inari and Arashiyama, with optional tea ceremony or bamboo grove walk.',
      },
      {
        day: 6,
        title: 'Day Trip Choice',
        description:
          'Choose Mount Fuji / Hakone highlights or a slower day among Kyoto’s quieter shrines and ateliers.',
      },
      {
        day: 7,
        title: 'Departure',
        description:
          'Hotel checkout and private transfer to NRT, HND, or KIX as arranged.',
      },
    ],
    inclusions: [
      '6 nights centrally located hotels',
      'Daily breakfast',
      'Private or small-group city tours',
      'Airport and intercity transfers as listed',
    ],
    exclusions: [
      'International airfare',
      'Japan tourist tax and personal shopping',
      'Optional day-trip surcharges',
    ],
    featured: false,
  },
  {
    id: 'usa-dream-big',
    slug: 'usa-dream-big',
    title: 'USA — Dream Big, Travel Further',
    tagline: 'Iconic cities & open horizons',
    shortDescription:
      'Experience iconic cities, stunning landscapes, and endless adventures across the USA — coast to coast, paced for discovery and comfort.',
    coverImage: img.usa,
    gallery: g('usa', 6),
    duration: '8 days / 7 nights',
    startingPrice: 'From $2,690',
    location: 'United States',
    highlights: [
      'New York skyline & neighborhood walks',
      'West Coast city or national-park option',
      'Private transfers on arrival days',
      'Flexible routing by inquiry',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive East Coast',
        description:
          'Airport greeting in New York (or your chosen gateway), hotel check-in, and an evening skyline orientation.',
      },
      {
        day: 2,
        title: 'City Icons',
        description:
          'Curated highlights — landmarks, museums, and a neighborhood food walk matched to your pace.',
      },
      {
        day: 3,
        title: 'Local Rhythm',
        description:
          'Free morning, optional Broadway or harbor cruise, and evening at leisure.',
      },
      {
        day: 4,
        title: 'Cross-Country Hop',
        description:
          'Domestic flight west (or south) with assisted connections and hotel check-in at the next base.',
      },
      {
        day: 5,
        title: 'West Coast or Parks',
        description:
          'Choose urban California highlights or a guided national-park day — arranged around your travel style.',
      },
      {
        day: 6,
        title: 'Scenic Escape',
        description:
          'Coastal drive, desert viewpoints, or vineyard afternoon — your host shapes the day to the season.',
      },
      {
        day: 7,
        title: 'Leisure & Farewell',
        description:
          'Unscheduled morning for rest or shopping, then a farewell dinner overlooking the city or coast.',
      },
      {
        day: 8,
        title: 'Departure',
        description:
          'Private transfer to the departure airport with assistance through check-in.',
      },
    ],
    inclusions: [
      '7 nights hotel accommodation',
      'Daily breakfast',
      'Private city orientation tours',
      'Airport transfers on arrival and departure days',
    ],
    exclusions: [
      'International and domestic airfare',
      'National-park entry fees where applicable',
      'Personal expenses and tips',
    ],
    featured: false,
  },
  {
    id: 'thailand-calling',
    slug: 'thailand-calling',
    title: 'Thailand — Culture, Cuisine & Beaches',
    tagline: 'Temples, flavors & island light',
    shortDescription:
      'Experience the perfect mix of vibrant culture, mouthwatering Thai cuisine, breathtaking temples, and stunning beaches — all in one unforgettable adventure.',
    coverImage: img.thailand,
    gallery: g('thailand', 3),
    duration: '7 days / 6 nights',
    startingPrice: 'From $2,180',
    location: 'Bangkok & islands, Thailand',
    highlights: [
      'Grand Palace & Wat Arun highlights',
      'Thai street-food tasting walk',
      'Island beach day or floating market option',
      'Private transfers on arrival days',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Bangkok',
        description:
          'Airport meet, hotel check-in near the river or Sukhumvit, and a gentle evening orientation stroll.',
      },
      {
        day: 2,
        title: 'Temples & Tradition',
        description:
          'Guided visit to the Grand Palace precinct and Wat Arun, with time for riverside photos at golden hour.',
      },
      {
        day: 3,
        title: 'Flavors of Bangkok',
        description:
          'Market and street-food tasting walk, optional Thai cooking class, and free time for shopping or spa.',
      },
      {
        day: 4,
        title: 'Day Trip Choice',
        description:
          'Choose a floating market circuit, Ayutthaya heritage, or a coastal escape arranged around your pace.',
      },
      {
        day: 5,
        title: 'Island Light',
        description:
          'Fly or transfer to a beach base — Phuket, Krabi, or Koh Samui — for sand, swimming, and sunset.',
      },
      {
        day: 6,
        title: 'Leisure & Farewell',
        description:
          'Unscheduled morning by the shore, then a farewell dinner with Thai flavors.',
      },
      {
        day: 7,
        title: 'Departure',
        description:
          'Hotel checkout and private transfer to the departure airport with assistance through check-in.',
      },
    ],
    inclusions: [
      '6 nights hotel accommodation',
      'Daily breakfast',
      'Private or small-group city tours',
      'Airport transfers as listed',
    ],
    exclusions: [
      'International and domestic airfare',
      'Visa fees where applicable',
      'Personal shopping and tips',
    ],
    featured: false,
  },
  {
    id: 'indonesia-escape',
    slug: 'indonesia-escape',
    title: 'Indonesia — Your Tropical Adventure Awaits',
    tagline: 'Beaches, islands & vibrant culture',
    shortDescription:
      'Escape to Indonesia and discover stunning beaches, lush landscapes, vibrant culture, and unforgettable island experiences — from Bali’s beauty to hidden tropical gems.',
    coverImage: img.indonesia,
    gallery: g('indonesia', 5),
    duration: '7 days / 6 nights',
    startingPrice: 'From $2,090',
    location: 'Bali & islands, Indonesia',
    highlights: [
      'Ubud temples & rice-terrace walks',
      'Coastal sunset at a sea temple',
      'Beach day or island hopping option',
      'Private transfers on arrival days',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Bali',
        description:
          'Airport meet, hotel check-in in Seminyak, Ubud, or a coastal base, and a gentle evening orientation.',
      },
      {
        day: 2,
        title: 'Temples & Highlands',
        description:
          'Guided visit to iconic temples and rice terraces, with time for crafts and café culture in Ubud.',
      },
      {
        day: 3,
        title: 'Coastal Rituals',
        description:
          'Sea-temple sunset circuit, optional spa hour, and free time along the shore.',
      },
      {
        day: 4,
        title: 'Island Choice',
        description:
          'Choose a beach day, Nusa islands hop, or a quieter cultural village circuit.',
      },
      {
        day: 5,
        title: 'Local Flavors',
        description:
          'Market visit and Indonesian tasting dinner, with an unscheduled afternoon for rest or surfing.',
      },
      {
        day: 6,
        title: 'Leisure & Farewell',
        description:
          'Free morning by the pool or beach, then a farewell dinner overlooking the coast.',
      },
      {
        day: 7,
        title: 'Departure',
        description:
          'Hotel checkout and private transfer to DPS with assistance through check-in.',
      },
    ],
    inclusions: [
      '6 nights hotel accommodation',
      'Daily breakfast',
      'Private or small-group tours as listed',
      'Airport transfers',
    ],
    exclusions: [
      'International airfare',
      'Visa on arrival fees where applicable',
      'Personal shopping and tips',
    ],
    featured: false,
  },
  {
    id: 'europe-journeys',
    slug: 'europe-journeys',
    title: 'Europe — Every City Tells a Story',
    tagline: 'Landmarks, streets & rich history',
    shortDescription:
      'Explore iconic landmarks, charming streets, rich history, and breathtaking scenery across some of Europe’s most beautiful destinations.',
    coverImage: img.europe,
    gallery: g('europe', 4),
    duration: '8 days / 7 nights',
    startingPrice: 'From $3,150',
    location: 'Western Europe',
    highlights: [
      'Iconic capital landmarks',
      'Historic old-town walks',
      'Flexible multi-city routing',
      'Private transfers on arrival days',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive First Capital',
        description:
          'Airport greeting, hotel check-in in a central district, and an evening orientation stroll.',
      },
      {
        day: 2,
        title: 'City Icons',
        description:
          'Guided highlights of landmark avenues, museums, and viewpoints paced for discovery.',
      },
      {
        day: 3,
        title: 'Local Rhythm',
        description:
          'Free morning for cafés or shopping, optional river cruise, and evening at leisure.',
      },
      {
        day: 4,
        title: 'Onward to City Two',
        description:
          'High-speed train or short-haul flight to the next base, with assisted connections and hotel check-in.',
      },
      {
        day: 5,
        title: 'Heritage & Streets',
        description:
          'Old-town walking tour, cathedral or palace precinct, and a curated tasting lunch.',
      },
      {
        day: 6,
        title: 'Day Trip Choice',
        description:
          'Choose a countryside château circuit, alpine viewpoint, or a neighboring historic town.',
      },
      {
        day: 7,
        title: 'Leisure & Farewell',
        description:
          'Unscheduled morning for galleries or boutiques, then a farewell dinner in a classic quarter.',
      },
      {
        day: 8,
        title: 'Departure',
        description:
          'Private transfer to the departure airport with assistance through check-in.',
      },
    ],
    inclusions: [
      '7 nights hotel accommodation',
      'Daily breakfast',
      'Private or small-group city tours',
      'Airport transfers on arrival and departure days',
    ],
    exclusions: [
      'International and intra-Europe airfare or rail tickets',
      'Schengen visa fees where applicable',
      'Personal expenses and tips',
    ],
    featured: false,
  },
]
