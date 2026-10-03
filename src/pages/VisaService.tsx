import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getFaqs, getSite } from '../api'
import FaqAccordion from '../components/faq/FaqAccordion'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Seo from '../components/seo/Seo'
import { visaChecklists } from '../data/visaChecklists'
import {
    START_VISA_ASSISTANCE_HREF,
    askAboutVisaHref,
    getVisaPage,
    getVisaService,
    visaPagePath,
    type VisaService as VisaServiceInfo,
} from '../data/visaFinder'
import type { FaqData, FaqItem, SiteInfo } from '../types/content'
import NotFound from './NotFound'

/** `null` while loading; `'error'` when the catalog could not be fetched. */
type FaqState = FaqData | null | 'error'

const primaryButtonClass =
    'group inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const secondaryButtonClass =
    'inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-royal/70 px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] text-royal transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const quietLinkClass =
    'inline-flex items-center gap-2 text-sm font-medium text-royal/80 underline-offset-4 transition-colors hover:text-gold-deep hover:underline'

function sameText(a: string, b: string) {
    return a.normalize('NFC').trim().toLowerCase() === b.normalize('NFC').trim().toLowerCase()
}

function scrollBehavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export default function VisaService() {
    const { slug } = useParams<{ slug: string }>()
    const page = getVisaPage(slug)
    const location = useLocation()
    const [site, setSite] = useState<SiteInfo | null>(null)
    const [faqs, setFaqs] = useState<FaqState>(null)

    useEffect(() => {
        void getSite().then(setSite)
        getFaqs()
            .then(setFaqs)
            .catch(() => setFaqs('error'))
    }, [])

    const faqsSettled = faqs !== null
    useEffect(() => {
        if (!faqsSettled || !location.hash) return
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    }, [faqsSettled, location.hash])

    if (!page) return <NotFound />

    const services = page.visas.map(getVisaService)
    const shared = services.length > 1

    return (
        <div className="luxury-paper font-poppins flex min-h-svh flex-col">
            <Seo title={`${page.title} — AVENtures`} description={page.description} path={visaPagePath(page.slug)} />
            <Header />
            <main className="site-container flex-1 pb-24 pt-32 sm:pt-36">
                <div className="mx-auto max-w-4xl">
                    <Link to="/visa-assistance" className={quietLinkClass}>
                        <ArrowLeft size={16} aria-hidden />
                        Back to the visa finder
                    </Link>
                    <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-royal">Visa Services</p>
                    <h1 className="mt-4 font-noto-serif text-4xl text-ink sm:text-5xl">{page.title}</h1>
                    {shared ? (
                        <nav aria-label="Visas on this page" className="mt-8 flex flex-wrap gap-2">
                            {services.map((service) => (
                                <a
                                    key={service.id}
                                    href={`#${service.anchor}`}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        window.history.replaceState(null, '', `#${service.anchor}`)
                                        document
                                            .getElementById(service.anchor)
                                            ?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
                                    }}
                                    className="rounded-full border border-royal/20 px-4 py-1.5 text-sm text-ink/75 transition-colors hover:border-royal hover:text-royal"
                                >
                                    {service.title}
                                </a>
                            ))}
                        </nav>
                    ) : (
                        <p className="mt-6 max-w-2xl font-noto-serif text-lg italic text-royal sm:text-xl">
                            {services[0].description}
                        </p>
                    )}

                    <div className={shared ? 'mt-12 space-y-20' : 'mt-12'}>
                        {services.map((service) => (
                            <VisaSection key={service.id} service={service} faqs={faqs} showTitle={shared} />
                        ))}
                    </div>

                    <footer className="mt-20 border-t border-royal/15 pt-8">
                        <p className="max-w-3xl text-xs leading-6 text-ink/50">
                            The information on this page is general guidance only and is not legal advice. The
                            appropriate visa category and requirements depend on your individual circumstances and the
                            specific purpose of your intended travel.
                        </p>
                        <Link to="/visa-assistance" className={`${quietLinkClass} mt-5`}>
                            Explore all visa services
                            <ArrowRight size={16} aria-hidden />
                        </Link>
                    </footer>
                </div>
            </main>
            {site && <Footer site={site} />}
        </div>
    )
}

