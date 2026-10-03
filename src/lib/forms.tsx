import { apiFetch } from './apiClient'

export type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export type InquiryKind = 'contact' | 'custom-tour' | 'flights' | 'hotels' | 'cars'

export type InquiryPayload = { kind: InquiryKind } & Record<string, string | number | undefined>

const HONEYPOT_NAME = '_gotcha'

/** Build a mailto: href from a subject and plain-text body lines. */
export function buildMailtoHref(to: string, subject: string, bodyLines: string[]): string {
    const body = encodeURIComponent(bodyLines.filter(Boolean).join('\n'))
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
}

/** POST an inquiry to the API, which emails it to the team. */
export async function submitInquiry(
    form: HTMLFormElement,
    payload: InquiryPayload,
): Promise<'sent' | 'error'> {
    const honeypot = new FormData(form).get(HONEYPOT_NAME)
    try {
        await apiFetch('/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                ...payload,
                honeypot: typeof honeypot === 'string' && honeypot ? honeypot : undefined,
            }),
        })
        return 'sent'
    } catch {
        return 'error'
    }
}

export const formFieldClass =
    'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-gold/60'

/** Hidden honeypot field; bots that fill it are silently dropped by the API. */
export function FormHoneypot() {
    return (
        <input
            type="text"
            name={HONEYPOT_NAME}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
    )
}
