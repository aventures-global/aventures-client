import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tracks which section the reader is in: the last one whose top has passed `offset`
 * pixels from the viewport top, or the final section once the page bottom is reached.
 */
export function useActiveSection(ids: string[], offset = 160) {
    const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)
    const lockUntil = useRef(0)
    const key = ids.join('|')

    useEffect(() => {
        const sectionIds = key ? key.split('|') : []
        if (sectionIds.length === 0) return

        let frame = 0
        const update = () => {
            frame = 0
            if (Date.now() < lockUntil.current) return
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
            let current = sectionIds[0]
            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top - offset <= 0) current = id
            }
            if (atBottom) current = sectionIds[sectionIds.length - 1]
            setActiveId(current)
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [key, offset])

    /** Marks `id` active right away and holds it while a smooth scroll settles. */
    const select = useCallback((id: string) => {
        lockUntil.current = Date.now() + 900
        setActiveId(id)
    }, [])

    return [activeId, select] as const
}
