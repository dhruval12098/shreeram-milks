import { create } from 'zustand';

import i18n from '../lib/i18n';
import type { AppLanguage } from '../types/models';
import type { Product } from '../types/models';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: i18n.language === 'gu' ? 'gu' : 'en',
  setLanguage: (language) => {
    void i18n.changeLanguage(language);
    set({ language });
  },
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find((item) => item.product.id === product.id);
    if (existing) return { cart: state.cart.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    return { cart: [...state.cart, { product, quantity: 1 }] };
  }),
  updateCartQuantity: (productId, quantity) => set((state) => ({ cart: quantity <= 0 ? state.cart.filter((item) => item.product.id !== productId) : state.cart.map((item) => item.product.id === productId ? { ...item, quantity } : item) })),
  removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) })),
  clearCart: () => set({ cart: [] }),
}));
