/**
 * Orders Service — Mock
 * TODO: Replace BASE_URL + remove mock logic when Django backend is ready.
 *
 * Django endpoints this maps to:
 *   GET    /api/orders/              → list user orders (paginated)
 *   GET    /api/orders/:id/          → order detail
 *   POST   /api/orders/              → place order  { items, shippingAddress, paymentDetails }
 *   POST   /api/orders/:id/cancel/   → cancel order
 */

import {
  Order,
  ShippingAddress,
  PaymentDetails,
  OrderStatus,
} from "@/types/order";
import { CartItem } from "@/context/cart-context";
import { MOCK_ORDERS } from "@/mocks/orders";

// TODO: const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// In-memory store so placed orders persist during the session
let sessionOrders: Order[] = [...MOCK_ORDERS];

export type PlaceOrderPayload = {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
};

/** GET /api/orders/ */
export async function getOrders(): Promise<Order[]> {
  // TODO:
  // const res = await fetch(`${BASE_URL}/orders/`, {
  //   headers: { Authorization: `Bearer ${getToken()}` },
  // });
  // if (!res.ok) throw new Error("Failed to fetch orders");
  // const data = await res.json();
  // return data.results;

  await delay(500);
  return [...sessionOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** GET /api/orders/:id/ */
export async function getOrderById(id: string): Promise<Order> {
  // TODO:
  // const res = await fetch(`${BASE_URL}/orders/${id}/`, {
  //   headers: { Authorization: `Bearer ${getToken()}` },
  // });
  // if (!res.ok) throw new Error("Order not found");
  // return res.json();

  await delay(350);
  const order = sessionOrders.find((o) => o.id === id);
  if (!order) throw new Error(`Order ${id} not found`);
  return order;
}

/** POST /api/orders/ */
export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
  // TODO:
  // const res = await fetch(`${BASE_URL}/orders/`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Failed to place order");
  // return res.json();

  await delay(1200);

  const now = new Date().toISOString();
  const orderId = `ord-${Date.now()}`;
  const orderNumber = `CNT-${new Date().getFullYear()}-${String(sessionOrders.length + 1).padStart(4, "0")}`;
  const subtotal = payload.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const estimatedDelivery = new Date(Date.now() + 7 * 86400000).toISOString();

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    status: "confirmed",
    items: payload.items,
    shippingAddress: payload.shippingAddress,
    paymentDetails: payload.paymentDetails,
    subtotal,
    shippingCost: 0,
    total: subtotal,
    createdAt: now,
    estimatedDelivery,
    trackingEvents: [
      {
        status: "pending",
        label: "Order Placed",
        description: "Your order has been received.",
        timestamp: now,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Payment verified, order confirmed.",
        timestamp: now,
      },
      {
        status: "processing",
        label: "Being Prepared",
        description: "Your coins are being carefully packaged.",
        timestamp: null,
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Package handed to courier.",
        timestamp: null,
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Package delivered to your address.",
        timestamp: null,
      },
    ],
  };

  sessionOrders = [newOrder, ...sessionOrders];
  return newOrder;
}

/** POST /api/orders/:id/cancel/ */
export async function cancelOrder(id: string): Promise<Order> {
  await delay(600);
  sessionOrders = sessionOrders.map((o) =>
    o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o,
  );
  const order = sessionOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  return order;
}
