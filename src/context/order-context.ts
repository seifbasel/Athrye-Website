import { MOCK_ORDERS } from "@/mocks/orders";
import type { CartItem } from "@/types/cart-item";
import type { Order, PaymentDetails, ShippingAddress } from "@/types/order";

type SubmitOrderInput = {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
};

export type OrderContextValue = {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  cancelOrderById: (id: string) => Promise<void>;
  submitOrder: (input: SubmitOrderInput) => Promise<Order>;
};

export function useOrders(): OrderContextValue {
  return {
    orders: MOCK_ORDERS,
    isLoading: false,
    fetchOrders: async () => undefined,
    cancelOrderById: async (_id) => undefined,
    submitOrder: async ({ items, shippingAddress, paymentDetails }) => {
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        id: "ord-mock-new",
        orderNumber: "CNT-MOCK-0001",
        status: "confirmed",
        items,
        shippingAddress,
        paymentDetails,
        subtotal,
        shippingCost: 0,
        total: subtotal,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        trackingEvents: [
          {
            status: "pending",
            label: "Order Placed",
            description: "Your order has been received.",
            timestamp: new Date().toISOString(),
          },
          {
            status: "confirmed",
            label: "Order Confirmed",
            description: "Payment verified, order confirmed.",
            timestamp: new Date().toISOString(),
          },
          {
            status: "processing",
            label: "Being Prepared",
            description: "Your order is being prepared.",
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
    },
  };
}
