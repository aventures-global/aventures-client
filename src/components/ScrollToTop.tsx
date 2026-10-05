import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset window scroll when the visible page changes. A modal over a background route keeps that page put. */
export default function ScrollToTop() {
    const location = useLocation()
    const state = location.state as { backgroundLocation?: { pathname: string } } | null
    const pagePath = state?.backgroundLocation?.pathname ?? location.pathname
    const previousPagePath = useRef<string | null>(null)

    useEffect(() => {
        if (previousPagePath.current === pagePath) return
        previousPagePath.current = pagePath
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pagePath])

    return null
}
