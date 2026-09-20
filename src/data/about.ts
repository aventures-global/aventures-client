export type AboutSpecialty = {
  id: string
  label: string
  href?: string
}

export type AboutService = {
  id: string
  title: string
  description: string
}

export const aboutPage = {
  eyebrow: 'Our story',
  intro:
    'AVENtures Global Resources and Travel Agency is a full-service travel agency offering curated local and international experiences. From our Sacramento base, we plan trips that feel considered — not pieced together from separate bookings.',
  story:
    'We specialize in tours across the Philippines including Cebu, Siargao, and Boracay, as well as California tours and destinations worldwide. Whether you need airfare and hotels, a custom itinerary, or help with visas, one team stays with you from the first conversation to your return home.',
  specialtiesIntro: 'Where we focus',
  specialties: [
    {
      id: 'cebu',
      label: 'Cebu',
      href: '/destinations/cebu-tour',
    },
    {
      id: 'siargao',
      label: 'Siargao',
    },
    {
      id: 'boracay',
      label: 'Boracay',
      href: '/destinations/boracay-serenity',
    },
    {
      id: 'california',
      label: 'California tours',
      href: '/destinations',
    },
    {
      id: 'worldwide',
      label: 'Destinations worldwide',
      href: '/destinations',
    },
  ] satisfies AboutSpecialty[],
  servicesIntro: 'How we help',
  services: [
    {
      id: 'airfare-hotels',
      title: 'Airfare & hotel bookings',
      description:
        'Competitive fares and carefully chosen stays, coordinated as one seamless booking.',
    },
    {
      id: 'itineraries',
      title: 'Customized travel itineraries worldwide',
      description:
        'Private, paced experiences shaped around your dates, interests, and comfort.',
    },
    {
      id: 'guides',
      title: 'Professional guides & drivers',
      description:
        'Airport meet-and-greet, private cars, and local guides who know every turn.',
    },
    {
      id: 'packages',
      title: 'Holiday packages (local & international)',
      description:
        'Curated holiday packages for the Philippines, California, and destinations around the world.',
    },
    {
      id: 'visa',
      title: 'Visa assistance',
      description:
        'Support for J1, K1/K2, P1/P2, E2, and R1 visas in partnership with an immigration lawyer — so borders never slow your plans.',
    },
    {
      id: 'merchandise',
      title: 'Merchandise marketplace',
      description:
        'Branded apparel and destination photography prints from the journeys we plan.',
    },
  ] satisfies AboutService[],
  ctaTitle: 'Ready to plan your trip?',
  ctaBody:
    'Tell us where you want to go. We will shape a journey that feels effortless from the first inquiry to your return home.',
  ctaPrimary: 'Contact us',
  ctaSecondary: 'Browse destinations',
}
