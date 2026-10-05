export type VisaId = 'tourist' | 'fiance' | 'k2' | 'j1' | 'r1' | 'r2' | 'p1' | 'p2' | 'e2'

export type VisaPageSlug = 'tourist' | 'k1-k2' | 'j1' | 'r1-r2' | 'p1-p2' | 'e2'

export type PathId = 'visiting' | 'fiance' | 'exchange' | 'religious' | 'performance' | 'investing'

export type Readiness = 'yes' | 'arranging' | 'no' | 'unsure'

export type VisaChecklistGroup = {
    title: string
    items: string[]
}

export type VisaChecklistContent = {
    tagline: string
    intro: string
    groups: VisaChecklistGroup[]
    reminder: string
}

export type VisaServiceContent = {
    id: VisaId
    title: string
    shortLabel: string
    description: string
    /** Section id on its service page. */
    anchor: string
    /** Label above the card in the visa finder's Explore All grid. */
    category: string
    askVisaType: string
    faqCategoryId: string | null
    /** Category name, used when `faqCategoryId` is missing. */
    faqCategory: string
    introFaqId: string | null
    /** Question text, used when `introFaqId` is missing. */
    introQuestion: string
    qualifyFaqId: string | null
    qualifyQuestion: string
    checklist: VisaChecklistContent
    checklistPdf: { href: string; downloadName: string }
}

export type VisaPageContent = {
    slug: VisaPageSlug
    title: string
    description: string
    visas: VisaId[]
}

export type FinderPurposeOption = {
    id: string
    label: string
    /** `null` routes to the unsure result. */
    path: PathId | null
}

export type FinderOption = {
    id: string
    label: string
    /** `null` routes to the unsure result. */
    visa: VisaId | null
}

export type FinderQuestion = {
    title: string
    options: FinderOption[]
}

export type ReadinessQuestion = {
    title: string
    options: { id: Readiness; label: string }[]
}

export type ExploreLink = {
    id: 'tours' | 'ask'
    label: string
    note: string
    href: string
}

export type VisaFinderContent = {
    eyebrow: string
    heading: string
    disclaimer: string
    purpose: { title: string; options: FinderPurposeOption[] }
    roles: Record<PathId, FinderQuestion>
    readiness: Record<VisaId, ReadinessQuestion>
    notes: Record<Readiness, string>
    touristNotes: Record<Readiness, string>
    exploreLinks: ExploreLink[]
}

export type VisaCatalog = {
    pages: VisaPageContent[]
    services: VisaServiceContent[]
    finder: VisaFinderContent
}
