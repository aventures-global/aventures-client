import type { AskVisaType } from '../hooks/useAskForm'
import type { FinderOption, PathId, Readiness, VisaId, VisaPageSlug } from '../types/visa'

export type { FinderOption, PathId, Readiness, VisaId, VisaPageSlug }

type VisaServiceDetails = {
    id: VisaId
    title: string
    shortLabel: string
    description: string
    /** Section id on its service page. */
    anchor: string
    checklist: { href: string; downloadName: string }
    /** FAQ category whose questions appear on the service page. */
    faqCategory: string
    /** Exact text of the FAQ shown openly as the introduction. */
    introQuestion: string
    qualifyQuestion?: string
    askVisaType: AskVisaType
}

export type VisaService = VisaServiceDetails & { href: string }

export type VisaPage = {
    slug: VisaPageSlug
    title: string
    description: string
    visas: VisaId[]
}

/** R2 folder holding the printable checklists. Kept literal because the server seed imports this file. */
const CHECKLIST_DIR = 'https://pub-99ebb469dda04547813e7149f4af3469.r2.dev/visa-checklists'

export const ASK_AVENTURES_HREF = '/ask'

const serviceDetails: VisaServiceDetails[] = [
    {
        id: 'tourist',
        title: 'Tourist Visa',
        shortLabel: 'Tourist Visa',
        description:
            'Planning a temporary visit to the United States for tourism, vacation, visiting family or friends, or another permitted visitor purpose?',
        anchor: 'tourist',
        checklist: {
            href: `${CHECKLIST_DIR}/tourist-visa-checklist.pdf`,
            downloadName: 'U.S. Tourist Visa Travel Preparation Checklist.pdf',
        },
        faqCategory: 'Tourist Visa',
        introQuestion: 'What is a U.S. Tourist Visa?',
        askVisaType: 'U.S. Tourist Visa',
    },
    {
        id: 'fiance',
        title: 'Fiancé(e) Visa',
        shortLabel: 'Fiancé(e) Visa',
        description: 'Planning to travel to the United States to marry your U.S. citizen fiancé(e)?',
        anchor: 'k1',
        checklist: {
            href: `${CHECKLIST_DIR}/fiance-visa-checklist.pdf`,
            downloadName: 'U.S. Fiancé(e) Visa Travel Preparation Checklist.pdf',
        },
        faqCategory: 'Fiancé(e) Visa',
        introQuestion: 'What is a U.S. Fiancé(e) Visa?',
        askVisaType: 'U.S. Fiancé(e) Visa',
    },
    {
        id: 'k2',
        title: 'K-2 Visa',
        shortLabel: 'K-2 Visa',
        description:
            'Planning to travel to the United States as the qualifying child of a K-1 fiancé(e) visa applicant?',
        anchor: 'k2',
        checklist: {
            href: `${CHECKLIST_DIR}/k2-visa-checklist.pdf`,
            downloadName: 'U.S. K-2 Visa Preparation Checklist.pdf',
        },
        faqCategory: 'K-2 Visa',
        introQuestion: 'What is a K-2 Visa?',
        askVisaType: 'U.S. K-2 Visa',
    },
    {
        id: 'j1',
        title: 'J-1 Exchange Visitor Visa',
        shortLabel: 'J-1 Visa',
        description:
            'Planning to participate in an approved exchange visitor program in the United States?',
        anchor: 'j1',
        checklist: {
            href: `${CHECKLIST_DIR}/j1-exchange-visitor-visa-checklist.pdf`,
            downloadName: 'U.S. J-1 Exchange Visitor Visa Preparation Checklist.pdf',
        },
        faqCategory: 'J-1 Exchange Visitor Visa',
        introQuestion: 'What is a J-1 Exchange Visitor Visa?',
        askVisaType: 'U.S. J-1 Exchange Visitor Visa',
    },
    {
        id: 'r1',
        title: 'R-1 Religious Worker Visa',
        shortLabel: 'R-1 Visa',
        description:
            'Planning to come to the United States for qualifying religious work with a qualifying religious organization?',
        anchor: 'r1',
        checklist: {
            href: `${CHECKLIST_DIR}/r1-religious-worker-visa-checklist.pdf`,
            downloadName: 'U.S. R-1 Visa Travel Preparation Checklist.pdf',
        },
        faqCategory: 'R-1 Religious Worker Visa',
        introQuestion: 'What is an R-1 Visa?',
        qualifyQuestion: 'Who can qualify for an R-1?',
        askVisaType: 'U.S. R-1 Religious Worker Visa',
    },
    {
        id: 'r2',
        title: 'R-2 Dependent Visa',
        shortLabel: 'R-2 Visa',
        description:
            'Planning to accompany or join an eligible R-1 religious worker as a qualifying spouse or unmarried child?',
        anchor: 'r2',
        checklist: {
            href: `${CHECKLIST_DIR}/r2-dependent-visa-checklist.pdf`,
            downloadName: 'U.S. R-2 Dependent Visa Preparation Checklist.pdf',
        },
        faqCategory: 'R-2 Dependent Visa',
        introQuestion: 'What is an R-2 Visa?',
        askVisaType: 'U.S. R-2 Dependent Visa',
    },
    {
        id: 'p1',
        title: 'P-1 Visa',
        shortLabel: 'P-1 Visa',
        description:
            'Planning to come to the United States for a qualifying athletic or entertainment opportunity?',
        anchor: 'p1',
        checklist: {
            href: `${CHECKLIST_DIR}/p1-visa-checklist.pdf`,
            downloadName: 'U.S. P-1 Visa Preparation Checklist.pdf',
        },
        faqCategory: 'P-1 Visa',
        introQuestion: 'What is a P-1 Visa?',
        qualifyQuestion: 'Who can qualify for a P-1 Visa?',
        askVisaType: 'U.S. P-1 Visa',
    },
    {
        id: 'p2',
        title: 'P-2 Visa',
        shortLabel: 'P-2 Visa',
        description:
            'Planning to participate in a qualifying reciprocal exchange program as an artist or entertainer?',
        anchor: 'p2',
        checklist: {
            href: `${CHECKLIST_DIR}/p2-visa-checklist.pdf`,
            downloadName: 'U.S. P-2 Visa Preparation Checklist.pdf',
        },
        faqCategory: 'P-2 Visa',
        introQuestion: 'What is a P-2 Visa?',
        askVisaType: 'U.S. P-2 Visa',
    },
    {
        id: 'e2',
        title: 'E-2 Treaty Investor Visa',
        shortLabel: 'E-2 Visa',
        description:
            'Planning to invest in and develop a qualifying business in the United States?',
        anchor: 'e2',
        checklist: {
            href: `${CHECKLIST_DIR}/e2-treaty-investor-visa-checklist.pdf`,
            downloadName: 'U.S. E-2 Treaty Investor Visa Preparation Checklist.pdf',
        },
        faqCategory: 'E-2 Treaty Investor Visa',
        introQuestion: 'What is an E-2 Treaty Investor Visa?',
        askVisaType: 'U.S. E-2 Treaty Investor Visa',
    },
]

