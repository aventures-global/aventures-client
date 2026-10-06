import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Renders the small Markdown subset staff can use in site page copy: blank-line paragraphs,
 * `- ` bullet lists, `**bold**`, `[text](url)`, and `{placeholder}` values. Never emits raw HTML.
 */

export type MarkdownVars = Record<string, string>

type MiniMarkdownProps = {
    text: string
    vars?: MarkdownVars
    linkClassName?: string
    listClassName?: string
    paragraphClassName?: string
}

// Placeholders are filled after parsing, since values like phone numbers contain spaces and parentheses.
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

function fill(text: string, vars: MarkdownVars) {
    return text.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match)
}

function safeHref(href: string) {
    if (href.startsWith('tel:')) return `tel:${href.slice(4).replace(/[^\d+]/g, '')}`
    if (/^(\/(?!\/)|#|mailto:|https?:\/\/)/.test(href)) return href
    return null
}

function renderInline(text: string, vars: MarkdownVars, linkClassName: string): ReactNode[] {
    const nodes: ReactNode[] = []
    let last = 0
    for (const match of text.matchAll(INLINE)) {
        const index = match.index ?? 0
        if (index > last) nodes.push(fill(text.slice(last, index), vars))
        const key = nodes.length
        if (match[1] !== undefined) {
            nodes.push(
                <strong key={key} className="font-medium text-ink">
                    {renderInline(match[1], vars, linkClassName)}
                </strong>,
            )
        } else {
            const label = fill(match[2], vars)
            const href = safeHref(fill(match[3], vars))
            if (!href) nodes.push(label)
            else if (href.startsWith('/')) {
                nodes.push(
                    <Link key={key} to={href} className={linkClassName}>
                        {label}
                    </Link>,
                )
            } else {
                const external = href.startsWith('http')
                nodes.push(
                    <a
                        key={key}
                        href={href}
                        className={linkClassName}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                        {label}
                    </a>,
                )
            }
        }
        last = index + match[0].length
    }
    if (last < text.length) nodes.push(fill(text.slice(last), vars))
    return nodes
}

export default function MiniMarkdown({
    text,
    vars = {},
    linkClassName = '',
    listClassName = 'list-disc space-y-2 pl-5 marker:text-gold-deep',
    paragraphClassName,
}: MiniMarkdownProps) {
    const blocks = text
        .replace(/\r\n/g, '\n')
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)

    return (
        <>
            {blocks.map((block, index) => {
                const lines = block.split('\n').map((line) => line.trim())
                if (lines.every((line) => line.startsWith('- '))) {
                    return (
                        <ul key={index} className={listClassName}>
                            {lines.map((line, i) => (
                                <li key={i}>{renderInline(line.slice(2), vars, linkClassName)}</li>
                            ))}
                        </ul>
                    )
                }
                return (
                    <p key={index} className={paragraphClassName}>
                        {lines.map((line, i) => (
                            <Fragment key={i}>
                                {i > 0 ? ' ' : null}
                                {renderInline(line, vars, linkClassName)}
                            </Fragment>
                        ))}
                    </p>
                )
            })}
        </>
    )
}
