import { useQuery, useQueryClient, type InfiniteData, type QueryClient } from '@tanstack/react-query'
import { getTestimonials, getTourBySlug, getTours } from '../api'
import type { Tour, TourSearchPage } from '../types/content'

const STALE_TIME = 5 * 60_000
const GC_TIME = 30 * 60_000

/** A tour already in the cache (full list first, then search summaries) to show while the full tour loads. */
function cachedTour(queryClient: QueryClient, slug: string): Tour | undefined {
    const full = queryClient.getQueryData<Tour[]>(['tours'])?.find((tour) => tour.slug === slug)
    if (full) return full

    for (const [, data] of queryClient.getQueriesData<InfiniteData<TourSearchPage>>({ queryKey: ['tour-search'] })) {
        const summary = data?.pages.flatMap((page) => page.items).find((tour) => tour.slug === slug)
        if (summary) {
            return { ...summary, shortDescription: '', experiences: [], storyTitles: [], travelTips: [] }
        }
    }
    return undefined
}

export function useTour(slug: string | undefined) {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['tour', slug],
        queryFn: () => getTourBySlug(slug!),
        enabled: Boolean(slug),
        placeholderData: () => (slug ? cachedTour(queryClient, slug) : undefined),
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
    })
}

export function useTours() {
    return useQuery({ queryKey: ['tours'], queryFn: getTours, staleTime: STALE_TIME, gcTime: GC_TIME })
}

export function useTestimonials() {
    return useQuery({ queryKey: ['testimonials'], queryFn: getTestimonials, staleTime: STALE_TIME, gcTime: GC_TIME })
}