export const visaPages: VisaPage[] = [
    {
        slug: 'tourist',
        title: 'U.S. Tourist Visa',
        description:
            'What the U.S. Tourist Visa is, what to prepare before you apply, and how to start with AVENTURES.',
        visas: ['tourist'],
    },
    {
        slug: 'k1-k2',
        title: 'U.S. Fiancé(e) and K-2 Visas',
        description:
            'What the K-1 fiancé(e) and K-2 visas are, what to prepare before you apply, and how to start with AVENTURES.',
        visas: ['fiance', 'k2'],
    },
    {
        slug: 'j1',
        title: 'U.S. J-1 Exchange Visitor Visa',
        description:
            'What the J-1 Exchange Visitor Visa is, what to prepare for your program, and how to start with AVENTURES.',
        visas: ['j1'],
    },
    {
        slug: 'r1-r2',
        title: 'U.S. R-1 and R-2 Visas',
        description:
            'What the R-1 religious worker and R-2 dependent visas are, what to prepare, and how to start with AVENTURES.',
        visas: ['r1', 'r2'],
    },
    {
        slug: 'p1-p2',
        title: 'U.S. P-1 and P-2 Visas',
        description:
            'What the P-1 athlete and entertainer and P-2 reciprocal exchange visas are, what to prepare, and how to start with AVENTURES.',
        visas: ['p1', 'p2'],
    },
    {
        slug: 'e2',
        title: 'U.S. E-2 Treaty Investor Visa',
        description:
            'What the E-2 Treaty Investor Visa is, the documents investors usually prepare, and how to start with AVENTURES.',
        visas: ['e2'],
    },
]

