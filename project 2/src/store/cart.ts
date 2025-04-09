import { create } from 'zustand';
import { Cart, CartItem, Product, Size, Color } from '@/types';
import { generateId } from '@/lib/utils';

interface CartState extends Cart {
  addItem: (product: Product, quantity: number, size: Size, color: Color) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (product, quantity, size, color) => {
    const items = get().items;
    const existingItem = items.find(
      (item) => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
    );

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      const newItem: CartItem = {
        id: generateId(),
        product,
        quantity,
        size,
        color,
      };
      set({ items: [...items, newItem] });
    }

    set((state) => ({
      total: state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      total: state.items
        .filter((item) => item.id !== id)
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
      total: state.items
        .map((item) => 
          item.id === id ? { ...item, quantity } : item
        )
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }));
  },
  clearCart: () => set({ items: [], total: 0 }),
}));