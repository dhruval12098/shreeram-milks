import { create } from 'zustand';

import i18n from '../lib/i18n';
import type { AppLanguage, DeliveryAddress, DoorstepInstructions, Product } from '../types/models';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CheckoutDeliverySlot = 'early' | 'standard';

interface CheckoutSelection {
  addressId: string | null;
  deliverySlot: CheckoutDeliverySlot;
}

interface AppState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutSelection: CheckoutSelection;
  setCheckoutAddress: (addressId: string) => void;
  setCheckoutDeliverySlot: (deliverySlot: CheckoutDeliverySlot) => void;
  addresses: DeliveryAddress[];
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  updateAddress: (address: DeliveryAddress) => void;
  deleteAddress: (addressId: string) => void;
  doorstepInstructions: DoorstepInstructions;
  setDoorstepInstructions: (instructions: DoorstepInstructions) => void;
  profile: { email: string; fullName: string; phone: string };
  setProfile: (profile: { email: string; fullName: string; phone: string }) => void;
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
  checkoutSelection: { addressId: 'address-home', deliverySlot: 'early' },
  setCheckoutAddress: (addressId) => set((state) => ({
    checkoutSelection: { ...state.checkoutSelection, addressId },
  })),
  setCheckoutDeliverySlot: (deliverySlot) => set((state) => ({
    checkoutSelection: { ...state.checkoutSelection, deliverySlot },
  })),
  addresses: [
    { id: 'address-home', addressType: 'home', isDefault: true, isServiceable: true, fullName: 'Priya Sharma', phone: '9820144521', line1: 'Flat 402, Greenfield Apartments', line2: 'Near Satara Market', landmark: 'Opposite City Library', pincode: '415001', city: 'Satara' },
    { id: 'address-work', addressType: 'work', isDefault: false, isServiceable: false, fullName: 'Priya Sharma', phone: '9820144521', line1: 'Gausala Hub', line2: 'Karad Road', landmark: '', pincode: '415110', city: 'Satara' },
  ],
  addAddress: (address) => set((state) => {
    const isDefault = address.isDefault || state.addresses.length === 0;
    const normalized = state.addresses.map((item) => isDefault ? { ...item, isDefault: false } : item);
    return { addresses: [...normalized, { ...address, id: `address-${Date.now()}`, isDefault }] };
  }),
  updateAddress: (address) => set((state) => ({
    addresses: state.addresses.map((item) => address.isDefault ? { ...item, ...(item.id === address.id ? address : { isDefault: false }) } : item.id === address.id ? address : item),
  })),
  deleteAddress: (addressId) => set((state) => {
    const removed = state.addresses.find((address) => address.id === addressId);
    const remaining = state.addresses.filter((address) => address.id !== addressId);
    if (removed?.isDefault && remaining.length > 0) remaining[0] = { ...remaining[0], isDefault: true };
    return { addresses: remaining };
  }),
  doorstepInstructions: { handoff: 'leave-at-door', noDoorbell: true, noCall: false, notifyAfterDelivery: true, dropLocation: 'front-door', additionalInstructions: '' },
  setDoorstepInstructions: (doorstepInstructions) => set({ doorstepInstructions }),
  profile: { fullName: 'Priya Sharma', phone: '9820144521', email: 'priya.sharma@example.com' },
  setProfile: (profile) => set({ profile }),
}));
