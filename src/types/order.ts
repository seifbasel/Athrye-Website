import { CartItem } from "@/context/cart-context";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "card" | "cash_on_delivery" | "bank_transfer";

export type ShippingAddress = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentDetails = {
  method: PaymentMethod;
  cardLastFour?: string;
  cardBrand?: string;
};

export type OrderItem = CartItem;

export type TrackingEvent = {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string | null; // null = not yet reached
};

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  trackingEvents: TrackingEvent[];
};

// Checkout multi-step state
export type CheckoutStep = "address" | "payment" | "review" | "confirmation";

export type CheckoutState = {
  step: CheckoutStep;
  shippingAddress: Partial<ShippingAddress>;
  paymentDetails: Partial<PaymentDetails>;
};