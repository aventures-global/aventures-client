import { useEffect, useState } from 'react'
import { getVisaCatalog } from '../api'
import type { VisaCatalog } from '../types/visa'

let pending: Promise<VisaCatalog> | null = null

/** The visa catalog, shared across the finder and service pages. `null` while loading. */
export function useVisaCatalog() {
    const [catalog, setCatalog] = useState<VisaCatalog | null>(null)

    useEffect(() => {
        let active = true
        pending ??= getVisaCatalog().finally(() => {
            // Refetch on the next page visit so staff edits show without a full reload.
            pending = null
        })
        void pending.then((data) => {
            if (active) setCatalog(data)
        })
        return () => {
            active = false
        }
    }, [])

    return catalog
}
