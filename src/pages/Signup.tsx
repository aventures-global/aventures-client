import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import { useAuth } from '../lib/auth'
import { consumePendingCartAction } from '../lib/cart'
import { useCart } from '../lib/cartContext'
import { formFieldClass } from '../lib/formspree'

function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/shop'
  return raw
}

export default function Signup() {
  const { signup } = useAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = safeNext(searchParams.get('next'))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    signup({ name, email })

    const pending = consumePendingCartAction()
    if (pending) {
      addItem(pending.productId, pending.qty, pending.size)
      navigate('/cart', { replace: true })
      return
    }

    navigate(next, { replace: true })
  }

  return (
    <PageShell title="Sign up" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Demo only — any details work. Submit to preview the signed-in shop
          experience. No password is checked.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="signup-name" className="mb-1.5 block text-sm text-silver/80">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Guest Traveler"
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
              autoComplete="email"
              placeholder="guest@aventures.demo"
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
              autoComplete="new-password"
              placeholder="Anything (not checked)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={formFieldClass}
            />
          </div>

          <button type="submit" className="btn-gold mt-2 w-full rounded-xl px-6 py-3 text-sm">
            Create account
          </button>
        </form>

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
