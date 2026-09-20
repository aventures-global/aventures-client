import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  buildMailtoHref,
  formFieldClass,
  FormspreeHoneypot,
  submitFormspree,
  type SubmitStatus,
} from '../../lib/formspree'

type CustomTourFormProps = {
  fallbackEmail: string
}

const flightOptions = [
  { id: 'not-needed', label: 'Not needed' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
  { id: 'both', label: 'Both' },
] as const

type FlightPreference = (typeof flightOptions)[number]['id']

const addOnOptions = [
  { id: 'hotels', label: 'Hotels' },
  { id: 'visas', label: 'Visas' },
  { id: 'guides', label: 'Guides & transfers' },
  { id: 'package', label: 'Holiday package' },
] as const

type AddOnId = (typeof addOnOptions)[number]['id']

export default function CustomTourForm({ fallbackEmail }: CustomTourFormProps) {
  const [searchParams] = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [destination, setDestination] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [travelers, setTravelers] = useState('2')
  const [tripLength, setTripLength] = useState('')
  const [flights, setFlights] = useState<FlightPreference | ''>('')
  const [addOns, setAddOns] = useState<AddOnId[]>([])
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    const tour = searchParams.get('tour')
    if (!tour) return
    setDestination(tour)
    setNotes(`I would like to inquire about ${tour}.`)
  }, [searchParams])

  function toggleAddOn(id: AddOnId) {
    setAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function flightLabel() {
    return flightOptions.find((option) => option.id === flights)?.label ?? ''
  }

  function addOnsLabel() {
    if (addOns.length === 0) return 'None selected'
    return addOnOptions
      .filter((option) => addOns.includes(option.id))
      .map((option) => option.label)
      .join(', ')
  }

  function buildSubject() {
    return `Custom tour inquiry${destination ? ` — ${destination}` : ''} from ${firstName} ${lastName}`.trim()
  }

  function buildMailtoBody(): string[] {
    return [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      'Service: Custom tour',
      `Destination(s): ${destination}`,
      travelDates ? `Travel dates: ${travelDates}` : '',
      `Travelers: ${travelers}`,
      tripLength ? `Preferred length: ${tripLength}` : '',
      `Flights: ${flightLabel()}`,
      `Also interested in: ${addOnsLabel()}`,
      '',
      notes,
    ]
  }

  function buildPayload() {
    return {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      destination,
      travelDates: travelDates || undefined,
      travelers,
      tripLength: tripLength || undefined,
      flights: flightLabel(),
      addOns: addOnsLabel(),
      notes,
      service: 'custom-tour',
      _subject: buildSubject(),
    }
  }

  function resetForm() {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setDestination('')
    setTravelDates('')
    setTravelers('2')
    setTripLength('')
    setFlights('')
    setAddOns([])
    setNotes('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const subject = buildSubject()
    const mailtoHref = buildMailtoHref(fallbackEmail, subject, buildMailtoBody())

    setStatus('sending')
    const result = await submitFormspree(buildPayload())

    if (result === 'mailto') {
      setStatus('idle')
      window.location.href = mailtoHref
      return
    }

    if (result === 'error') {
      setStatus('error')
      return
    }

    resetForm()
    setStatus('sent')
  }

  const mailtoHref = buildMailtoHref(fallbackEmail, buildSubject(), buildMailtoBody())
  const disabled = status === 'sending'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormspreeHoneypot />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
        <input
          required
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
      </div>

      <input
        required
        name="destination"
        placeholder="Destination(s) of interest"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className={formFieldClass}
        disabled={disabled}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="travelDates"
          placeholder='Approx dates or "flexible"'
          value={travelDates}
          onChange={(e) => setTravelDates(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
        <input
          name="tripLength"
          placeholder="Preferred length (e.g. 7 days)"
          value={tripLength}
          onChange={(e) => setTripLength(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Travelers
        </span>
        <input
          required
          type="number"
          min={1}
          max={30}
          name="travelers"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className={formFieldClass}
          disabled={disabled}
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-xs uppercase tracking-wider text-muted">Flights</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {flightOptions.map((option) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                flights === option.id
                  ? 'border-gold/50 bg-gold/5 text-white'
                  : 'border-white/15 text-silver/85 hover:border-white/25'
              }`}
            >
              <input
                required
                type="radio"
                name="flights"
                value={option.id}
                checked={flights === option.id}
                onChange={() => setFlights(option.id)}
                className="accent-gold"
                disabled={disabled}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs uppercase tracking-wider text-muted">
          Also interested in (optional)
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {addOnOptions.map((option) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                addOns.includes(option.id)
                  ? 'border-gold/50 bg-gold/5 text-white'
                  : 'border-white/15 text-silver/85 hover:border-white/25'
              }`}
            >
              <input
                type="checkbox"
                name="addOns"
                value={option.id}
                checked={addOns.includes(option.id)}
                onChange={() => toggleAddOn(option.id)}
                className="accent-gold"
                disabled={disabled}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <textarea
        name="notes"
        placeholder="Pace, occasions, accessibility, or anything else we should know…"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className={`${formFieldClass} resize-y`}
        disabled={disabled}
      />

      <div className="flex flex-col items-end gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="btn-gold rounded-xl px-7 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending...' : 'Send inquiry'}
        </button>
        <div role="status" aria-live="polite" className="w-full text-right text-sm">
          {status === 'sent' && (
            <p className="text-gold">
              Thank you — your inquiry was sent. We will be in touch shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="text-silver/90">
              Something went wrong.{' '}
              <a href={mailtoHref} className="text-gold underline hover:text-gold-mid">
                Email us directly
              </a>{' '}
              instead.
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
