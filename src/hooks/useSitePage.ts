import { useQuery } from '@tanstack/react-query'
import { getSitePage } from '../api'
import { defaultSitePages } from '../data/sitePages'
import type { SitePageContentMap, SitePageId } from '../types/sitePages'

const STALE_TIME = 5 * 60_000

/** Stored copy for a site page; shows the built-in copy until the request settles. */
export function useSitePage<Id extends SitePageId>(id: Id): SitePageContentMap[Id] {
    const { data } = useQuery({
        queryKey: ['site-page', id],
        queryFn: () => getSitePage(id),
        staleTime: STALE_TIME,
    })
    return data?.content ?? defaultSitePages[id]
}
