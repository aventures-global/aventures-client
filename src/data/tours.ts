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
]
