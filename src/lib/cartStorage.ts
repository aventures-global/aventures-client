export type PendingCartAction = {
  productId: string
  qty: number
  size?: string
}

const PENDING_KEY = 'aventures-pending-cart'

export function setPendingCartAction(action: PendingCartAction) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(action))
}

export function consumePendingCartAction(): PendingCartAction | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    sessionStorage.removeItem(PENDING_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PendingCartAction
    if (!parsed?.productId || typeof parsed.qty !== 'number') return null
    return parsed
  } catch {
    sessionStorage.removeItem(PENDING_KEY)
    return null
  }
}

export function parsePrice(price: string): number {
  const match = price.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/)
  return match ? Number(match[1]) : 0
}

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`
}
