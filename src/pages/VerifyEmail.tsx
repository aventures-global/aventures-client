import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { resendVerificationEmail, verifyEmailOtp } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { formFieldClass } from '../lib/formspree'

function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
  return raw
}

export default function VerifyEmail() {
  const { refresh } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const next = safeNext(searchParams.get('next'))

  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!email) {
      setError('Missing email address')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await verifyEmailOtp({ email, otp })
      await refresh()
      navigate(next, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    if (!email) return
    setMessage(null)
    setError(null)
    try {
      await resendVerificationEmail(email)
      setMessage('A new code was sent to your email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not resend code')
    }
  }

  return (
    <PageShell title="Verify email" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Enter the one-time code we sent to{' '}
          <span className="text-ivory">{email || 'your email'}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="verify-otp" className="mb-1.5 block text-sm text-silver/80">
              Verification code
            </label>
            <input
              id="verify-otp"
              type="text"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className={formFieldClass}
            />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-xl px-6 py-3 text-sm disabled:opacity-60"
          >
            {submitting ? 'Verifying…' : 'Verify email'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            void handleResend()
          }}
          className="mt-4 w-full text-sm text-gold transition hover:text-ivory"
        >
          Resend code
        </button>

        <p className="mt-6 text-center text-sm text-silver/70">
          <Link to="/login" className="text-gold transition hover:text-ivory">
            Back to log in
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
