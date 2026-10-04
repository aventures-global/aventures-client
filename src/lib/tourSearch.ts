import type { Tour } from '../types/content'

export type TourRegion =
    | 'philippines'
    | 'east-asia'
    | 'southeast-asia'
    | 'americas'
    | 'europe'

export type TourSort = 'featured' | 'name'

export type TourSearchFilters = {
    query: string
    region: TourRegion | 'all'
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

export const SORT_OPTIONS: { id: TourSort; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'name', label: 'Name · A–Z' },
]

export const DEFAULT_FILTERS: TourSearchFilters = {
    query: '',
    region: 'all',
    sort: 'featured',
}

export function getTourRegion(tour: Tour): TourRegion | null {
    return REGION_OPTIONS.some((option) => option.id !== 'all' && option.id === tour.region)
        ? (tour.region as TourRegion)
        : null
}

function matchesQuery(tour: Tour, query: string): boolean {
    const q = query.trim().toLowerCase()
    if (!q) return true

    const haystack = [
        tour.title,
        tour.tagline,
        tour.shortDescription,
        tour.location,
        ...tour.experiences.map((experience) => experience.headline),
        ...tour.storyTitles,
    ]
        .join(' ')
        .toLowerCase()

    return q.split(/\s+/).every((token) => haystack.includes(token))
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
        (tour) => matchesQuery(tour, filters.query) && matchesRegion(tour, filters.region),
    )

    if (filters.sort === 'name') {
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }
    // Keep the API order: it is the curated order set in the admin CMS.
    return filtered
}

export function hasActiveFilters(filters: TourSearchFilters): boolean {
    return filters.query.trim() !== '' || filters.region !== 'all' || filters.sort !== 'featured'
}

export function filtersFromSearchParams(params: URLSearchParams): TourSearchFilters {
    const query = params.get('q') ?? ''
    const regionRaw = params.get('region') ?? 'all'
    const sortRaw = params.get('sort') ?? 'featured'

    const region = REGION_OPTIONS.some((o) => o.id === regionRaw)
        ? (regionRaw as TourSearchFilters['region'])
        : 'all'
    const sort = SORT_OPTIONS.some((o) => o.id === sortRaw) ? (sortRaw as TourSort) : 'featured'

    return { query, region, sort }
}

export function searchParamsFromFilters(filters: TourSearchFilters): URLSearchParams {
    const params = new URLSearchParams()
    if (filters.query.trim()) params.set('q', filters.query.trim())
    if (filters.region !== 'all') params.set('region', filters.region)
    if (filters.sort !== 'featured') params.set('sort', filters.sort)
    return params
}
