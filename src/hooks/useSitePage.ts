import { useQuery } from '@tanstack/react-query'
import { getSitePage } from '../api'
import { defaultSitePages } from '../data/sitePages'
import type { AboutPageContent, SitePageContentMap, SitePageId } from '../types/sitePages'

const STALE_TIME = 5 * 60_000

function withAboutDefaults(content: AboutPageContent): AboutPageContent {
    if (content.partner) return content
    return { ...content, partner: defaultSitePages.about.partner }
}

/** Stored copy for a site page; shows the built-in copy until the request settles. */
export function useSitePage<Id extends SitePageId>(id: Id): SitePageContentMap[Id] {
    const { data } = useQuery({
        queryKey: ['site-page', id],
        queryFn: () => getSitePage(id),
        staleTime: STALE_TIME,
    })
    const content = data?.content ?? defaultSitePages[id]
    if (id === 'about') return withAboutDefaults(content as AboutPageContent) as SitePageContentMap[Id]
    return content
}
