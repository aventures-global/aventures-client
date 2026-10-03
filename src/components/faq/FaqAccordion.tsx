import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import type { FaqItem } from '../../types/content'

type FaqAccordionProps = {
    items: FaqItem[]
    /** Opening one answer closes the others. */
    single?: boolean
    compact?: boolean
    headingLevel?: 'h3' | 'h4'
}

export default function FaqAccordion({
    items,
    single = false,
    compact = false,
    headingLevel: Heading = 'h3',
}: FaqAccordionProps) {
    const baseId = useId()
    const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set())

    const toggle = (id: string) => {
        setOpen((current) => {
            if (single) return current.has(id) ? new Set() : new Set([id])
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <div className="border-t border-royal/15">
            {items.map((item) => {
                const isOpen = open.has(item.id)
                const buttonId = `${baseId}-${item.id}-q`
                const panelId = `${baseId}-${item.id}-a`
                return (
                    <div key={item.id} className="border-b border-royal/15">
                        <Heading>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(item.id)}
                                className={`group flex w-full items-start justify-between gap-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-royal/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream ${
                                    compact ? 'py-4' : 'py-5'
                                }`}
                            >
                                <span
                                    className={`font-noto-serif text-ink transition-colors group-hover:text-royal ${
                                        compact ? 'text-base leading-snug' : 'text-lg leading-snug'
                                    } ${isOpen ? 'text-royal' : ''}`}
                                >
                                    {item.question}
                                </span>
                                <span
                                    aria-hidden
                                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
                                        isOpen
                                            ? 'rotate-45 border-royal bg-royal text-cream'
                                            : 'border-gold-deep/70 text-gold-deep group-hover:border-royal group-hover:text-royal'
                                    }`}
                                >
                                    <Plus size={14} strokeWidth={2} />
                                </span>
                            </button>
                        </Heading>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            inert={!isOpen}
                            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            }`}
                        >
                            <div className="overflow-hidden">
                                <p
                                    className={`whitespace-pre-line pr-11 text-ink/65 ${
                                        compact ? 'pb-4 text-sm leading-7' : 'pb-6 text-[0.95rem] leading-7'
                                    }`}
                                >
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
