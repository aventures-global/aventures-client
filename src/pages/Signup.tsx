import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { useAuth } from '../lib/auth'
import { formFieldClass } from '../lib/formspree'

function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
  return raw
}

export default function Signup() {
  const { signup, loginWithGoogle, error } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = safeNext(searchParams.get('next'))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      await signup({ name, email, password })
      navigate(`/verify-email?email=${encodeURIComponent(email)}&next=${encodeURIComponent(next)}`, {
        replace: true,
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell title="Sign up" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Create an account with email or Google. We will ask you to verify your
          email before shopping.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="signup-name" className="mb-1.5 block text-sm text-silver/80">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={formFieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="mb-1.5 block text-sm text-silver/80"
            >
              Email
            </label>
            <input
              id="signup-email"
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
              htmlFor="signup-password"
              className="mb-1.5 block text-sm text-silver/80"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
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
            {submitting ? 'Creating…' : 'Create account'}
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

        <p className="mt-6 text-center text-sm text-silver/70">
          Already have an account?{' '}
          <Link
            to={`/login?next=${encodeURIComponent(next)}`}
            className="text-gold transition hover:text-ivory"
          >
            Log in
          </Link>
        </p>
      </div>
    </PageShell>
  )
}
