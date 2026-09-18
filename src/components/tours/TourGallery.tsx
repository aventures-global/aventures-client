import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Tour } from '../../types/content'
import SafeImage from '../ui/SafeImage'

type TourGalleryProps = {
  tour: Tour
}

export default function TourGallery({ tour }: TourGalleryProps) {
  const images = tour.gallery.length > 0 ? tour.gallery : [tour.coverImage]
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [tour.slug])

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-ink-card sm:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <SafeImage
              src={images[active]}
              alt={`${tour.title} photo ${active + 1}`}
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                active === index
                  ? 'border-gold'
                  : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <SafeImage src={src} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
