import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE } from '../../data/seo'
import { absoluteUrl } from '../../lib/siteUrl'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: string
  noIndex?: boolean
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', 'AVENtures')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', imageUrl)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      const robots = document.head.querySelector('meta[name="robots"]')
      robots?.remove()
    }
  }, [title, description, path, image, type, noIndex])

  return null
}
