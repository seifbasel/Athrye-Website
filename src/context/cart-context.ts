import { MOCK_CART_ITEMS } from "@/mocks/cart";
import type { CartItem } from "@/types/cart-item";

export type CartContextValue = {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
};

const total = MOCK_CART_ITEMS.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);

export function useCart(): CartContextValue {
  return {
    items: MOCK_CART_ITEMS,
    total,
    addItem: (_item) => undefined,
    removeItem: (_id) => undefined,
    updateQuantity: (_id, _newQuantity) => undefined,
    clearCart: () => undefined,
    isInCart: (id) => MOCK_CART_ITEMS.some((item) => item.id === id),
  };
}

export type { CartItem };
