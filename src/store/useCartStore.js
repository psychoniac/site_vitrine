import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cart: [],

  // Ajouter un produit au panier (ou incrémenter sa quantité s'il existe déjà)
  addToCart: (product) => {
    const currentCart = get().cart
    const existingItem = currentCart.find((item) => item.id === product.id)

    if (existingItem) {
      set({
        cart: currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      set({
        cart: [...currentCart, { ...product, quantity: 1 }]
      })
    }
  },

  // Retirer un produit du panier
  removeFromCart: (productId) => {
    set({
      cart: get().cart.filter((item) => item.id !== productId)
    })
  },

  // Mettre à jour la quantité d'un produit
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    })
  },

  // Vider complètement le panier
  clearCart: () => set({ cart: [] }),

  // Calculer le nombre total d'articles (pour le badge de la Navbar)
  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0)
  },

  // Calculer le prix total du panier
  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}))