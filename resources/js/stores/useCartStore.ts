import { create } from 'zustand'

interface CartItem {
  productId: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  processCheckout: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => {
    const existingItem = state.items.find(
      (cartItem) => cartItem.productId === item.productId
    )

    if (existingItem) {
      return {
        items: state.items.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      }
    }

    return {
      items: [...state.items, { ...item, quantity: 1 }],
    }
  }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  processCheckout: () => {
    const state = get()
    const totalAmount = state.getTotalPrice()

    set({ items: [] })

    return { totalAmount }
  }
}))
