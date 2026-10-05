import { Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

type LoadMoreSentinelProps = {
    hasNextPage: boolean
    isFetchingNextPage: boolean
    onLoadMore: () => void
}

export default function LoadMoreSentinel({ hasNextPage, isFetchingNextPage, onLoadMore }: LoadMoreSentinelProps) {
    const ref = useRef<HTMLDivElement>(null)
    const onLoadMoreRef = useRef(onLoadMore)

    useEffect(() => {
        onLoadMoreRef.current = onLoadMore
    }, [onLoadMore])

    useEffect(() => {
        const el = ref.current
        if (!el || !hasNextPage || isFetchingNextPage) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) onLoadMoreRef.current()
            },
            { rootMargin: '400px 0px' },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage])

    if (!hasNextPage) return null

    return (
        <div ref={ref} className="site-container mt-10 flex justify-center">
            <button
                type="button"
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
                className="inline-flex items-center gap-2 rounded-full border border-royal/25 px-6 py-2.5 text-sm font-medium text-royal transition hover:border-[#9b7512] hover:text-[#9b7512] disabled:opacity-60"
            >
                {isFetchingNextPage ? <Loader2 size={15} className="animate-spin" aria-hidden /> : null}
                {isFetchingNextPage ? 'Loading…' : 'Load more journeys'}
            </button>
        </div>
    )
}
