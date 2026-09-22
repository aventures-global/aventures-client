import { offers } from '../data/offers'
import { siteInfo } from '../data/site'
import type {
  MerchProduct,
  Partner,
  ServiceOffer,
  SiteInfo,
  Testimonial,
  Tour,
} from '../types/content'
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

export async function getTours(): Promise<Tour[]> {
  return apiFetch<Tour[]>('/api/tours')
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
