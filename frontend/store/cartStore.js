import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  isCartOpen: false,
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  addToCart: (item) => set((state) => {
    // Check if item with same ID, size, color and custom print status already exists in cart
    const existingIndex = state.items.findIndex(
      (i) => i.id === item.id && 
             i.size === item.size && 
             i.color === item.color && 
             i.custom === item.custom
    );

    if (existingIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingIndex].quantity += item.quantity;
      return { items: updatedItems, isCartOpen: true };
    }
    
    return { items: [...state.items, item], isCartOpen: true };
  }),

  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, qty) => set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, quantity: qty } : item),
  })),
}));

export default useCartStore;
