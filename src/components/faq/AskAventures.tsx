import { ArrowRight, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ASK_VISA_TYPES, type AskForm } from '../../hooks/useAskForm'
import { buildMailtoHref, FormHoneypot, lineFieldClass } from '../../lib/forms'

type AskAventuresProps = {
    form: AskForm
    /** Offered as a fallback when sending fails. */
    email?: string
    /** Rendered under the question field. */
    suggestions?: ReactNode
}

const primaryButtonClass =
    'group inline-flex items-center gap-2 rounded-[3px] border-2 border-royal bg-royal px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-70'

const secondaryButtonClass =
    'inline-flex items-center justify-center rounded-[3px] border-2 border-royal/70 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-royal transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white'

const nextSteps = [
    { to: '/visa-assistance', label: 'Explore visa information' },
    { to: '/blog', label: 'Read the Journal' },
    { to: '/destinations', label: 'Explore destinations' },
]

export default function AskAventures({ form, email, suggestions }: AskAventuresProps) {
    const { fields, setField, status, submit, reset } = form
    const sending = status === 'sending'

    const mailtoHref = email
        ? buildMailtoHref(email, `Question about ${fields.visaType || 'my visa or travel plans'}`, [
              `Name: ${fields.firstName} ${fields.lastName}`,
              `Email: ${fields.email}`,
              fields.visaType ? `Visa type: ${fields.visaType}` : '',
              '',
              fields.question,
          ])
        : undefined

    return (
        <div className="max-w-2xl">
            <div aria-live="polite">
                {status === 'sent' ? (
                    <div className="border-l-2 border-gold-deep bg-white/60 px-6 py-7">
                        <h2 className="font-noto-serif text-2xl text-royal">Question received!</h2>
                        <p className="mt-2 max-w-xl text-sm leading-7 text-ink/70">
                            Thank you for reaching out to AVENtures. We&rsquo;ve received your question and our team will
                            review it.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {nextSteps.map((step) => (
                                <Link key={step.to} to={step.to} className={secondaryButtonClass}>
                                    {step.label}
                                </Link>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={reset}
                            className="mt-6 text-sm font-medium text-royal underline-offset-4 hover:text-gold-deep hover:underline"
                        >
                            Ask another question
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-6">
                        <FormHoneypot />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                required
                                name="firstName"
                                autoComplete="given-name"
                                placeholder="First Name"
                                aria-label="First name"
                                value={fields.firstName}
                                onChange={(e) => setField('firstName', e.target.value)}
                                className={lineFieldClass}
                                disabled={sending}
                            />
                            <input
                                required
                                name="lastName"
                                autoComplete="family-name"
                                placeholder="Last Name"
                                aria-label="Last name"
                                value={fields.lastName}
                                onChange={(e) => setField('lastName', e.target.value)}
                                className={lineFieldClass}
                                disabled={sending}
                            />
                        </div>
                        <input
                            required
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email"
                            aria-label="Email"
                            value={fields.email}
                            onChange={(e) => setField('email', e.target.value)}
                            className={lineFieldClass}
                            disabled={sending}
                        />
                        <div className="relative">
                            <select
                                required
                                name="visaType"
                                aria-label="Visa type"
                                value={fields.visaType}
                                onChange={(e) => setField('visaType', e.target.value)}
                                className={`${lineFieldClass} cursor-pointer appearance-none pr-8 ${fields.visaType ? '' : 'text-ink/40'}`}
                                disabled={sending}
                            >
                                <option value="" disabled>
                                    Visa Type
                                </option>
                                {ASK_VISA_TYPES.map((type) => (
                                    <option key={type} value={type} className="text-ink">
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={18}
                                strokeWidth={1.6}
                                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-royal/70"
                                aria-hidden
                            />
                        </div>
                        <textarea
                            required
                            name="question"
                            placeholder="Tell us what you’d like to know..."
                            aria-label="Your question"
                            rows={5}
                            maxLength={5000}
                            value={fields.question}
                            onChange={(e) => setField('question', e.target.value)}
                            className={`${lineFieldClass} min-h-36 resize-y`}
                            disabled={sending}
                        />
                        {suggestions}
                        <div className="flex flex-col items-start gap-3 pt-2">
                            <button type="submit" disabled={sending} className={primaryButtonClass}>
                                {sending ? 'Sending...' : 'Ask AVENtures'}
                                {!sending && (
                                    <ArrowRight
                                        size={16}
                                        strokeWidth={1.75}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                        aria-hidden
                                    />
                                )}
                            </button>
                            {status === 'error' && (
                                <p className="text-sm text-ink/70">
                                    Something went wrong.{' '}
                                    {mailtoHref ? (
                                        <>
                                            <a href={mailtoHref} className="text-royal underline hover:text-gold-deep">
                                                Email us directly
                                            </a>{' '}
                                            instead.
                                        </>
                                    ) : (
                                        'Please try again in a moment.'
                                    )}
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </div>

            <p className="mt-10 font-noto-serif text-lg italic text-gold-deep">
                Your question could be the first step toward your next AVENture.
            </p>
        </div>
    )
}
