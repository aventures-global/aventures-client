export type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export type FormspreePayload = Record<string, string | number | undefined>

const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export function getFormspreeId(): string | undefined {
  return formspreeId?.trim() || undefined
}

/** Build a mailto: href from a subject and plain-text body lines. */
export function buildMailtoHref(to: string, subject: string, bodyLines: string[]): string {
  const body = encodeURIComponent(bodyLines.filter(Boolean).join('\n'))
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
}

export type SubmitFormspreeResult = 'sent' | 'error' | 'mailto'

/**
 * POST to Formspree when `VITE_FORMSPREE_ID` is set.
 * Returns `'mailto'` when the env var is missing so the caller can open a fallback.
 */
export async function submitFormspree(
  payload: FormspreePayload,
): Promise<SubmitFormspreeResult> {
  const id = getFormspreeId()
  if (!id) return 'mailto'

  try {
    const response = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) return 'error'

    const data = (await response.json()) as { ok?: boolean }
    return data.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}

export const formFieldClass =
  'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-gold/60'

/** Hidden honeypot field for Formspree bot filtering. */
export function FormspreeHoneypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  )
}
