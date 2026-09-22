import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  addCartItem,
  fetchCart,
  removeCartItem,
  updateCartItem,
  type CartApiItem,
} from '../api'
import { useAuth } from './auth'
import { consumePendingCartAction } from './cartStorage'

export type CartLine = {
  id: string
  productId: string
  qty: number
  size?: string
  product?: CartApiItem['product']
}

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  isLoading: boolean
  addItem: (productId: string, qty?: number, size?: string) => Promise<void>
  updateQty: (itemId: string, qty: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

function countItems(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, isLoggedIn } = useAuth()
  const [lines, setLines] = useState<CartLine[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const refreshCart = useCallback(async () => {
    if (!token || !isLoggedIn) {
      setLines([])
      return
    }
    setIsLoading(true)
    try {
      const items = await fetchCart(token)
      setLines(
        items.map((item) => ({
          id: item.id,
          productId: item.productId,
          qty: item.qty,
          size: item.size,
          product: item.product,
        })),
      )
    } finally {
      setIsLoading(false)
    }
  }, [token, isLoggedIn])

  useEffect(() => {
    void refreshCart()
  }, [refreshCart])

  useEffect(() => {
    if (!token || !isLoggedIn) return
    const pending = consumePendingCartAction()
    if (!pending) return
    void (async () => {
      await addCartItem(token, pending)
      await refreshCart()
    })()
  }, [token, isLoggedIn, refreshCart])

  const addItem = useCallback(
    async (productId: string, qty = 1, size?: string) => {
      if (!token) {
        throw new Error('You must be logged in to add to cart')
      }
      await addCartItem(token, { productId, qty, size })
      await refreshCart()
    },
    [token, refreshCart],
  )

  const updateQty = useCallback(
    async (itemId: string, qty: number) => {
      if (!token) return
      await updateCartItem(token, itemId, qty)
      await refreshCart()
    },
    [token, refreshCart],
  )

  const removeItem = useCallback(
    async (itemId: string) => {
      if (!token) return
      await removeCartItem(token, itemId)
      await refreshCart()
    },
    [token, refreshCart],
  )

  const value = useMemo(
    () => ({
      lines,
      itemCount: countItems(lines),
      isLoading,
      addItem,
      updateQty,
      removeItem,
      refreshCart,
    }),
    [lines, isLoading, addItem, updateQty, removeItem, refreshCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
