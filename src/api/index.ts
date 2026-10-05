import { offers } from '../data/offers'
import { siteInfo } from '../data/site'
import type {
    FaqData,
    MerchCategory,
    MerchProduct,
    Partner,
    ServiceOffer,
    SiteInfo,
    Testimonial,
    Tour,
    TourSearchPage,
    TourSuggestion,
} from '../types/content'
import type { VisaCatalog } from '../types/visa'
import { buildVisaCatalog } from '../data/visaCatalog'
import { apiFetch } from '../lib/apiClient'

export async function getSite(): Promise<SiteInfo> {
    return siteInfo
}

export async function getPartners(): Promise<Partner[]> {
    return apiFetch<Partner[]>('/api/partners')
}

export async function getOffers(): Promise<ServiceOffer[]> {
    return offers
}

export async function getTestimonials(): Promise<Testimonial[]> {
    return apiFetch<Testimonial[]>('/api/testimonials')
}

export async function getFaqs(): Promise<FaqData> {
    return apiFetch<FaqData>('/api/faqs')
}

/** Falls back to the built-in catalog so the visa pages still render if the API is unreachable. */
export async function getVisaCatalog(): Promise<VisaCatalog> {
    try {
        return await apiFetch<VisaCatalog>('/api/visa')
    } catch {
        return buildVisaCatalog()
    }
}

export async function getTours(): Promise<Tour[]> {
    return apiFetch<Tour[]>('/api/tours')
}

export const TOUR_PAGE_SIZE = 12

export type TourSearchParams = {
    q: string
    regions: string[]
    dir: 'asc' | 'desc'
}

export async function searchTours(
    params: TourSearchParams,
    cursor: number,
    signal?: AbortSignal,
): Promise<TourSearchPage> {
    const search = new URLSearchParams({
        sort: 'name',
        dir: params.dir,
        cursor: String(cursor),
        limit: String(TOUR_PAGE_SIZE),
    })
    if (params.q.trim()) search.set('q', params.q.trim())
    if (params.regions.length > 0) search.set('regions', params.regions.join(','))
    return apiFetch<TourSearchPage>(`/api/tours/search?${search}`, { signal })
}

export const TOUR_SUGGEST_MIN_LENGTH = 3

export async function suggestTours(q: string, signal?: AbortSignal): Promise<TourSuggestion> {
    return apiFetch<TourSuggestion>(`/api/tours/suggest?${new URLSearchParams({ q })}`, { signal })
}

export async function getFeaturedTours(): Promise<Tour[]> {
    return apiFetch<Tour[]>('/api/tours/featured')
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
    try {
        return await apiFetch<Tour>(`/api/tours/${encodeURIComponent(slug)}`)
    } catch {
        return null
    }
}

export async function getMerch(): Promise<MerchProduct[]> {
    return apiFetch<MerchProduct[]>('/api/merch')
}

export async function getMerchCategories(): Promise<MerchCategory[]> {
    return apiFetch<MerchCategory[]>('/api/merch/categories')
}

export async function getMerchBySlug(slug: string): Promise<MerchProduct | null> {
    try {
        return await apiFetch<MerchProduct>(`/api/merch/${encodeURIComponent(slug)}`)
    } catch {
        return null
    }
}

export type CartApiItem = {
    id: string
    productId: string
    qty: number
    size?: string
    product: MerchProduct
}

export async function fetchCart(token: string) {
    const result = await apiFetch<{ items: CartApiItem[] }>('/api/cart', { token })
    return result.items
}

export async function addCartItem(
    token: string,
    input: { productId: string; qty?: number; size?: string },
) {
    const result = await apiFetch<{ item: CartApiItem }>('/api/cart/items', {
        method: 'POST',
        token,
        body: JSON.stringify({
            productId: input.productId,
            qty: input.qty ?? 1,
            size: input.size,
        }),
    })
    return result.item
}

export async function updateCartItem(token: string, itemId: string, qty: number) {
    if (qty <= 0) {
        await apiFetch<void>(`/api/cart/items/${encodeURIComponent(itemId)}`, {
            method: 'DELETE',
            token,
        })
        return null
    }

    const result = await apiFetch<{ item: CartApiItem }>(
        `/api/cart/items/${encodeURIComponent(itemId)}`,
        {
            method: 'PATCH',
            token,
            body: JSON.stringify({ qty }),
        },
    )
    return result.item
}

export async function removeCartItem(token: string, itemId: string) {
    await apiFetch<void>(`/api/cart/items/${encodeURIComponent(itemId)}`, {
        method: 'DELETE',
        token,
    })
}