export function visaPagePath(slug: VisaPageSlug) {
    return `/services/visa/${slug}`
}

function serviceHref(service: VisaServiceDetails) {
    const page = visaPages.find((p) => p.visas.includes(service.id))!
    const path = visaPagePath(page.slug)
    return page.visas.length > 1 ? `${path}#${service.anchor}` : path
}

export const visaServices: VisaService[] = serviceDetails.map((service) => ({
    ...service,
    href: serviceHref(service),
}))

export function getVisaPage(slug: string | undefined) {
    return visaPages.find((page) => page.slug === slug)
}

/** Ask AVENtures with this visa already chosen in the form. */
export function askAboutVisaHref(service: VisaService) {
    return `${ASK_AVENTURES_HREF}?visa=${encodeURIComponent(service.askVisaType)}`
}

export type PurposeOption = {
    id: string
    label: string
    /** `null` routes to the unsure result. */
    path: PathId | null
}

export type Question = {
    title: string
    options: FinderOption[]
}

export type ReadinessOption = {
    id: Readiness
    label: string
}

export const purposeQuestion: { title: string; options: PurposeOption[] } = {
    title: 'What brings you to the United States?',
    options: [
        { id: 'visiting', label: 'I’m visiting the U.S.', path: 'visiting' },
        { id: 'fiance', label: 'I’m joining a fiancé(e), or a parent with a K-1 visa case', path: 'fiance' },
        { id: 'exchange', label: 'I’m participating in an exchange program', path: 'exchange' },
        {
            id: 'religious',
            label: 'I’m pursuing a religious opportunity, or joining a family member who is',
            path: 'religious',
        },
        {
            id: 'performance',
            label: 'I’m coming for an athletic, artistic, or entertainment opportunity',
            path: 'performance',
        },
        { id: 'investing', label: 'I’m investing in or developing a business in the U.S.', path: 'investing' },
        { id: 'unsure', label: 'I’m not sure', path: null },
    ],
}

const unsureOption: FinderOption = { id: 'unsure', label: 'I’m not sure', visa: null }

export const roleQuestions: Record<PathId, Question> = {
    visiting: {
        title: 'What best describes the purpose of your visit?',
        options: [
            { id: 'tourism', label: 'Tourism, vacation, or sightseeing', visa: 'tourist' },
            { id: 'family', label: 'Visiting family or friends', visa: 'tourist' },
            { id: 'short-business', label: 'A short trip for a conference or business meetings', visa: 'tourist' },
            unsureOption,
        ],
    },
    fiance: {
        title: 'Who are you in the fiancé(e) visa case?',
        options: [
            { id: 'fiance', label: 'I’m engaged to a U.S. citizen and plan to marry in the U.S.', visa: 'fiance' },
            { id: 'child', label: 'I’m the child of someone applying for a K-1 fiancé(e) visa', visa: 'k2' },
            unsureOption,
        ],
    },
    exchange: {
        title: 'What kind of exchange program is it?',
        options: [
            { id: 'intern', label: 'Internship', visa: 'j1' },
            { id: 'trainee', label: 'Professional training', visa: 'j1' },
            { id: 'teaching', label: 'Teaching, research, or a professorship', visa: 'j1' },
            { id: 'student', label: 'Student or cultural exchange', visa: 'j1' },
            { id: 'artist', label: 'An artist or entertainer exchange between organizations', visa: 'p2' },
            { id: 'other', label: 'Another approved exchange program', visa: 'j1' },
            unsureOption,
        ],
    },
    religious: {
        title: 'How are you involved?',
        options: [
            {
                id: 'worker',
                label: 'I’ll serve or work for a religious organization, as a minister or in a religious vocation or occupation',
                visa: 'r1',
            },
            { id: 'dependent', label: 'I’m the spouse or unmarried child of an R-1 religious worker', visa: 'r2' },
            unsureOption,
        ],
    },
    performance: {
        title: 'How will you take part?',
        options: [
            { id: 'athlete', label: 'As an athlete or athletic team member', visa: 'p1' },
            { id: 'group', label: 'As a member of an entertainment group', visa: 'p1' },
            {
                id: 'reciprocal',
                label: 'As an artist or entertainer in a reciprocal exchange program',
                visa: 'p2',
            },
            unsureOption,
        ],
    },
    investing: {
        title: 'What is your role in the business?',
        options: [
            { id: 'investor', label: 'I’m investing in or buying a U.S. business', visa: 'e2' },
            { id: 'director', label: 'I’ll direct and develop the business I’m investing in', visa: 'e2' },
            unsureOption,
        ],
    },
}

