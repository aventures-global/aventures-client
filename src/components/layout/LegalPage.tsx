import { ArrowRight } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getSite } from '../../api'
import { ASK_AVENTURES_HREF } from '../../data/visaFinder'
import { getSeoForPath } from '../../data/seo'
import { siteMarkdownVars } from '../../data/site'
import MiniMarkdown from '../../lib/miniMarkdown'
import type { SiteInfo } from '../../types/content'
import type { LegalPageContent } from '../../types/sitePages'
import Seo from '../seo/Seo'
import Footer from './Footer'
import Header from './Header'

const legalLinks = [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
] as const

export const legalLinkClass = 'font-medium text-royal underline-offset-4 hover:text-gold-deep hover:underline'

type LegalPageProps = {
    path: string
    title: string
    content: LegalPageContent
    /** Fixed content shown after a section's body, keyed by section id. */
    sectionExtras?: Record<string, ReactNode>
}

export default function LegalPage({ path, title, content, sectionExtras = {} }: LegalPageProps) {
    const seo = getSeoForPath(path)
    const [site, setSite] = useState<SiteInfo | null>(null)

    useEffect(() => {
        void getSite().then(setSite)
    }, [])

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={seo.title} description={seo.description} path={path} />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Legal</p>
                <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">{title}</h1>
                <p className="mt-5 font-poppins text-xl text-royal sm:text-2xl">{content.subtitle}</p>
                <div className="mt-3 max-w-3xl space-y-4 text-base leading-8 text-ink/60">
                    <MiniMarkdown text={content.intro} vars={siteMarkdownVars} linkClassName={legalLinkClass} />
                </div>

                <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-2">
                    {legalLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `rounded-full border px-4 py-1.5 text-sm transition-colors ${
                                    isActive
                                        ? 'border-royal bg-royal text-cream'
                                        : 'border-royal/20 text-ink/75 hover:border-royal hover:text-royal'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-12 max-w-3xl space-y-12">
                    {content.sections.map((section) => (
                        <LegalSection key={section.id} id={section.id} label={section.label} title={section.title}>
                            <MiniMarkdown text={section.body} vars={siteMarkdownVars} linkClassName={legalLinkClass} />
                            {sectionExtras[section.id]}
                        </LegalSection>
                    ))}
                </div>

                <p className="mt-12 max-w-3xl text-xs text-ink/50">Last updated: {content.lastUpdated}</p>

                <div className="mt-16 max-w-3xl border-t border-royal/15 pt-10">
                    <p className="font-noto-serif text-2xl text-ink sm:text-3xl">Have questions before you proceed?</p>
                    <p className="mt-3 text-base leading-8 text-ink/60">
                        You do not have to move forward with a service simply because you have started an inquiry.
                        Ask us about the service, fees, applicable terms, refunds, cancellations, privacy, or
                        limitations before making a payment.
                    </p>
                    <Link
                        to={ASK_AVENTURES_HREF}
                        className="group mt-6 inline-flex items-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white"
                    >
                        Ask AVENtures
                        <ArrowRight
                            size={16}
                            strokeWidth={1.75}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                        />
                    </Link>
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}

type LegalSectionProps = {
    id: string
    label: string
    title: string
    children: ReactNode
}

export function LegalSection({ id, label, title, children }: LegalSectionProps) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-royal/15 pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-royal">{label}</p>
            <h2 id={`${id}-title`} className="mt-3 font-noto-serif text-2xl text-ink sm:text-3xl">
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-ink/65">{children}</div>
        </section>
    )
}

export function LegalList({ items }: { items: ReactNode[] }) {
    return (
        <ul className="list-disc space-y-2 pl-5 marker:text-gold-deep">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}
