import type { MerchProduct } from '../types/content'

const merchImg = {
  teeHero: '/assets/images/merch/journey-tee-hero.png',
  teeDetail: '/assets/images/merch/journey-tee-detail.png',
  toteHero: '/assets/images/merch/globe-tote-hero.png',
  toteDetail: '/assets/images/merch/globe-tote-detail.png',
  palawanHero: '/assets/images/merch/palawan-print-hero.png',
  palawanDetail: '/assets/images/merch/palawan-print-detail.png',
  kyotoHero: '/assets/images/merch/kyoto-print-hero.png',
  kyotoDetail: '/assets/images/merch/kyoto-print-detail.png',
  boracayHero: '/assets/images/merch/boracay-print-hero.png',
  boracayDetail: '/assets/images/merch/boracay-print-detail.png',
}

export const merch: MerchProduct[] = [
  {
    id: 'journey-tee',
    slug: 'journey-tee',
    name: 'Journey Tee',
    tagline: 'Soft cotton, gold wordmark',
    description:
      'A relaxed crewneck tee with the AVENtures wordmark in gold. Soft midweight cotton for travel days and easy evenings at home.',
    price: '$32',
    category: 'Apparel',
    coverImage: merchImg.teeHero,
    gallery: [merchImg.teeHero, merchImg.teeDetail],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'globe-tote',
    slug: 'globe-tote',
    name: 'Globe Tote',
    tagline: 'Everyday carry with the globe mark',
    description:
      'A sturdy canvas tote featuring the AVENtures globe. Room for a passport pouch, light jacket, and a paperback for the flight.',
    price: '$28',
    category: 'Bags',
    coverImage: merchImg.toteHero,
    gallery: [merchImg.toteHero, merchImg.toteDetail],
    inStock: true,
  },
  {
    id: 'palawan-print',
    slug: 'palawan-print',
    name: 'Palawan Fine Art Print',
    tagline: 'Limestone lagoons, archival print',
    description:
      'A destination photograph from the Philippine Discovery journey — limestone cliffs and quiet water. Printed on archival matte paper, ready to frame. Choose your size below.',
    price: '$48',
    category: 'Photography',
    coverImage: merchImg.palawanHero,
    gallery: [merchImg.palawanHero, merchImg.palawanDetail],
    sizes: ['8×10"', '11×14"', '16×20"'],
    inStock: true,
  },
  {
    id: 'kyoto-print',
    slug: 'kyoto-print',
    name: 'Kyoto Evening Print',
    tagline: 'Temple light, archival print',
    description:
      'An evening frame from Japan Tradition — warm temple light and quiet streets. Archival matte print for the wall that still feels like travel.',
    price: '$48',
    category: 'Photography',
    coverImage: merchImg.kyotoHero,
    gallery: [merchImg.kyotoHero, merchImg.kyotoDetail],
    sizes: ['8×10"', '11×14"', '16×20"'],
    inStock: true,
  },
  {
    id: 'boracay-print',
    slug: 'boracay-print',
    name: 'Boracay Horizon Print',
    tagline: 'Coastal calm, archival print',
    description:
      'A horizon study from Boracay Serenity — soft sand, open sky, and the pace of a private coastal stay. Printed on archival matte paper.',
    price: '$48',
    category: 'Photography',
    coverImage: merchImg.boracayHero,
    gallery: [merchImg.boracayHero, merchImg.boracayDetail],
    sizes: ['8×10"', '11×14"', '16×20"'],
    inStock: true,
  },
]
