import type { ReactNode } from 'react'
import type { FaqItem } from '../../types/content'
import FaqAccordion from './FaqAccordion'

type ContactFaqsProps = {
    /** `null` while loading. */
    faqs: FaqItem[] | null
    allLink: ReactNode
}

export default function ContactFaqs({ faqs, allLink }: ContactFaqsProps) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-royal">Quick answers</p>
            <h3 className="mt-3 font-noto-serif text-2xl text-ink sm:text-[1.7rem]">
                Frequently Asked Questions
            </h3>
            <div className="mt-6">
                {faqs === null ? (
                    <div aria-busy="true" aria-label="Loading questions" className="border-t border-royal/15">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="border-b border-royal/15 py-5">
                                <div className="h-4 w-4/5 animate-pulse rounded-[3px] bg-royal/10" />
                            </div>
                        ))}
                    </div>
                ) : faqs.length > 0 ? (
                    <FaqAccordion items={faqs} single compact headingLevel="h4" />
                ) : null}
            </div>
            <div className={faqs !== null && faqs.length === 0 ? '' : 'mt-6'}>{allLink}</div>
        </div>
    )
}
