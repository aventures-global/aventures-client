/** Cart storage helpers + pending-add helpers. Prefer `useCart()` for UI updates. */
export {
  addToCart,
  consumePendingCartAction,
  formatMoney,
  getCart,
  parsePrice,
  removeFromCart,
  setPendingCartAction,
  updateCartQty,
  type CartLine,
  type PendingCartAction,
} from './cartStorage'
