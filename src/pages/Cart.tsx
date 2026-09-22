import { Minus, Plus, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import SafeImage from '../components/ui/SafeImage'
import { useAuth } from '../lib/auth'
import { formatMoney, parsePrice } from '../lib/cart'
import { useCart } from '../lib/cartContext'

export default function Cart() {
  const { isLoggedIn } = useAuth()
  const { lines, updateQty, removeItem, isLoading } = useCart()

  const rows = useMemo(
    () => lines.filter((line) => Boolean(line.product)),
    [lines],
  )

  const subtotal = useMemo(
    () =>
      rows.reduce((sum, row) => {
        if (!row.product) return sum
        return sum + parsePrice(row.product.price) * row.qty
      }, 0),
    [rows],
  )

  if (!isLoggedIn) {
    return <Navigate to="/login?next=/cart" replace />
  }

  return (
    <PageShell title="Cart" eyebrow="Shop" noIndex>
      <div className="mx-auto max-w-3xl">
        {isLoading ? (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-28 skeleton-shimmer rounded-xl" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-white/10 px-6 py-16 text-center">
            <p className="font-serif text-2xl text-white">Your cart is empty</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-silver/70">
              Browse the shop and add a few pieces — checkout is coming soon.
            </p>
            <Link
              to="/shop"
              className="btn-gold mt-6 inline-flex rounded-xl px-6 py-3 text-sm"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {rows.map((row) => {
                if (!row.product) return null
                const lineTotal = parsePrice(row.product.price) * row.qty
                return (
                  <li
                    key={row.id}
                    className="flex gap-4 rounded-xl border border-white/10 bg-ink-card/40 p-4 sm:gap-5 sm:p-5"
                  >
                    <Link
                      to={`/shop/${row.product.slug}`}
                      className="shrink-0 overflow-hidden rounded-lg border border-white/8"
                    >
                      <SafeImage
                        src={row.product.coverImage}
                        alt={row.product.name}
                        className="h-20 w-20 sm:h-24 sm:w-24"
                        imgClassName="object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/shop/${row.product.slug}`}
                            className="font-serif text-lg text-white transition hover:text-gold"
                          >
                            {row.product.name}
                          </Link>
                          {row.size ? (
                            <p className="mt-0.5 text-xs text-silver/55">Size: {row.size}</p>
                          ) : null}
                          <p className="mt-1 text-sm text-gold/80">{row.product.price}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${row.product.name}`}
                          onClick={() => {
                            void removeItem(row.id)
                          }}
                          className="rounded-md p-1.5 text-silver/50 transition hover:text-gold"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-lg border border-white/15">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-2.5 py-1.5 text-silver/70 transition hover:text-gold"
                            onClick={() => {
                              void updateQty(row.id, row.qty - 1)
                            }}
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="min-w-8 text-center text-sm text-white">
                            {row.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-2.5 py-1.5 text-silver/70 transition hover:text-gold"
                            onClick={() => {
                              void updateQty(row.id, Math.min(10, row.qty + 1))
                            }}
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm text-silver/80">{formatMoney(lineTotal)}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 rounded-xl border border-white/10 bg-ink-card/40 p-5 sm:p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-silver/70">Subtotal</span>
                <span className="font-serif text-xl text-gold-gradient">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-silver/50">
                Shipping and tax calculated at checkout — not available in this demo.
              </p>
              <button
                type="button"
                disabled
                className="btn-gold mt-5 w-full cursor-not-allowed rounded-xl px-6 py-3 text-sm opacity-50"
              >
                Checkout coming soon
              </button>
              <Link
                to="/shop"
                className="mt-3 block text-center text-sm text-gold transition hover:text-ivory"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </PageShell>
  )
}
