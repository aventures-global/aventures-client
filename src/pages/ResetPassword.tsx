import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { resetPassword } from '../lib/authApi'
import { useAuth } from '../lib/auth'
import { formFieldClass } from '../lib/formspree'

export default function ResetPassword() {
  const { otp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!otp || !email) {
    return <Navigate to="/forgot-password" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await resetPassword({ email, otp: otp!, password })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell title="Set new password" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Choose a new password for <span className="text-ivory">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="new-password"
              className="mb-1.5 block text-sm text-silver/80"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={formFieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-sm text-silver/80"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className={formFieldClass}
            />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-xl px-6 py-3 text-sm disabled:opacity-60"
          >
            {submitting ? 'Saving…' : 'Update password'}
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
