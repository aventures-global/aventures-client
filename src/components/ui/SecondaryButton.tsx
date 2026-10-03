import type { ReactNode } from 'react'

type SecondaryButtonProps = {
    children: ReactNode
    className?: string
    to: string
}

export default function SecondaryButton({
    children,
    className = '',
    to,
}: SecondaryButtonProps) {
    return (
        <a href={to} className={`btn-secondary ${className}`}>
            <span>{children}</span>
        </a>
    )
}
