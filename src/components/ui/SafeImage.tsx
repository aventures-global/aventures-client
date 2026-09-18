import { useState } from 'react'

type SafeImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  skeletonClassName?: string
}

export default function SafeImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  skeletonClassName = '',
}: SafeImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Let callers override the fit; two object-* utilities would otherwise collide.
  const fitClass = imgClassName.includes('object-') ? '' : 'object-cover'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status !== 'loaded' && (
        <div
          className={`absolute inset-0 skeleton-shimmer ${skeletonClassName}`}
          aria-hidden
        />
      )}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${fitClass} transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-card">
          <div className="h-16 w-10 rounded-md bg-gold-gradient opacity-40 blur-sm" />
        </div>
      )}
    </div>
  )
}
