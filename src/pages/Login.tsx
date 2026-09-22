import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { useAuth } from '../lib/auth'
import { formFieldClass } from '../lib/formspree'

function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
  return raw
}

export default function Login() {
  const { login, loginWithGoogle, error } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = safeNext(searchParams.get('next'))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      await login({ email, password })
      navigate(next, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setFormError(message)
      if (message.toLowerCase().includes('verif')) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`, { replace: true })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell title="Log in" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Sign in with email and password or Google. Your cart is saved to your
          account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm text-silver/80">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={formFieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-sm text-silver/80"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={formFieldClass}
            />
          </div>

          {(formError || error) && (
            <p className="text-sm text-red-300">{formError || error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold mt-2 w-full rounded-xl px-6 py-3 text-sm disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Log in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            void loginWithGoogle()
          }}
          className="mt-3 w-full rounded-xl border border-white/15 px-6 py-3 text-sm text-silver transition hover:border-gold/40 hover:text-gold"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-silver/70">
          <Link to="/forgot-password" className="text-gold transition hover:text-ivory">
            Forgot password?
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-silver/70">
          New here?{' '}
          <Link
            to={`/signup?next=${encodeURIComponent(next)}`}
            className="text-gold transition hover:text-ivory"
          >
            Create an account
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
