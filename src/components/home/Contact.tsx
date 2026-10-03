import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SiteInfo } from '../../types/content'
import {
    buildMailtoHref,
    FormspreeHoneypot,
    submitFormspree,
    type SubmitStatus,
} from '../../lib/formspree'
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons'

type ContactProps = {
    site: SiteInfo
}

const contactFieldClass =
    'w-full border-0 border-b-2 border-royal/55 bg-transparent px-0 py-3.5 text-sm text-ink outline-none transition-[border-color] duration-300 placeholder:text-ink/40 focus:border-gold-deep focus:ring-0'

function buildSubject(firstName: string, lastName: string, destination: string) {
    return `Travel inquiry${destination ? ` — ${destination}` : ''} from ${firstName} ${lastName}`.trim()
}

function contactMailto(
    to: string,
    firstName: string,
    lastName: string,
    email: string,
    destination: string,
    message: string,
) {
    return buildMailtoHref(to, buildSubject(firstName, lastName, destination), [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        destination ? `Destination: ${destination}` : '',
        '',
        message,
    ])
}

export default function Contact({ site }: ContactProps) {
    const [searchParams] = useSearchParams()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [destination, setDestination] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<SubmitStatus>('idle')

    useEffect(() => {
        const tour = searchParams.get('tour')
        if (tour) {
            setDestination(tour)
            setMessage(`I would like to inquire about ${tour}.`)
        }
    }, [searchParams])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const subject = buildSubject(firstName, lastName, destination)
        const mailtoHref = contactMailto(
            site.email,
            firstName,
            lastName,
            email,
            destination,
            message,
        )

        setStatus('sending')
        const result = await submitFormspree({
            firstName,
            lastName,
            email,
            destination,
            message,
            _subject: subject,
        })

        if (result === 'mailto') {
            setStatus('idle')
            window.location.href = mailtoHref
            return
        }

        if (result === 'error') {
            setStatus('error')
            return
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setDestination('')
        setMessage('')
        setStatus('sent')
    }

    const mailtoHref = contactMailto(
        site.email,
        firstName,
        lastName,
        email,
        destination,
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
                        <FormspreeHoneypot />
                        <div className="grid gap-7 sm:grid-cols-2">
                            <input
                                required
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={contactFieldClass}
                                disabled={status === 'sending'}
                            />
                            <input
                                required
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={contactFieldClass}
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
                            className={contactFieldClass}
                            disabled={status === 'sending'}
                        />
                        <input
                            name="destination"
                            placeholder="Destination of interest"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className={contactFieldClass}
                            disabled={status === 'sending'}
                        />
                        <textarea
                            required
                            name="message"
                            placeholder="How can we help you?"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${contactFieldClass} min-h-36 resize-y`}
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
                                className="space-y-8 border-t border-royal/15 pt-9 text-sm text-ink/70 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
                    >
                        <p className="text-base leading-8 text-ink/60">{site.contactIntro}</p>
                        <div className="space-y-4">
                            <a
                                href={`mailto:${site.email}`}
                                className="flex items-start gap-3 hover:text-royal"
                            >
                                <Mail size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                                <span>{site.email}</span>
                            </a>
                            <a
                                href={`tel:${site.phone}`}
                                className="flex items-start gap-3 hover:text-royal"
                            >
                                <Phone size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                                <span>{site.phoneDisplay}</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                                <span>
                                    {site.addressLines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a
                                href={site.facebookUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-royal/20 p-2.5 text-royal hover:border-gold-deep hover:text-gold-deep"
                                aria-label="Facebook"
                            >
                                <FacebookIcon size={18} />
                            </a>
                            <a
                                href={site.instagramUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-royal/20 p-2.5 text-royal hover:border-gold-deep hover:text-gold-deep"
                                aria-label="Instagram"
                            >
                                <InstagramIcon size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
