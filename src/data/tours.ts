import type { Tour } from '../types/content'
import { EXPERIENCE_CATEGORIES, STORY_COUNT, defaultExperienceBody, defaultTravelTips } from './destinationContent'

const img = {
    philippine: '/assets/images/philippine-discovery.jpg?v=5',
    cebu: '/assets/images/cebutour.jpg?v=4',
    boracay: '/assets/images/boracay-serenity.jpg?v=5',
    korea: '/assets/images/south-korea-kwave.jpg?v=4',
    japan: '/assets/images/japan-tradition.jpg?v=4',
    usa: '/assets/images/usa-dream-big.jpg?v=4',
    thailand: '/assets/images/thailand-calling.jpg?v=1',
    indonesia: '/assets/images/indonesia-escape.jpg?v=1',
    europe: '/assets/images/europe-journeys.jpg?v=1',
    siargao: '/assets/images/siargao-island.jpg?v=1',
    bohol: '/assets/images/bohol-countryside.jpg?v=1',
    coron: '/assets/images/coron-lagoons.jpg?v=1',
    china: '/assets/images/china-tour.jpg?v=1',
    california: '/assets/images/california-coast.jpg?v=1',
    hokkaido: '/assets/images/hokkaido-seasons.jpg?v=1',
    jeju: '/assets/images/jeju-island.jpg?v=1',
    phuket: '/assets/images/phuket-phi-phi.jpg?v=1',
    chiangMai: '/assets/images/chiang-mai-highlands.jpg?v=1',
    labuanBajo: '/assets/images/labuan-bajo-komodo.jpg?v=1',
}

const g = (name: string, n: number) =>
    Array.from({ length: n }, (_, i) => `/assets/images/gallery/${name}-gallery-${i + 1}.jpg?v=1`)

type DestinationSeed = Omit<Tour, 'experiences' | 'storyTitles' | 'travelTips'> & {
    highlights: string[]
    images: string[]
}

function destination({ highlights, images, ...tour }: DestinationSeed): Tour {
    return {
        ...tour,
        experiences: EXPERIENCE_CATEGORIES.map((category, index) => ({
            eyebrow: category.label,
            headline: highlights[index % highlights.length],
            summary: category.summary,
            body: defaultExperienceBody(tour.location),
            image: images[index % images.length],
        })),
        storyTitles: highlights.slice(0, STORY_COUNT),
        travelTips: defaultTravelTips(tour.location),
    }
}

