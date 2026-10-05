import type { ServiceOffer } from '../types/content'

export const offers: ServiceOffer[] = [
    {
        id: 'flights',
        title: 'Flights',
        description:
            'Competitive fares and thoughtful routing, coordinated around your complete journey.',
        icon: 'plane',
        span: 'square',
    },
    {
        id: 'hotels',
        title: 'Hotels',
        description:
            'Carefully selected stays balancing location, comfort, character, and value.',
        icon: 'bag',
        span: 'square',
    },
    {
        id: 'itineraries',
        title: 'Travel Itineraries',
        description:
            'Thoughtfully paced journeys shaped around your dates, interests, and preferred way to travel.',
        icon: 'map',
        href: '/destinations',
        span: 'square',
    },
    {
        id: 'guides-drivers',
        title: 'Professional Guides & Drivers',
        description:
            'Trusted local professionals providing comfortable transport and meaningful destination insight.',
        icon: 'car',
        span: 'square',
    },
    {
        id: 'packages',
        title: 'Holiday Packages',
        description:
            'Curated escapes bringing flights, stays, experiences, and dedicated support together.',
        icon: 'bag',
        href: '/destinations',
        span: 'square',
    },
    {
        id: 'visa',
        title: 'Visa Assistance',
        description:
            'Clear document guidance and application support for a more confident journey.',
        icon: 'shield',
        href: '/visa-assistance',
        span: 'square',
    },
]
