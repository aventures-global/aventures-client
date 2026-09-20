import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  buildMailtoHref,
  formFieldClass,
  FormspreeHoneypot,
  submitFormspree,
  type SubmitStatus,
} from '../../lib/formspree'

export type ServiceKind = 'flights' | 'hotels' | 'cars'

type ServiceRequestFormProps = {
  kind: ServiceKind
  fallbackEmail: string
}

const kindLabels: Record<ServiceKind, string> = {
  flights: 'Flight',
  hotels: 'Hotel',
  cars: 'Transfer',
}

const cabinOptions = ['Economy', 'Premium Economy', 'Business', 'First'] as const

export default function ServiceRequestForm({ kind, fallbackEmail }: ServiceRequestFormProps) {
  const [searchParams] = useSearchParams()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  // Flights
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [cabin, setCabin] = useState('')

  // Hotels
  const [hotelDestination, setHotelDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [rooms, setRooms] = useState('1')
  const [guests, setGuests] = useState('2')

  // Cars
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [carPassengers, setCarPassengers] = useState('1')

  useEffect(() => {
    const tour = searchParams.get('tour')
    if (!tour) return

    if (kind === 'flights') {
      setDestination(tour)
      setNotes(`I would like airfare arranged for ${tour}.`)
    } else if (kind === 'hotels') {
      setHotelDestination(tour)
      setNotes(`I would like hotel arrangements for ${tour}.`)
    } else {
      setPickup(tour)
      setNotes(`I would like transfers arranged for ${tour}.`)
    }
  }, [searchParams, kind])

  function buildSubject() {
    const label = kindLabels[kind]
    const place =
      kind === 'flights'
        ? destination
        : kind === 'hotels'
          ? hotelDestination
          : pickup
    return `${label} request${place ? ` — ${place}` : ''} from ${firstName} ${lastName}`.trim()
  }

  function buildMailtoBody(): string[] {
    const lines = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      `Service: ${kindLabels[kind]}`,
    ]

    if (kind === 'flights') {
      lines.push(
        `Origin: ${origin}`,
        `Destination: ${destination}`,
        `Depart: ${departDate}`,
        returnDate ? `Return: ${returnDate}` : '',
        `Passengers: ${passengers}`,
        cabin ? `Cabin: ${cabin}` : '',
      )
    } else if (kind === 'hotels') {
      lines.push(
        `Destination: ${hotelDestination}`,
        `Check-in: ${checkIn}`,
        `Check-out: ${checkOut}`,
        `Rooms: ${rooms}`,
        `Guests: ${guests}`,
      )
    } else {
      lines.push(
        `Pickup: ${pickup}`,
        dropoff ? `Drop-off: ${dropoff}` : '',
        `Pickup date: ${pickupDate}`,
        `Passengers: ${carPassengers}`,
      )
    }

    lines.push('', notes)
    return lines
  }

  function buildPayload() {
    const base = {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      notes,
      service: kind,
      _subject: buildSubject(),
    }

    if (kind === 'flights') {
      return {
        ...base,
        origin,
        destination,
        departDate,
        returnDate: returnDate || undefined,
        passengers,
        cabin: cabin || undefined,
      }
    }

    if (kind === 'hotels') {
      return {
        ...base,
        destination: hotelDestination,
        checkIn,
        checkOut,
        rooms,
        guests,
      }
    }

    return {
      ...base,
      pickup,
      dropoff: dropoff || undefined,
      pickupDate,
      passengers: carPassengers,
    }
  }

  function resetForm() {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setNotes('')
    setOrigin('')
    setDestination('')
    setDepartDate('')
    setReturnDate('')
    setPassengers('1')
    setCabin('')
    setHotelDestination('')
    setCheckIn('')
    setCheckOut('')
    setRooms('1')
    setGuests('2')
    setPickup('')
    setDropoff('')
    setPickupDate('')
    setCarPassengers('1')
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

      {kind === 'flights' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="origin"
              placeholder="Origin city / airport"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className={formFieldClass}
              disabled={disabled}
            />
            <input
              required
              name="destination"
              placeholder="Destination city / airport"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={formFieldClass}
              disabled={disabled}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Depart
              </span>
              <input
                required
                type="date"
                name="departDate"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Return (optional)
              </span>
              <input
                type="date"
                name="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Passengers
              </span>
              <input
                required
                type="number"
                min={1}
                max={20}
                name="passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Cabin (optional)
              </span>
              <select
                name="cabin"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              >
                <option value="">No preference</option>
                {cabinOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}

      {kind === 'hotels' && (
        <>
          <input
            required
            name="destination"
            placeholder="Destination / city"
            value={hotelDestination}
            onChange={(e) => setHotelDestination(e.target.value)}
            className={formFieldClass}
            disabled={disabled}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Check-in
              </span>
              <input
                required
                type="date"
                name="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Check-out
              </span>
              <input
                required
                type="date"
                name="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Rooms
              </span>
              <input
                required
                type="number"
                min={1}
                max={10}
                name="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Guests
              </span>
              <input
                required
                type="number"
                min={1}
                max={20}
                name="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
          </div>
        </>
      )}

      {kind === 'cars' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="pickup"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className={formFieldClass}
              disabled={disabled}
            />
            <input
              name="dropoff"
              placeholder="Drop-off (optional)"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className={formFieldClass}
              disabled={disabled}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Pickup date
              </span>
              <input
                required
                type="date"
                name="pickupDate"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Passengers
              </span>
              <input
                required
                type="number"
                min={1}
                max={20}
                name="passengers"
                value={carPassengers}
                onChange={(e) => setCarPassengers(e.target.value)}
                className={formFieldClass}
                disabled={disabled}
              />
            </label>
          </div>
        </>
      )}

      <textarea
        name="notes"
        placeholder="Anything else we should know?"
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
          {status === 'sending' ? 'Sending...' : 'Send request'}
        </button>
        <div role="status" aria-live="polite" className="w-full text-right text-sm">
          {status === 'sent' && (
            <p className="text-gold">
              Thank you — your request was sent. We will be in touch shortly.
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
