import { create } from 'zustand';
import { CartItem } from './types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find(
      (i) => 
        i.productId === item.productId && 
        i.size === item.size && 
        i.color === item.color
    );

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, item] });
    }

    set({ total: calculateTotal(get().items) });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
      total: calculateTotal(state.items.filter((i) => i.id !== id)),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
      total: calculateTotal(
        state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      ),
    }));
  },
  clearCart: () => set({ items: [], total: 0 }),
}));

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};