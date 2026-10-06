export type AboutTabId = 'why-us' | 'behind-the-dream' | 'origin' | 'transparency'

export function aboutSectionPath(id: AboutTabId) {
    return `/about/${id}`
}

export const aboutTabs: { id: AboutTabId; label: string; shortLabel: string }[] = [
    { id: 'why-us', label: 'Why Us', shortLabel: 'Why Us' },
    { id: 'behind-the-dream', label: 'Behind the Dream', shortLabel: 'Behind the Dream' },
    { id: 'origin', label: 'Origin', shortLabel: 'Origin' },
    { id: 'transparency', label: 'Trust and Transparency', shortLabel: 'Trust and Transparency' },
]
