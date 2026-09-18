import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SiteInfo } from '../../types/content'
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons'

type ContactProps = {
  site: SiteInfo
}

export default function Contact({ site }: ContactProps) {
  const [searchParams] = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [destination, setDestination] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const tour = searchParams.get('tour')
    if (tour) {
      setDestination(tour)
      setMessage(`I would like to inquire about ${tour}.`)
    }
  }, [searchParams])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const subject = encodeURIComponent(
      `Travel inquiry${destination ? ` — ${destination}` : ''} from ${firstName} ${lastName}`.trim(),
    )
    const body = encodeURIComponent(
      [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        destination ? `Destination: ${destination}` : null,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const fieldClass =
    'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-gold/60'

  return (
    <section id="contact" className="page-section">
      <div className="site-container flex min-h-0 flex-1 flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 font-serif text-3xl text-gold-gradient sm:text-4xl"
        >
          Begin Your Journey
        </motion.h2>

        <div className="grid flex-1 gap-12 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={fieldClass}
              />
              <input
                required
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
            <input
              name="destination"
              placeholder="Destination of interest"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={fieldClass}
            />
            <textarea
              required
              name="message"
              placeholder="How can we help you?"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-y`}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-gold rounded-xl px-7 py-3.5 text-base"
              >
                Send Message
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-sm text-silver/90"
          >
            <p className="leading-relaxed text-muted">{site.contactIntro}</p>
            <div className="space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-3 hover:text-gold"
              >
                <Mail size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{site.email}</span>
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex items-start gap-3 hover:text-gold"
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
                className="rounded-full border border-white/15 p-2.5 text-silver hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2.5 text-silver hover:border-gold hover:text-gold"
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
