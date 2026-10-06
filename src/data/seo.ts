import { aboutSectionPath, aboutTabs, type AboutTabId } from './aboutTabs'

export const DEFAULT_OG_IMAGE = '/assets/images/AVENtures-globe.png'

export const DEFAULT_DESCRIPTION =
    'AVENtures Global Resources and Travel Agency — airfare, hotels, curated tours, and visa assistance worldwide.'

export type SeoRouteCopy = {
    title: string
    description: string
}

const aboutDescriptions: Record<AboutTabId, string> = {
    'why-us':
        'Visa assistance, airfare, hotels, and curated trips handled by one AVENtures team, from the first plan through departure.',
    'behind-the-dream':
        'Mary Kathleen Kayce Avendula, CEO of AVENtures, and the visa and travel experience that shaped the company.',
    origin:
        'AVENtures began in Sacramento to plan Philippines and California trips as one journey, including airfare, hotels, and visas.',
    transparency:
        'What AVENtures can assist with on U.S. visas and travel planning, what remains with government authorities, and how to contact the Sacramento office.',
}

const routeCopy: Record<string, SeoRouteCopy> = {
    '/': {
        title: 'AVENtures Global — Travel Agency',
        description: DEFAULT_DESCRIPTION,
    },
    '/about': {
        title: 'About Us — AVENtures',
        description: aboutDescriptions['why-us'],
    },
    ...Object.fromEntries(
        aboutTabs.map((tab) => [
            aboutSectionPath(tab.id),
            {
                title: `${tab.label} — AVENtures`,
                description: aboutDescriptions[tab.id],
            },
        ]),
    ),
    '/destinations': {
        title: 'Destinations — AVENtures',
        description:
            'Browse signature journeys across the Philippines, Asia, the USA, and beyond — curated private trips from AVENtures.',
    },
    '/shop': {
        title: 'Shop — AVENtures',
        description:
            'Browse AVENtures merchandise — apparel, totes, and destination photography prints. Add to cart requires an account.',
    },
    '/login': {
        title: 'Log in — AVENtures',
        description: 'Log in to your AVENtures account to shop merchandise.',
    },
    '/signup': {
        title: 'Sign up — AVENtures',
        description: 'Create an AVENtures account to shop merchandise.',
    },
    '/cart': {
        title: 'Cart — AVENtures',
        description: 'Your AVENtures merchandise cart.',
    },
    '/visa-assistance': {
        title: 'Visa Services — AVENtures',
        description:
            'Find the AVENTURES U.S. visa service that fits your travel purpose, from tourist and fiancé(e) visas to J-1, R-1, P-1, and E-2.',
    },
    '/faq': {
        title: 'FAQs — AVENtures',
        description:
            'Answers about planning trips, visas, flights, hotels, and traveling with AVENtures Global.',
    },
    '/ask': {
        title: 'Ask AVENtures — AVENtures',
        description:
            'Send AVENtures your question about U.S. visas, applications, documents, or travel plans, and our team will review it.',
    },
    '/privacy': {
        title: 'Privacy Policy — AVENtures',
        description:
            'How AVENtures Global collects, uses, and shares information from inquiry forms, accounts, and the services you choose.',
    },
    '/terms': {
        title: 'Terms & Conditions — AVENtures',
        description:
            'How AVENtures services, fees, refunds, cancellations, and limitations work, and what is disclosed before you pay.',
    },
    '/blog': {
        title: 'Blogs — AVENtures',
        description:
            'Travel notes and stories from the road. Explore destinations or get in touch to plan a trip.',
    },
    '/sitemap': {
        title: 'Sitemaps — AVENtures',
        description: 'Index of pages, services, and destinations on the AVENtures website.',
    },
}

export function getSeoForPath(pathname: string): SeoRouteCopy {
    return (
        routeCopy[pathname] ?? {
            title: 'AVENtures Global — Travel Agency',
            description: DEFAULT_DESCRIPTION,
        }
    )
}
