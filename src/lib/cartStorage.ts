export type CartLine = {
  productId: string
  qty: number
  size?: string
}

export type PendingCartAction = {
  productId: string
  qty: number
  size?: string
}

const CART_KEY = 'aventures-demo-cart'
const PENDING_KEY = 'aventures-pending-cart'

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getCart(): CartLine[] {
  const stored = readJson<CartLine[]>(CART_KEY)
  if (!Array.isArray(stored)) return []
  return stored.filter(
    (line) =>
      line &&
      typeof line.productId === 'string' &&
      typeof line.qty === 'number' &&
      line.qty > 0,
  )
}

export function setCart(lines: CartLine[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(lines))
}

export function addToCart(productId: string, qty = 1, size?: string) {
  const cart = getCart()
  const existing = cart.find(
    (line) => line.productId === productId && (line.size ?? '') === (size ?? ''),
  )
  if (existing) {
    existing.qty += qty
  } else {
    cart.push({ productId, qty, size })
  }
  setCart(cart)
  return cart
}

export function updateCartQty(productId: string, qty: number, size?: string) {
  const cart = getCart()
  const next = cart
    .map((line) => {
      if (line.productId !== productId || (line.size ?? '') !== (size ?? '')) {
        return line
      }
      return { ...line, qty }
    })
    .filter((line) => line.qty > 0)
  setCart(next)
  return next
}

export function removeFromCart(productId: string, size?: string) {
  const next = getCart().filter(
    (line) =>
      !(line.productId === productId && (line.size ?? '') === (size ?? '')),
  )
  setCart(next)
  return next
}

export function setPendingCartAction(action: PendingCartAction) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(action))
}

export function consumePendingCartAction(): PendingCartAction | null {
  const pending = readJson<PendingCartAction>(PENDING_KEY)
  sessionStorage.removeItem(PENDING_KEY)
  if (
    !pending ||
    typeof pending.productId !== 'string' ||
    typeof pending.qty !== 'number'
  ) {
    return null
  }
  return pending
}

export function parsePrice(price: string): number {
  const match = price.replace(/,/g, '').match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`
}
