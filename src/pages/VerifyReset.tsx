import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { verifyResetOtp } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { formFieldClass } from '../lib/formspree'

export default function VerifyReset() {
  const { setVerificationCode } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
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
      await verifyResetOtp({ email, otp })
      setVerificationCode(otp)
      navigate(`/reset-password?email=${encodeURIComponent(email)}`, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell title="Verify reset code" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Enter the reset code sent to{' '}
          <span className="text-ivory">{email || 'your email'}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="reset-otp" className="mb-1.5 block text-sm text-silver/80">
              Reset code
            </label>
            <input
              id="reset-otp"
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
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-xl px-6 py-3 text-sm disabled:opacity-60"
          >
            {submitting ? 'Checking…' : 'Continue'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-silver/70">
          <Link to="/forgot-password" className="text-gold transition hover:text-ivory">
            Request a new code
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
