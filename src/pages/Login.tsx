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

export default function Login() {
  const { login } = useAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = safeNext(searchParams.get('next'))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    login({ name, email })

    const pending = consumePendingCartAction()
    if (pending) {
      addItem(pending.productId, pending.qty, pending.size)
      navigate('/cart', { replace: true })
      return
    }

    navigate(next, { replace: true })
  }

  return (
    <PageShell title="Log in" eyebrow="Account" noIndex>
      <div className="mx-auto max-w-md">
        <p className="text-sm leading-relaxed text-silver/70">
          Demo only — any details work. Submit to preview the signed-in shop
          experience. No password is checked.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="login-name" className="mb-1.5 block text-sm text-silver/80">
              Name
            </label>
            <input
              id="login-name"
              type="text"
              autoComplete="name"
              placeholder="Guest Traveler"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={formFieldClass}
            />
          </div>
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm text-silver/80">
              Email
            </label>
            <input
              id="login-email"
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
              htmlFor="login-password"
              className="mb-1.5 block text-sm text-silver/80"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Anything (not checked)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={formFieldClass}
            />
          </div>

          <button type="submit" className="btn-gold mt-2 w-full rounded-xl px-6 py-3 text-sm">
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-silver/70">
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
