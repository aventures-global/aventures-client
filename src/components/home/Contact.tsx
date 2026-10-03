import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { FaqItem, SiteInfo } from '../../types/content'
import {
    buildMailtoHref,
    FormHoneypot,
    lineFieldClass,
    submitInquiry,
    type SubmitStatus,
} from '../../lib/forms'
import ContactFaqs from '../faq/ContactFaqs'

type ContactProps = {
    site: SiteInfo
    /** `null` while loading. */
    topFaqs: FaqItem[] | null
}

const interestSuggestions = [
    'Flights',
    'Hotels',
    'A holiday package',
    'A custom itinerary',
    'Guides & drivers',
    'Visa assistance',
] as const

function buildSubject(firstName: string, lastName: string, interest: string) {
    return `Travel inquiry${interest ? ` — ${interest}` : ''} from ${firstName} ${lastName}`.trim()
}

function contactMailto(
    to: string,
    firstName: string,
    lastName: string,
    email: string,
    interest: string,
    message: string,
) {
    return buildMailtoHref(to, buildSubject(firstName, lastName, interest), [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        interest ? `Looking for: ${interest}` : '',
        '',
        message,
    ])
}

export default function Contact({ site, topFaqs }: ContactProps) {
    const [searchParams] = useSearchParams()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [interest, setInterest] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<SubmitStatus>('idle')

    useEffect(() => {
        const tour = searchParams.get('tour')
        if (tour) {
            setInterest(tour)
            setMessage(`I would like to inquire about ${tour}.`)
        }
    }, [searchParams])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setStatus('sending')
        const result = await submitInquiry(event.currentTarget, {
            kind: 'contact',
            firstName,
            lastName,
            email,
            interest: interest || undefined,
            message,
        })

        if (result === 'error') {
            setStatus('error')
            return
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setInterest('')
        setMessage('')
        setStatus('sent')
    }

    const mailtoHref = contactMailto(
        site.email,
        firstName,
        lastName,
        email,
        interest,
        message,
    )

    return (
        <section id="contact" className="page-section">
            <div className="site-container flex min-h-0 flex-1 flex-col">
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center"
                >
                    <span className="block text-xs font-medium uppercase tracking-[0.3em] text-royal">Begin your journey</span>
                    <span className="mt-4 block font-noto-serif text-4xl text-ink sm:text-5xl">Your AVENture Starts With One Conversation</span>
                </motion.h2>

                <div className="grid flex-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >
                        <FormHoneypot />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                required
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={lineFieldClass}
                                disabled={status === 'sending'}
                            />
                            <input
                                required
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={lineFieldClass}
                                disabled={status === 'sending'}
                            />
                        </div>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={lineFieldClass}
                            disabled={status === 'sending'}
                        />
                        <div>
                            <input
                                name="interest"
                                placeholder="What are you looking for?"
                                aria-label="What are you looking for?"
                                aria-describedby="contact-interest-hint"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                className={lineFieldClass}
                                disabled={status === 'sending'}
                            />
                            <p id="contact-interest-hint" className="mt-2 text-xs text-ink/50">
                                A place, a service, or both.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Suggestions">
                                {interestSuggestions.map((suggestion) => {
                                    const selected = interest === suggestion
                                    return (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setInterest(suggestion)}
                                            disabled={status === 'sending'}
                                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
                                                selected
                                                    ? 'border-gold-deep bg-gold-deep text-white'
                                                    : 'border-royal/30 text-royal hover:border-gold-deep hover:text-gold-deep'
                                            }`}
                                        >
                                            {suggestion}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <textarea
                            required
                            name="message"
                            placeholder="How can we help you?"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${lineFieldClass} min-h-36 resize-y`}
                            disabled={status === 'sending'}
                        />
                        <div className="flex flex-col items-start gap-3 pt-2 sm:items-end">
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="rounded-[3px] border-2 border-royal bg-royal px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-gold-deep hover:bg-gold-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                            <div role="status" aria-live="polite" className="w-full text-right text-sm">
                                {status === 'sent' && (
                                    <p className="text-royal">
                                        Thank you — your message was sent. We will be in touch shortly.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-ink/70">
                                        Something went wrong.{' '}
                                        <a href={mailtoHref} className="text-gold underline hover:text-gold-mid">
                                            Email us directly
                                        </a>{' '}
                                        instead.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="border-t border-royal/15 pt-9 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
                    >
                        <ContactFaqs
                            faqs={topFaqs}
                            allLink={
                                <Link
                                    to="/faq"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-royal transition-colors hover:text-gold-deep"
                                >
                                    See all FAQs
                                    <ArrowRight
                                        size={16}
                                        strokeWidth={1.75}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                        aria-hidden
                                    />
                                </Link>
                            }
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
