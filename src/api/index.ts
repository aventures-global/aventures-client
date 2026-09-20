import { merch } from '../data/merch'
import { offers } from '../data/offers'
import { partners } from '../data/partners'
import { siteInfo } from '../data/site'
import { testimonials } from '../data/testimonials'
import { tours } from '../data/tours'
import type {
  MerchProduct,
  Partner,
  ServiceOffer,
  SiteInfo,
  Testimonial,
  Tour,
} from '../types/content'

/** Simulated network delay so skeletons are visible during development. */
const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getSite(): Promise<SiteInfo> {
  await delay()
  return siteInfo
}

export async function getPartners(): Promise<Partner[]> {
  await delay()
  return partners
}

export async function getOffers(): Promise<ServiceOffer[]> {
  await delay()
  return offers
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await delay()
  return testimonials
}

export async function getTours(): Promise<Tour[]> {
  await delay()
  return tours
}

export async function getFeaturedTours(): Promise<Tour[]> {
  await delay()
  return tours.filter((tour) => tour.featured)
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  await delay()
  return tours.find((tour) => tour.slug === slug) ?? null
}

export async function getMerch(): Promise<MerchProduct[]> {
  await delay()
  return merch
}

export async function getMerchBySlug(slug: string): Promise<MerchProduct | null> {
  await delay()
  return merch.find((item) => item.slug === slug) ?? null
}
