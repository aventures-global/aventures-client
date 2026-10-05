import type {
    Readiness,
    VisaCatalog,
    VisaId,
    VisaPageContent,
    VisaServiceContent,
} from '../types/visa'
import { visaChecklists } from './visaChecklists'
import {
    ASK_AVENTURES_HREF,
    extraExploreLinks,
    purposeQuestion,
    readinessNotes,
    readinessQuestions,
    roleQuestions,
    touristReadinessNotes,
    visaPages,
    visaServices,
} from './visaFinder'

const exploreCategory: Record<VisaId, string> = {
    tourist: 'Visit',
    fiance: 'Family',
    k2: 'Family',
    j1: 'Exchange',
    r1: 'Religious',
    r2: 'Religious',
    p1: 'Performance',
    p2: 'Performance',
    e2: 'Investment',
}

/** The built-in visa catalog. Seeds the database and stands in when the API is unreachable. */
export function buildVisaCatalog(): VisaCatalog {
    return {
        pages: visaPages.map((page) => ({ ...page, visas: [...page.visas] })),
        services: visaServices.map((service) => {
            const checklist = visaChecklists[service.id]
            return {
                id: service.id,
                title: service.title,
                shortLabel: service.shortLabel,
                description: service.description,
                anchor: service.anchor,
                category: exploreCategory[service.id],
                askVisaType: service.askVisaType,
                faqCategoryId: null,
                faqCategory: service.faqCategory,
                introFaqId: null,
                introQuestion: service.introQuestion,
                qualifyFaqId: null,
                qualifyQuestion: service.qualifyQuestion ?? '',
                checklist: {
                    tagline: checklist.tagline,
                    intro: checklist.intro ?? '',
                    groups: checklist.groups.map((group) => ({ title: group.title, items: [...group.items] })),
                    reminder: checklist.reminder,
                },
                checklistPdf: { ...service.checklist },
            }
        }),
        finder: {
            eyebrow: 'Visa services',
            heading: 'Where is your AVENture taking you?',
            disclaimer:
                'Your answers are only a starting point. The appropriate visa category depends on your individual circumstances and the specific purpose of your intended travel.',
            purpose: {
                title: purposeQuestion.title,
                options: purposeQuestion.options.map((option) => ({ ...option })),
            },
            roles: Object.fromEntries(
                Object.entries(roleQuestions).map(([path, question]) => [
                    path,
                    { title: question.title, options: question.options.map((option) => ({ ...option })) },
                ]),
            ) as VisaCatalog['finder']['roles'],
            readiness: Object.fromEntries(
                Object.entries(readinessQuestions).map(([visa, question]) => [
                    visa,
                    { title: question.title, options: question.options.map((option) => ({ ...option })) },
                ]),
            ) as VisaCatalog['finder']['readiness'],
            notes: { ...readinessNotes },
            touristNotes: { ...touristReadinessNotes },
            exploreLinks: extraExploreLinks.map((link) => ({ ...link, id: link.id as 'tours' | 'ask' })),
        },
    }
}

export const START_VISA_ASSISTANCE_HREF = '/#contact'

export { ASK_AVENTURES_HREF }

export function visaPagePath(slug: string) {
    return `/services/visa/${slug}`
}

export function findVisaPage(catalog: VisaCatalog, slug: string | undefined) {
    return catalog.pages.find((page) => page.slug === slug)
}

export function findVisaService(catalog: VisaCatalog, id: VisaId) {
    return catalog.services.find((service) => service.id === id)
}

export function pageForVisa(catalog: VisaCatalog, id: VisaId): VisaPageContent | undefined {
    return catalog.pages.find((page) => page.visas.includes(id))
}

export function visaServiceHref(catalog: VisaCatalog, service: VisaServiceContent) {
    const page = pageForVisa(catalog, service.id)
    if (!page) return '/visa-assistance'
    const path = visaPagePath(page.slug)
    return page.visas.length > 1 ? `${path}#${service.anchor}` : path
}

/** Ask AVENtures with this visa already chosen in the form. */
export function askAboutVisaHref(service: VisaServiceContent) {
    return `${ASK_AVENTURES_HREF}?visa=${encodeURIComponent(service.askVisaType)}`
}

export function readinessNote(catalog: VisaCatalog, visa: VisaId, readiness: Readiness) {
    return (visa === 'tourist' ? catalog.finder.touristNotes : catalog.finder.notes)[readiness]
}
