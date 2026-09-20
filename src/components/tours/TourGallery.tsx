import { useEffect, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Tour } from '../../types/content'
import SafeImage from '../ui/SafeImage'

type TourGalleryProps = {
  tour: Tour
}

export default function TourGallery({ tour }: TourGalleryProps) {
  const images = tour.gallery.length > 0 ? tour.gallery : [tour.coverImage]
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  useEffect(() => {
    setViewerIndex(null)
  }, [tour.slug])

  const closeViewer = useCallback(() => setViewerIndex(null), [])

  const showPrev = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null || images.length === 0) return current
      return (current - 1 + images.length) % images.length
    })
  }, [images.length])

  const showNext = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null || images.length === 0) return current
      return (current + 1) % images.length
    })
  }, [images.length])

  useEffect(() => {
    if (viewerIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [viewerIndex, closeViewer, showPrev, showNext])

  if (images.length === 0) return null

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-serif text-2xl text-gold-gradient">Gallery</h2>
          <p className="text-[10px] uppercase tracking-[0.18em] text-silver/50">
            Scroll · tap to enlarge
          </p>
        </div>

        <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:rgba(212,175,55,0.35)_transparent]">
          <div className="flex w-max gap-3 px-1">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setViewerIndex(index)}
                className="group relative aspect-[4/3] w-[min(78vw,18rem)] shrink-0 overflow-hidden rounded-xl border border-white/8 text-left transition hover:border-gold/40 sm:w-72"
                aria-label={`Open ${tour.title} photo ${index + 1}`}
              >
                <SafeImage
                  src={src}
                  alt={`${tour.title} photo ${index + 1}`}
                  className="h-full w-full"
                  imgClassName="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewerIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${tour.title} gallery viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={closeViewer}
          >
            <button
              type="button"
              onClick={closeViewer}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 p-2 text-white transition hover:border-gold/40 hover:text-gold sm:right-6 sm:top-6"
              aria-label="Close gallery viewer"
            >
              <X size={18} strokeWidth={1.6} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    showPrev()
                  }}
                  className="absolute left-3 z-10 rounded-full border border-white/15 bg-black/50 p-2 text-white transition hover:border-gold/40 hover:text-gold sm:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    showNext()
                  }}
                  className="absolute right-3 z-10 rounded-full border border-white/15 bg-black/50 p-2 text-white transition hover:border-gold/40 hover:text-gold sm:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} strokeWidth={1.5} />
                </button>
              </>
            )}

            <motion.div
              key={images[viewerIndex]}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative flex max-h-[min(82svh,900px)] max-w-[min(92vw,1100px)] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[viewerIndex]}
                alt={`${tour.title} photo ${viewerIndex + 1}`}
                className="max-h-[min(78svh,860px)] max-w-full rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-silver/60">
                {viewerIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
