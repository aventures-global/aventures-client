import { ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { meaningfulWords, searchFaqs } from '../../lib/faqSearch'
import type { FaqItem } from '../../types/content'
import FaqAccordion from './FaqAccordion'

type AskSuggestionsProps = {
    faqs: FaqItem[]
    question: string
}

const MAX_SUGGESTIONS = 3
const DEBOUNCE_MS = 300
const MIN_CHARACTERS = 12
const MIN_WORDS = 2
/** Below this, matches share a stray word with the question rather than its topic. */
const MIN_SCORE = 0.6

function hasSubstance(text: string) {
    const trimmed = text.trim()
    return trimmed.length >= MIN_CHARACTERS || meaningfulWords(trimmed).length >= MIN_WORDS
}

/** Published answers that look close to the question being typed. Never blocks sending. */
export default function AskSuggestions({ faqs, question }: AskSuggestionsProps) {
    const [query, setQuery] = useState('')

    useEffect(() => {
        const timer = window.setTimeout(() => setQuery(hasSubstance(question) ? question : ''), DEBOUNCE_MS)
        return () => window.clearTimeout(timer)
    }, [question])

    const matches = useMemo(() => searchFaqs(faqs, query, MIN_SCORE).slice(0, MAX_SUGGESTIONS), [faqs, query])

    return (
        <div aria-live="polite">
            {matches.length > 0 && (
                <div className="border-l-2 border-gold-deep bg-white/60 px-5 py-5">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-royal">
                        This might already be answered
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/60">
                        If none of these cover your situation, go ahead and send your question.
                    </p>
                    <div className="mt-4">
                        <FaqAccordion items={matches} single compact headingLevel="h4" />
                    </div>
                    <Link
                        to="/faq"
                        className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-royal underline-offset-4 hover:text-gold-deep hover:underline"
                    >
                        Browse all FAQs
                        <ArrowRight
                            size={15}
                            strokeWidth={1.75}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                        />
                    </Link>
                </div>
            )}
        </div>
    )
}