type VisaSectionProps = {
    service: VisaServiceInfo
    faqs: FaqState
    showTitle: boolean
}

function VisaSection({ service, faqs, showTitle }: VisaSectionProps) {
    const checklist = visaChecklists[service.id]
    const category =
        faqs && faqs !== 'error' ? faqs.categories.find((c) => sameText(c.name, service.faqCategory)) : undefined
    const categoryFaqs = category?.faqs ?? []
    const find = (question?: string) =>
        question ? categoryFaqs.find((faq) => sameText(faq.question, question)) : undefined
    const intro = find(service.introQuestion)
    const qualify = find(service.qualifyQuestion)
    const more = categoryFaqs.filter((faq) => faq !== intro && faq !== qualify)
    const headingId = `${service.anchor}-title`
    const SubHeading = showTitle ? 'h3' : 'h2'
    const MinorHeading = showTitle ? 'h4' : 'h3'

    return (
        <section
            id={service.anchor}
            aria-labelledby={showTitle ? headingId : undefined}
            aria-label={showTitle ? undefined : service.title}
            className="scroll-mt-28"
        >
            {showTitle && (
                <header className="border-t border-royal/15 pt-10">
                    <h2 id={headingId} className="font-noto-serif text-3xl text-ink sm:text-4xl">
                        {service.title}
                    </h2>
                    <p className="mt-4 max-w-2xl font-noto-serif text-lg italic text-royal">{service.description}</p>
                </header>
            )}

            {(intro || qualify) && (
                <div className="mt-10 max-w-3xl">
                    <SubHeading className="text-xs font-medium uppercase tracking-[0.24em] text-royal">
                        About this visa
                    </SubHeading>
                    {intro && <AnswerText faq={intro} />}
                    {qualify && (
                        <>
                            <MinorHeading className="mt-6 font-noto-serif text-xl text-ink">Who it&rsquo;s for</MinorHeading>
                            <AnswerText faq={qualify} />
                        </>
                    )}
                </div>
            )}

            <div className="mt-12 border border-royal/15 bg-white/60 px-6 py-8 sm:px-10 sm:py-10">
                <SubHeading className="text-xs font-medium uppercase tracking-[0.24em] text-royal">
                    What you&rsquo;ll prepare
                </SubHeading>
                <p className="mt-3 font-noto-serif text-2xl text-ink sm:text-[1.7rem]">{checklist.tagline}</p>
                {checklist.intro && (
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/65">{checklist.intro}</p>
                )}

                <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
                    {checklist.groups.map((group) => (
                        <div key={group.title}>
                            <MinorHeading className="border-b border-royal/15 pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-royal">
                                {group.title}
                            </MinorHeading>
                            <ul className="mt-3 space-y-2">
                                {group.items.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm leading-6 text-ink/75">
                                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-deep" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 border-l-2 border-gold-deep bg-royal/[0.04] px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">Important reminder</p>
                    <p className="mt-2 text-sm leading-7 text-ink/70">{checklist.reminder}</p>
                </div>

                <a
                    href={service.checklist.href}
                    download={service.checklist.downloadName}
                    className={`${secondaryButtonClass} mt-8`}
                >
                    <Download size={16} aria-hidden />
                    Download the printable checklist (PDF)
                </a>
            </div>

            {more.length > 0 && (
                <div className="mt-12 max-w-3xl">
                    <SubHeading className="mb-4 font-noto-serif text-2xl text-ink">More questions</SubHeading>
                    <FaqAccordion items={more} compact headingLevel={MinorHeading} />
                </div>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-3">
                <Link to={START_VISA_ASSISTANCE_HREF} className={primaryButtonClass}>
                    Start Visa Assistance
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link to={askAboutVisaHref(service)} className={secondaryButtonClass}>
                    Ask AVENtures
                </Link>
            </div>
        </section>
    )
}

function AnswerText({ faq }: { faq: FaqItem }) {
    return <p className="mt-3 whitespace-pre-line text-base leading-8 text-ink/75">{faq.answer}</p>
}
