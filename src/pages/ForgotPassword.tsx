import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { requestPasswordReset } from '../lib/authApi'
import { formFieldClass } from '../lib/formspree'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await requestPasswordReset(email)
      navigate(`/verify-reset?email=${encodeURIComponent(email)}`, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reset code')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell title="Forgot password" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Enter your email and we will send a one-time code to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="forgot-email" className="mb-1.5 block text-sm text-silver/80">
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={formFieldClass}
            />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-xl px-6 py-3 text-sm disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send reset code'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-silver/70">
          <Link to="/login" className="text-gold transition hover:text-ivory">
            Back to log in
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
