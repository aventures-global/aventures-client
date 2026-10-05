import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { searchTours, type TourSearchParams } from '../api'

export function useTourSearch(params: TourSearchParams) {
    return useInfiniteQuery({
        queryKey: ['tour-search', params],
        queryFn: ({ pageParam, signal }) => searchTours(params, pageParam, signal),
        initialPageParam: 0,
        getNextPageParam: (last) => last.nextCursor,
        placeholderData: keepPreviousData,
    })
}
