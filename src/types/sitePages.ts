export type SitePageId = 'home' | 'about' | 'privacy' | 'terms'

export type TitledItem = { title: string; description: string }

export type HomePageContent = {
    hero: { title: string; subtitle: string; ctaLabel: string }
    story: { eyebrow: string; title: string; body: string; linkLabel: string }
    whyUs: { eyebrow: string; title: string; points: string[] }
}

export type AboutPageContent = {
    intro: string
    whyUs: { eyebrow: string; title: string; intro: string; pillars: TitledItem[]; promise: string[]; quote: string }
    founder: {
        eyebrow: string
        title: string
        /** Simple Markdown, so the related business can be a link. */
        intro: string
        name: string
        role: string
        story: string
        whyItMatters: string
        quote: string
    }
    origin: {
        eyebrow: string
        title: string
        intro: string
        story: string
        values: TitledItem[]
        mission: string
        vision: string
    }
    transparency: {
        eyebrow: string
        title: string
        intro: string
        principle: string
        contact: { address: string; email: string; phone: string }
        visas: string[]
        support: string[]
        disclaimer: string
        footnote: string
    }
}

export type LegalSectionContent = { id: string; label: string; title: string; body: string }

export type LegalPageContent = {
    subtitle: string
    /** Simple Markdown. */
    intro: string
    lastUpdated: string
    sections: LegalSectionContent[]
}

export type SitePageContentMap = {
    home: HomePageContent
    about: AboutPageContent
    privacy: LegalPageContent
    terms: LegalPageContent
}

export type SitePage<Id extends SitePageId = SitePageId> = {
    id: Id
    content: SitePageContentMap[Id]
    updatedAt: string | null
}
