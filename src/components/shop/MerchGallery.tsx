import { useState } from 'react'
import SafeImage from '../ui/SafeImage'

type MerchGalleryProps = {
  name: string
  images: string[]
}

export default function MerchGallery({ name, images }: MerchGalleryProps) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  if (!current) return null

  return (
    <div className="space-y-3">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-card">
        <SafeImage
          key={current}
          src={current}
          alt={`${name} — photo ${active + 1}`}
          className="h-full w-full"
          imgClassName="object-cover object-center"
        />
      </div>

      {images.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="listbox"
          aria-label={`${name} photos`}
        >
          {images.map((src, index) => {
            const selected = index === active
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActive(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition sm:h-20 sm:w-20 ${
                  selected
                    ? 'border-gold ring-1 ring-gold/40'
                    : 'border-white/10 hover:border-gold/40'
                }`}
              >
                <SafeImage
                  src={src}
                  alt=""
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
