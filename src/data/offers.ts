import type { ServiceOffer } from '../types/content'

export const offers: ServiceOffer[] = [
  {
    id: 'flights-hotels',
    title: 'Flights & Hotels',
    description:
      'Competitive fares and carefully chosen stays, coordinated as one seamless booking.',
    icon: 'plane',
    href: '/flights',
    span: 'wide',
  },
  {
    id: 'visa',
    title: 'Visa Assistance',
    description:
      'Document guidance and application support so borders never slow your plans.',
    icon: 'shield',
    href: '/destinations',
    span: 'tall',
  },
  {
    id: 'itineraries',
    title: 'Custom Itineraries',
    description:
      'Private, paced experiences shaped around your dates, interests, and comfort.',
    icon: 'map',
    href: '/destinations',
    span: 'square',
  },
  {
    id: 'transfers',
    title: 'Guides & Transfers',
    description:
      'Airport meet-and-greet, private cars, and local guides who know every turn.',
    icon: 'car',
    href: '/cars',
    span: 'square',
  },
]
