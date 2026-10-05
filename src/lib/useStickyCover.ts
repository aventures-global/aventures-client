import { useEffect, useRef, useState } from 'react'

/**
 * Sticky offset for a block that the next section slides over. Blocks taller
 * than the viewport stick by their bottom edge so every part stays reachable.
 */
export function useStickyCover<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [top, setTop] = useState(0)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const update = () => setTop(Math.min(0, window.innerHeight - node.offsetHeight))
        update()
        const observer = new ResizeObserver(update)
        observer.observe(node)
        window.addEventListener('resize', update)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', update)
        }
    }, [])

    return [ref, top] as const
}
