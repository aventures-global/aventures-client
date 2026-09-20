import type { Tour } from '../types/content'

export type TourRegion =
  | 'philippines'
  | 'east-asia'
  | 'southeast-asia'
  | 'americas'
  | 'europe'

export type DurationBand = 'short' | 'week' | 'extended'

export type TourSort =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'name'

export type TourSearchFilters = {
  query: string
  region: TourRegion | 'all'
  duration: DurationBand | 'all'
  sort: TourSort
}

export const REGION_OPTIONS: { id: TourRegion | 'all'; label: string }[] = [
  { id: 'all', label: 'All regions' },
  { id: 'philippines', label: 'Philippines' },
  { id: 'east-asia', label: 'East Asia' },
  { id: 'southeast-asia', label: 'Southeast Asia' },
  { id: 'americas', label: 'Americas' },
  { id: 'europe', label: 'Europe' },
]

export const DURATION_OPTIONS: { id: DurationBand | 'all'; label: string }[] = [
  { id: 'all', label: 'Any length' },
  { id: 'short', label: 'Up to 5 days' },
  { id: 'week', label: '6–7 days' },
  { id: 'extended', label: '8+ days' },
]

export const SORT_OPTIONS: { id: TourSort; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · low to high' },
  { id: 'price-desc', label: 'Price · high to low' },
  { id: 'duration-asc', label: 'Duration · shortest' },
  { id: 'name', label: 'Name · A–Z' },
]

export const DEFAULT_FILTERS: TourSearchFilters = {
  query: '',
  region: 'all',
  duration: 'all',
  sort: 'featured',
}

export function parseTourDays(duration: string): number {
  const match = duration.match(/(\d+)\s*days?/i)
  return match ? Number(match[1]) : 0
}

export function parseTourPrice(startingPrice: string): number {
  const digits = startingPrice.replace(/[^0-9]/g, '')
  return digits ? Number(digits) : 0
}

export function getTourRegion(tour: Tour): TourRegion | null {
  const location = tour.location.toLowerCase()
  if (location.includes('philippines')) return 'philippines'
  if (location.includes('korea') || location.includes('japan')) return 'east-asia'
  if (location.includes('thailand') || location.includes('indonesia')) {
    return 'southeast-asia'
  }
  if (
    location.includes('united states') ||
    location.includes('california') ||
    location.includes('usa')
  ) {
    return 'americas'
  }
  if (location.includes('europe')) return 'europe'
  return null
}

function matchesQuery(tour: Tour, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const haystack = [
    tour.title,
    tour.tagline,
    tour.shortDescription,
    tour.location,
    tour.duration,
    tour.startingPrice,
    ...tour.highlights,
  ]
    .join(' ')
    .toLowerCase()

  return q.split(/\s+/).every((token) => haystack.includes(token))
}

function matchesDuration(tour: Tour, band: DurationBand | 'all'): boolean {
  if (band === 'all') return true
  const days = parseTourDays(tour.duration)
  if (band === 'short') return days > 0 && days <= 5
  if (band === 'week') return days >= 6 && days <= 7
  return days >= 8
}

function matchesRegion(tour: Tour, region: TourRegion | 'all'): boolean {
  if (region === 'all') return true
  return getTourRegion(tour) === region
}

export function filterAndSortTours(
  tours: Tour[],
  filters: TourSearchFilters,
): Tour[] {
  const filtered = tours.filter(
    (tour) =>
      matchesQuery(tour, filters.query) &&
      matchesRegion(tour, filters.region) &&
      matchesDuration(tour, filters.duration),
  )

  const sorted = [...filtered]
  switch (filters.sort) {
    case 'price-asc':
      sorted.sort((a, b) => parseTourPrice(a.startingPrice) - parseTourPrice(b.startingPrice))
      break
    case 'price-desc':
      sorted.sort((a, b) => parseTourPrice(b.startingPrice) - parseTourPrice(a.startingPrice))
      break
    case 'duration-asc':
      sorted.sort((a, b) => parseTourDays(a.duration) - parseTourDays(b.duration))
      break
    case 'name':
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
      break
  }

  return sorted
}

export function hasActiveFilters(filters: TourSearchFilters): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.region !== 'all' ||
    filters.duration !== 'all' ||
    filters.sort !== 'featured'
  )
}

export function filtersFromSearchParams(params: URLSearchParams): TourSearchFilters {
  const query = params.get('q') ?? ''
  const regionRaw = params.get('region') ?? 'all'
  const durationRaw = params.get('duration') ?? 'all'
  const sortRaw = params.get('sort') ?? 'featured'

  const region = REGION_OPTIONS.some((o) => o.id === regionRaw)
    ? (regionRaw as TourSearchFilters['region'])
    : 'all'
  const duration = DURATION_OPTIONS.some((o) => o.id === durationRaw)
    ? (durationRaw as TourSearchFilters['duration'])
    : 'all'
  const sort = SORT_OPTIONS.some((o) => o.id === sortRaw)
    ? (sortRaw as TourSort)
    : 'featured'

  return { query, region, duration, sort }
}

export function searchParamsFromFilters(filters: TourSearchFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.query.trim()) params.set('q', filters.query.trim())
  if (filters.region !== 'all') params.set('region', filters.region)
  if (filters.duration !== 'all') params.set('duration', filters.duration)
  if (filters.sort !== 'featured') params.set('sort', filters.sort)
  return params
}
