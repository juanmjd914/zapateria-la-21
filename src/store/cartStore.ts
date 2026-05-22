import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartProduct {
  id: number
  brand: string
  name: string
  price: number
  img: string
  tag?: string
}

export interface CartItem {
  product: CartProduct
  quantity: number
  size: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Acciones
  openCart:       () => void
  closeCart:      () => void
  toggleCart:     () => void
  addItem:        (product: CartProduct, size?: string) => void
  removeItem:     (id: number, size: string) => void
  updateQuantity: (id: number, size: string, qty: number) => void
  clearCart:      () => void

  // Derivados
  totalItems:  () => number
  totalPrice:  () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),

      addItem: (product, size = 'Única') => {
        const items = get().items
        const existing = items.find(
          i => i.product.id === product.id && i.size === size
        )
        if (existing) {
          set({
            items: items.map(i =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          })
        } else {
          set({ items: [...items, { product, quantity: 1, size }], isOpen: true })
        }
      },

      removeItem: (id, size) =>
        set(s => ({
          items: s.items.filter(i => !(i.product.id === id && i.size === size)),
        })),

      updateQuantity: (id, size, qty) =>
        set(s => ({
          items:
            qty <= 0
              ? s.items.filter(i => !(i.product.id === id && i.size === size))
              : s.items.map(i =>
                  i.product.id === id && i.size === size
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems:  () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice:  () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: 'zapateria-la-21-cart',
      partialize: state => ({ items: state.items }),
    }
  )
)
