import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Tab = {
  id: string
  label: string
}

type SectionTabsProps<T extends Tab> = {
  tabs: readonly T[]
  value: T['id']
  onChange: (id: T['id']) => void
  label: string
}

export default function SectionTabs<T extends Tab>({
  tabs,
  value,
  onChange,
  label,
}: SectionTabsProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanLeft(el.scrollLeft > 4)
    setCanRight(max > 4 && el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [sync, tabs])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const active = scroller.querySelector<HTMLElement>('[data-active="true"]')
    if (!active) return

    const padding = 24
    const left = active.offsetLeft - padding
    const right = active.offsetLeft + active.offsetWidth + padding
    const viewLeft = scroller.scrollLeft
    const viewRight = viewLeft + scroller.clientWidth

    if (left < viewLeft) {
      scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    } else if (right > viewRight) {
      scroller.scrollTo({ left: right - scroller.clientWidth, behavior: 'smooth' })
    }
  }, [value])

  const scrollByDir = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 160, behavior: 'smooth' })
  }

  return (
    <div className="relative min-w-0 max-w-full">
      <div
        ref={scrollerRef}
        className="no-scrollbar min-w-0 overflow-x-auto overscroll-x-contain border-b border-white/10 [touch-action:pan-x]"
      >
        <nav
          aria-label={label}
          className="flex w-max min-w-full snap-x snap-mandatory flex-nowrap gap-8 sm:gap-7"
        >
          {tabs.map((item) => {
            const active = value === item.id
            return (
              <button
                key={item.id}
                type="button"
                data-active={active}
                aria-selected={active}
                onClick={() => onChange(item.id)}
                className={`relative snap-start shrink-0 pb-3.5 text-sm tracking-wide whitespace-nowrap transition-colors ${
                  active ? 'text-white' : 'text-silver/55 hover:text-silver'
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full ${
                    active ? 'bg-gold' : 'bg-transparent'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink to-transparent transition-opacity ${
          canLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink to-transparent transition-opacity ${
          canRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {canLeft ? (
        <button
          type="button"
          aria-label="Scroll tabs left"
          onClick={() => scrollByDir(-1)}
          className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-gold shadow-[0_0_12px_rgba(0,0,0,0.45)]"
        >
          <ChevronLeft size={16} strokeWidth={1.75} />
        </button>
      ) : null}

      {canRight ? (
        <button
          type="button"
          aria-label="Scroll tabs right"
          onClick={() => scrollByDir(1)}
          className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-gold shadow-[0_0_12px_rgba(0,0,0,0.45)]"
        >
          <ChevronRight size={16} strokeWidth={1.75} />
        </button>
      ) : null}
    </div>
  )
}
