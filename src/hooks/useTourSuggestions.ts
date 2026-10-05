import { useQuery } from '@tanstack/react-query'
import { suggestTours, TOUR_SUGGEST_MIN_LENGTH } from '../api'

/** Closest-destination suggestions for a query whose search came back empty. */
export function useTourSuggestions(q: string, searchFoundNothing: boolean) {
    const query = q.trim()
    return useQuery({
        queryKey: ['tour-suggest', query.toLowerCase()],
        queryFn: ({ signal }) => suggestTours(query, signal),
        enabled: searchFoundNothing && query.length >= TOUR_SUGGEST_MIN_LENGTH,
        staleTime: Infinity,
        retry: false,
    })
}