const readinessLabels = (yes: string, arranging: string): ReadinessOption[] => [
    { id: 'yes', label: yes },
    { id: 'arranging', label: arranging },
    { id: 'no', label: 'Not yet' },
    { id: 'unsure', label: 'I’m not sure' },
]

export const readinessQuestions: Record<VisaId, { title: string; options: ReadinessOption[] }> = {
    tourist: {
        title: 'How far along are your travel plans?',
        options: [
            { id: 'yes', label: 'I know where and when I’m going' },
            { id: 'arranging', label: 'I have a rough idea' },
            { id: 'no', label: 'I’m still exploring' },
            { id: 'unsure', label: 'I’m not sure yet' },
        ],
    },
    fiance: {
        title: 'Has your U.S. citizen fiancé(e) filed the K-1 petition?',
        options: readinessLabels('Yes, it’s been filed', 'We’re preparing it now'),
    },
    k2: {
        title: 'Has the K-1 petition for your parent been filed?',
        options: readinessLabels('Yes, it’s been filed', 'It’s being prepared now'),
    },
    j1: {
        title: 'Has a U.S. exchange program or sponsor accepted you?',
        options: readinessLabels('Yes, I’ve been accepted', 'I’m applying now'),
    },
    r1: {
        title: 'Do you have a U.S. religious organization ready to sponsor you?',
        options: readinessLabels('Yes', 'We’re arranging it now'),
    },
    r2: {
        title: 'Is your spouse or parent already applying for or holding an R-1 visa?',
        options: readinessLabels('Yes', 'Their application is being prepared'),
    },
    p1: {
        title: 'Do you have a U.S. team, organization, or event lined up?',
        options: readinessLabels('Yes', 'I’m arranging it now'),
    },
    p2: {
        title: 'Is your reciprocal exchange program or participating organization arranged?',
        options: readinessLabels('Yes', 'It’s being arranged now'),
    },
    e2: {
        title: 'Have you identified the U.S. business you plan to invest in?',
        options: readinessLabels('Yes, I’ve identified or started it', 'I’m arranging it now'),
    },
}

export const readinessNotes: Record<Readiness, string> = {
    yes: 'With that already in place, you can review this service and start your visa assistance with AVENTURES.',
    arranging: 'AVENTURES can help you understand what still needs to be in place while you finish arranging it.',
    no: 'That’s okay. Talk to AVENTURES first, and we’ll explain what usually needs to be in place for this visa.',
    unsure: 'No problem. AVENTURES can walk you through what typically needs to be in place before you apply.',
}

export const touristReadinessNotes: Record<Readiness, string> = {
    yes: 'With your plans set, you can review this service and start your visa assistance. AVENTURES can arrange the trip too.',
    arranging: 'AVENTURES can help you prepare your application while you firm up your travel plans.',
    no: 'AVENTURES can help with both your visa preparation and your travel plans whenever you’re ready.',
    unsure: 'AVENTURES can help with both your visa preparation and your travel plans whenever you’re ready.',
}

export function readinessNote(visa: VisaId, readiness: Readiness) {
    return (visa === 'tourist' ? touristReadinessNotes : readinessNotes)[readiness]
}

export const START_VISA_ASSISTANCE_HREF = '/#contact'

export function getVisaService(id: VisaId) {
    return visaServices.find((service) => service.id === id)!
}

export const extraExploreLinks = [
    {
        id: 'tours',
        label: 'Travel & Tours',
        href: '/destinations',
        note: 'Think beyond the visa. Dream about the destination.',
    },
    {
        id: 'ask',
        label: 'Ask AVENTURES',
        href: ASK_AVENTURES_HREF,
        note: 'When the path is unclear, ask before you move forward.',
    },
]