export const tours: Tour[] = [
    destination({
        id: 'philippine-discovery',
        slug: 'philippine-discovery',
        title: 'Philippine Discovery',
        tagline: 'Curated multi-island adventure',
        shortDescription:
            'Limestone lagoons, island hopping, and refined coastal stays across Palawan.',
        coverImage: img.philippine,
        images: g('philippine', 5),
        location: 'Palawan, Philippines',
        highlights: [
            'Private island-hopping in El Nido',
            'Boutique beachfront lodging',
            'Sunset cruise with canapés',
            'Airport transfers & bilingual host',
        ],
        featured: true,
    }),
    destination({
        id: 'cebu-tour',
        slug: 'cebu-tour',
        title: 'Cebu Tour',
        tagline: 'Coastlines, culture & city lights',
        shortDescription:
            'From Magellan’s Cross to turquoise shores — Cebu’s highlights in one elegant itinerary.',
        coverImage: img.cebu,
        images: g('cebu', 4),
        location: 'Cebu, Philippines',
        highlights: [
            'Historic Cebu City walking tour',
            'Kawasan Falls canyoneering option',
            'Moalboal sardine run snorkel',
            'Waterfront hotel stay',
        ],
        featured: true,
    }),
    destination({
        id: 'boracay-serenity',
        slug: 'boracay-serenity',
        title: 'Boracay Serenity',
        tagline: 'White sand, soft evenings',
        shortDescription:
            'Unhurried days on Station 1 beaches with sailing at sunset and quiet luxury stays.',
        coverImage: img.boracay,
        images: g('boracay', 3),
        location: 'Boracay, Philippines',
        highlights: [
            'Beachfront boutique resort',
            'Private paraw sunset sail',
            'Island hopping to Crystal Cove',
            'Spa credit included',
        ],
        featured: true,
    }),
    destination({
        id: 'south-korea-kwave',
        slug: 'south-korea-kwave',
        title: 'South Korea — Experience the K-Wave',
        tagline: 'Culture, cuisine & city nights',
        shortDescription:
            'Seoul’s skyline, historic palaces, and K-culture highlights — crafted for first-timers and return explorers.',
        coverImage: img.korea,
        images: g('korea', 5),
        location: 'Seoul & surrounds, South Korea',
        highlights: [
            'Gyeongbokgung palace & hanbok option',
            'Gangnam & Hongdae evenings',
            'DMZ day trip available',
            'Street-food tasting walk',
        ],
        featured: false,
    }),
    destination({
        id: 'japan-tradition',
        slug: 'japan-tradition',
        title: 'Japan — Where Tradition Meets Tomorrow',
        tagline: 'Temples, cities & timeless craft',
        shortDescription:
            'From timeless temples and breathtaking landscapes to vibrant cities and unforgettable experiences — a private Japan journey for first-timers and return explorers.',
        coverImage: img.japan,
        images: g('japan', 4),
        location: 'Tokyo & Kyoto, Japan',
        highlights: [
            'Tokyo skyline & Shibuya evenings',
            'Kyoto temples and traditional districts',
            'Optional Mount Fuji day trip',
            'Kaiseki or izakaya tasting dinner',
        ],
        featured: false,
    }),
    destination({
        id: 'usa-dream-big',
        slug: 'usa-dream-big',
        title: 'USA — Dream Big, Travel Further',
        tagline: 'Iconic cities & open horizons',
        shortDescription:
            'Experience iconic cities, stunning landscapes, and endless adventures across the USA — coast to coast, paced for discovery and comfort.',
        coverImage: img.usa,
        images: g('usa', 6),
        location: 'United States',
        highlights: [
            'New York skyline & neighborhood walks',
            'West Coast city or national-park option',
            'Private transfers on arrival days',
            'Flexible routing by inquiry',
        ],
        featured: false,
    }),
    destination({
        id: 'thailand-calling',
        slug: 'thailand-calling',
        title: 'Thailand — Culture, Cuisine & Beaches',
        tagline: 'Temples, flavors & island light',
        shortDescription:
            'Experience the perfect mix of vibrant culture, mouthwatering Thai cuisine, breathtaking temples, and stunning beaches — all in one unforgettable adventure.',
        coverImage: img.thailand,
        images: g('thailand', 3),
        location: 'Bangkok & islands, Thailand',
        highlights: [
            'Grand Palace & Wat Arun highlights',
            'Thai street-food tasting walk',
            'Island beach day or floating market option',
            'Private transfers on arrival days',
        ],
        featured: false,
    }),
    destination({
        id: 'indonesia-escape',
        slug: 'indonesia-escape',
        title: 'Indonesia — Your Tropical Adventure Awaits',
        tagline: 'Beaches, islands & vibrant culture',
        shortDescription:
            'Escape to Indonesia and discover stunning beaches, lush landscapes, vibrant culture, and unforgettable island experiences — from Bali’s beauty to hidden tropical gems.',
        coverImage: img.indonesia,
        images: g('indonesia', 5),
        location: 'Bali & islands, Indonesia',
        highlights: [
            'Ubud temples & rice-terrace walks',
            'Coastal sunset at a sea temple',
            'Beach day or island hopping option',
            'Private transfers on arrival days',
        ],
        featured: false,
    }),
    destination({
        id: 'europe-journeys',
        slug: 'europe-journeys',
        title: 'Europe — Every City Tells a Story',
        tagline: 'Landmarks, streets & rich history',
        shortDescription:
            'Explore iconic landmarks, charming streets, rich history, and breathtaking scenery across some of Europe’s most beautiful destinations.',
        coverImage: img.europe,
        images: g('europe', 4),
        location: 'Western Europe',
        highlights: [
            'Iconic capital landmarks',
            'Historic old-town walks',
            'Flexible multi-city routing',
            'Private transfers on arrival days',
        ],
        featured: false,
    }),
    destination({
        id: 'siargao-island',
        slug: 'siargao-island',
        title: 'Siargao — Island Life & Surf',
        tagline: 'Waves, lagoons & laid-back days',
        shortDescription:
            'Surf breaks, rock pools, and palm-lined roads on the Philippines’ easygoing surf island — paced for beginners and seasoned islanders alike.',
        coverImage: img.siargao,
        images: g('siargao', 3),
        location: 'Siargao, Philippines',
        highlights: [
            'Cloud 9 boardwalk & surf lesson',
            'Magpupungko rock pools at low tide',
            'Naked, Daku & Guyam island hopping',
            'Coconut-road scooter or van tour',
        ],
        featured: false,
    }),
    destination({
        id: 'bohol-countryside',
        slug: 'bohol-countryside',
        title: 'Bohol — Hills, River & Shore',
        tagline: 'Chocolate Hills & Panglao beaches',
        shortDescription:
            'The Chocolate Hills, tarsier sanctuaries, a slow Loboc River lunch cruise, and Panglao’s white-sand shores in one gentle itinerary.',
        coverImage: img.bohol,
        images: g('bohol', 3),
        location: 'Bohol, Philippines',
        highlights: [
            'Chocolate Hills viewpoint',
            'Tarsier sanctuary visit',
            'Loboc River lunch cruise',
            'Panglao beach and island hopping',
        ],
        featured: false,
    }),
    destination({
        id: 'coron-lagoons',
        slug: 'coron-lagoons',
        title: 'Coron — Lagoons & Limestone',
        tagline: 'Clear lakes, wrecks & hidden coves',
        shortDescription:
            'Kayangan Lake, the Twin Lagoon, and world-famous wreck dives — Coron’s limestone islands explored by private bangka.',
        coverImage: img.coron,
        images: g('coron', 3),
        location: 'Coron, Palawan, Philippines',
        highlights: [
            'Kayangan Lake & Twin Lagoon',
            'Shipwreck snorkel or dive option',
            'Private island-hopping bangka',
            'Beach picnic on a secluded cove',
        ],
        featured: false,
    }),
    destination({
        id: 'china-tour',
        slug: 'china-tour',
        title: 'China — Ancient Wonders, Modern Cities',
        tagline: 'Great Wall, palaces & skylines',
        shortDescription:
            'Walk the Great Wall, step inside the Forbidden City, and end with Shanghai’s glittering Bund — imperial history and modern China in one journey.',
        coverImage: img.china,
        images: g('china', 3),
        location: 'Beijing & Shanghai, China',
        highlights: [
            'Great Wall at Mutianyu',
            'Forbidden City & Tiananmen Square',
            'Shanghai Bund evening cruise',
            'Peking duck dinner',
        ],
        featured: false,
    }),
    destination({
        id: 'california-coast',
        slug: 'california-coast',
        title: 'California — Golden Coast & City Lights',
        tagline: 'Bridges, highways & national parks',
        shortDescription:
            'San Francisco’s Golden Gate, the Pacific Coast Highway, Yosemite’s granite valleys, and Southern California sunsets — the West Coast at its most iconic.',
        coverImage: img.california,
        images: g('california', 3),
        location: 'California, United States',
        highlights: [
            'Golden Gate Bridge & San Francisco',
            'Pacific Coast Highway drive',
            'Yosemite National Park option',
            'Santa Monica & Los Angeles',
        ],
        featured: false,
    }),
    destination({
        id: 'hokkaido-seasons',
        slug: 'hokkaido-seasons',
        title: 'Hokkaido — Japan’s Four Seasons North',
        tagline: 'Flower fields, snow & hot springs',
        shortDescription:
            'Lavender fields in summer, snowy canals in winter, and steaming onsen all year — Japan’s northern island for travelers who love wide-open landscapes.',
        coverImage: img.hokkaido,
        images: g('hokkaido', 3),
        location: 'Sapporo & Furano, Hokkaido, Japan',
        highlights: [
            'Furano lavender and flower farms',
            'Otaru Canal evening walk',
            'Sapporo miso ramen tasting',
            'Onsen ryokan overnight stay',
        ],
        featured: false,
    }),
    destination({
        id: 'jeju-island',
        slug: 'jeju-island',
        title: 'Jeju — Korea’s Volcanic Island',
        tagline: 'Craters, coastlines & black pork',
        shortDescription:
            'Sunrise at Seongsan Ilchulbong, coastal Olle trails, Udo Island’s white beaches, and Jeju black pork — South Korea’s favorite island escape.',
        coverImage: img.jeju,
        images: g('jeju', 3),
        location: 'Jeju Island, South Korea',
        highlights: [
            'Seongsan Ilchulbong sunrise peak',
            'Udo Island cycling day',
            'Olle trail coastal walk',
            'Jeju black pork barbecue',
        ],
        featured: false,
    }),
    destination({
        id: 'phuket-phi-phi',
        slug: 'phuket-phi-phi',
        title: 'Phuket & Phi Phi — Andaman Escape',
        tagline: 'Limestone bays & island days',
        shortDescription:
            'Longtail boats to the Phi Phi Islands, sea-kayaking Phang Nga Bay, and colorful Old Phuket Town — Thailand’s Andaman coast in one easy escape.',
        coverImage: img.phuket,
        images: g('phuket', 3),
        location: 'Phuket & Phi Phi Islands, Thailand',
        highlights: [
            'Phi Phi Islands speedboat day',
            'Phang Nga Bay sea kayaking',
            'Old Phuket Town walk',
            'Seaside Thai seafood dinner',
        ],
        featured: false,
    }),
    destination({
        id: 'chiang-mai-highlands',
        slug: 'chiang-mai-highlands',
        title: 'Chiang Mai — Temples & Highlands',
        tagline: 'Golden temples & mountain air',
        shortDescription:
            'Doi Suthep at sunrise, centuries-old temples in the old city, an ethical elephant sanctuary, and lantern-lit night markets in northern Thailand.',
        coverImage: img.chiangMai,
        images: g('chiang-mai', 3),
        location: 'Chiang Mai, Thailand',
        highlights: [
            'Wat Phra That Doi Suthep',
            'Old City temple walk',
            'Ethical elephant sanctuary visit',
            'Night bazaar & khao soi tasting',
        ],
        featured: false,
    }),
    destination({
        id: 'labuan-bajo-komodo',
        slug: 'labuan-bajo-komodo',
        title: 'Labuan Bajo — Komodo Islands Voyage',
        tagline: 'Dragons, pink sand & phinisi sails',
        shortDescription:
            'Padar Island viewpoints, Komodo dragons, Pink Beach snorkeling, and sunsets aboard a traditional phinisi — Indonesia’s wildest island adventure.',
        coverImage: img.labuanBajo,
        images: g('labuan-bajo', 3),
        location: 'Labuan Bajo & Komodo, Indonesia',
        highlights: [
            'Padar Island sunrise hike',
            'Komodo dragon ranger trek',
            'Pink Beach snorkeling',
            'Phinisi boat sunset cruise',
        ],
        featured: false,
    }),
]
