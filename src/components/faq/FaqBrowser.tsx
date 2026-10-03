import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { searchFaqs } from '../../lib/faqSearch'
import type { FaqCategoryGroup, FaqItem } from '../../types/content'
import FaqAccordion from './FaqAccordion'

type FaqBrowserProps = {
    categories: FaqCategoryGroup[]
    /** Prefixes section ids so several browsers can share a page. */
    idPrefix?: string
    /** Sticky offset for the desktop outline, clearing any fixed header. */
    outlineTopClass?: string
    /** Sticky offset for the small-screen chip row. */
    chipsTopClass?: string
    /** Pixels from the viewport top where a section counts as current. */
    activeOffset?: number
    emptyAction?: ReactNode
    /** Rendered after the questions, aligned with them. */
    footer?: ReactNode
}

function scrollBehavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export default function FaqBrowser({
    categories,
    idPrefix = 'faq',
    outlineTopClass = 'top-28',
    chipsTopClass = 'top-16',
    activeOffset = 160,
    emptyAction,
    footer,
}: FaqBrowserProps) {
    const [query, setQuery] = useState('')
    const searching = query.trim() !== ''
    const chipsRef = useRef<HTMLDivElement>(null)

    const allFaqs = useMemo(() => {
        const unique = new Map<string, FaqItem>()
        for (const category of categories) {
            for (const faq of category.faqs) unique.set(faq.id, faq)
        }
        return [...unique.values()]
    }, [categories])

    const results = useMemo(() => searchFaqs(allFaqs, query), [allFaqs, query])
    const sectionId = (id: string) => `${idPrefix}-${id}`
    const sectionIds = searching ? [] : categories.map((category) => sectionId(category.id))
    const [activeId, select] = useActiveSection(sectionIds, activeOffset)

    useEffect(() => {
        const scroller = chipsRef.current
        const chip = scroller?.querySelector<HTMLElement>('[data-active="true"]')
        if (!scroller || !chip) return
        const left = chip.offsetLeft - 24
        const right = chip.offsetLeft + chip.offsetWidth + 24
        if (left < scroller.scrollLeft) scroller.scrollTo({ left, behavior: 'smooth' })
        else if (right > scroller.scrollLeft + scroller.clientWidth) {
            scroller.scrollTo({ left: right - scroller.clientWidth, behavior: 'smooth' })
        }
    }, [activeId])

    const jump = (id: string) => {
        select(id)
        document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    }

    return (
        <div className="@container">
            <div role="search" className="max-w-2xl">
                <label htmlFor={`${idPrefix}-search`} className="sr-only">
                    Search FAQs
                </label>
                <div className="flex h-14 items-center gap-3 rounded-[3px] border border-royal/25 bg-white/70 px-4 transition-colors focus-within:border-royal">
                    <Search size={18} strokeWidth={1.6} className="shrink-0 text-gold-deep" aria-hidden />
                    <input
                        id={`${idPrefix}-search`}
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search questions, e.g. visa processing time"
                        autoComplete="off"
                        className="h-full min-w-0 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink/40 [&::-webkit-search-cancel-button]:hidden"
                    />
                    {query ? (
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => setQuery('')}
                            className="rounded-full p-1.5 text-ink/45 transition-colors hover:bg-royal/5 hover:text-royal"
                        >
                            <X size={16} strokeWidth={1.75} />
                        </button>
                    ) : null}
                </div>
            </div>

            {searching ? (
                <section aria-label="Search results" className="mt-10 max-w-3xl">
                    <p aria-live="polite" className="mb-4 text-sm text-ink/55">
                        {results.length === 0
                            ? `No FAQs match “${query.trim()}”.`
                            : `${results.length} result${results.length === 1 ? '' : 's'} for “${query.trim()}”, closest first`}
                    </p>
                    {results.length > 0 ? (
                        <FaqAccordion items={results} />
                    ) : (
                        <div className="border-t border-royal/15 pt-6 text-sm leading-7 text-ink/60">
                            Try different words or check the spelling.
                            {emptyAction ? <> {emptyAction}</> : null}
                        </div>
                    )}
                    {footer}
                </section>
            ) : categories.length === 0 ? (
                <div className="mt-10 max-w-3xl">
                    <p className="border-t border-royal/15 pt-6 text-sm text-ink/60">
                        Answers are on their way. In the meantime, send us your question directly.
                        {emptyAction ? <> {emptyAction}</> : null}
                    </p>
                    {footer}
                </div>
            ) : (
                <>
                    <div
                        className={`sticky z-20 -mx-6 mt-6 border-b border-royal/10 bg-oat/95 px-6 backdrop-blur-md sm:-mx-8 sm:px-8 @4xl:hidden ${chipsTopClass}`}
                    >
                        <div
                            ref={chipsRef}
                            className="no-scrollbar flex gap-2 overflow-x-auto py-3"
                            aria-label="FAQ categories"
                            role="navigation"
                        >
                            {categories.map((category) => {
                                const id = sectionId(category.id)
                                const active = activeId === id
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        data-active={active}
                                        aria-current={active ? 'true' : undefined}
                                        onClick={() => jump(id)}
                                        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors ${
                                            active
                                                ? 'border-royal bg-royal text-cream'
                                                : 'border-royal/20 text-ink/70 hover:border-royal/50 hover:text-royal'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-12 @4xl:mt-12 @4xl:grid-cols-[14rem_minmax(0,1fr)] @4xl:gap-16">
                        <nav aria-label="FAQ categories" className="hidden @4xl:block">
                            <div
                                className={`no-scrollbar sticky max-h-[calc(100svh-8rem)] overflow-y-auto pb-4 ${outlineTopClass}`}
                            >
                                <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-royal">
                                    Categories
                                </p>
                                <ul className="space-y-0.5 border-l border-royal/15">
                                    {categories.map((category) => {
                                        const id = sectionId(category.id)
                                        const active = activeId === id
                                        return (
                                            <li key={category.id}>
                                                <a
                                                    href={`#${id}`}
                                                    aria-current={active ? 'true' : undefined}
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        jump(id)
                                                    }}
                                                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
                                                        active
                                                            ? 'border-gold-deep font-medium text-royal'
                                                            : 'border-transparent text-ink/60 hover:text-royal'
                                                    }`}
                                                >
                                                    {category.name}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </nav>

                        <div className="min-w-0 max-w-3xl space-y-14">
                            {categories.map((category) => (
                                <section
                                    key={category.id}
                                    id={sectionId(category.id)}
                                    aria-labelledby={`${sectionId(category.id)}-title`}
                                    style={{ scrollMarginTop: activeOffset - 24 }}
                                >
                                    <h2
                                        id={`${sectionId(category.id)}-title`}
                                        className="mb-3 font-noto-serif text-2xl text-ink sm:text-[1.7rem]"
                                    >
                                        {category.name}
                                    </h2>
                                    <FaqAccordion items={category.faqs} />
                                </section>
                            ))}
                            {footer}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
