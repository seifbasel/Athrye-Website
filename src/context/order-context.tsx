"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Order, ShippingAddress, PaymentDetails } from "@/types/order";
import { CartItem } from "@/context/cart-context";
import { placeOrder, getOrders, cancelOrder } from "@/services/orders.service";

type OrderContextValue = {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  submitOrder: (payload: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentDetails: PaymentDetails;
  }) => Promise<Order>;
  cancelOrderById: (id: string) => Promise<void>;
  lastPlacedOrder: Order | null;
  clearLastOrder: () => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitOrder = useCallback(
    async (payload: {
      items: CartItem[];
      shippingAddress: ShippingAddress;
      paymentDetails: PaymentDetails;
    }) => {
      const order = await placeOrder(payload);
      setOrders((prev) => [order, ...prev]);
      setLastPlacedOrder(order);
      return order;
    },
    [],
  );

  const cancelOrderById = useCallback(async (id: string) => {
    const updated = await cancelOrder(id);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  }, []);

  const clearLastOrder = useCallback(() => setLastPlacedOrder(null), []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        fetchOrders,
        submitOrder,
        cancelOrderById,
        lastPlacedOrder,
        clearLastOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
