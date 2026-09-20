import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  addToCart as persistAdd,
  getCart,
  removeFromCart as persistRemove,
  updateCartQty as persistUpdate,
  type CartLine,
} from './cartStorage'

export type { CartLine }

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  addItem: (productId: string, qty?: number, size?: string) => void
  updateQty: (productId: string, qty: number, size?: string) => void
  removeItem: (productId: string, size?: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

function countItems(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => getCart())

  const addItem = useCallback((productId: string, qty = 1, size?: string) => {
    setLines(persistAdd(productId, qty, size))
  }, [])

  const updateQty = useCallback((productId: string, qty: number, size?: string) => {
    setLines(persistUpdate(productId, qty, size))
  }, [])

  const removeItem = useCallback((productId: string, size?: string) => {
    setLines(persistRemove(productId, size))
  }, [])

  const value = useMemo(
    () => ({
      lines,
      itemCount: countItems(lines),
      addItem,
      updateQty,
      removeItem,
    }),
    [lines, addItem, updateQty, removeItem],
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
