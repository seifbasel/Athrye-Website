import { Order } from "@/types/order";

const now = new Date();
const daysAgo = (n: number) =>
  new Date(now.getTime() - n * 86400000).toISOString();
const daysFromNow = (n: number) =>
  new Date(now.getTime() + n * 86400000).toISOString();

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    orderNumber: "CNT-2024-0031",
    status: "shipped",
    createdAt: daysAgo(5),
    estimatedDelivery: daysFromNow(2),
    trackingNumber: "EG123456789EG",
    items: [
      {
        id: "2",
        name: "Ancient Roman Aureus — Hadrian",
        price: 28000,
        quantity: 1,
        imageUrl: "/7.jpg",
      },
    ],
    shippingAddress: {
      fullName: "James Sterling",
      phone: "+20 100 123 4567",
      address: "15 Tahrir Square, Apt 4B",
      city: "Cairo",
      postalCode: "11511",
      country: "Egypt",
    },
    paymentDetails: { method: "card", cardLastFour: "4242", cardBrand: "Visa" },
    subtotal: 28000,
    shippingCost: 0,
    total: 28000,
    trackingEvents: [
      {
        status: "pending",
        label: "Order Placed",
        description: "Your order has been received.",
        timestamp: daysAgo(5),
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Payment verified, order confirmed.",
        timestamp: daysAgo(5),
      },
      {
        status: "processing",
        label: "Being Prepared",
        description: "Your coin is being carefully packaged.",
        timestamp: daysAgo(3),
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Package handed to courier. Tracking #EG123456789EG.",
        timestamp: daysAgo(1),
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Package delivered to your address.",
        timestamp: null,
      },
    ],
  },
  {
    id: "ord-002",
    orderNumber: "CNT-2024-0028",
    status: "delivered",
    createdAt: daysAgo(18),
    estimatedDelivery: daysAgo(11),
    trackingNumber: "EG987654321EG",
    items: [
      {
        id: "6",
        name: "Athenian Owl Tetradrachm",
        price: 6800,
        quantity: 1,
        imageUrl: "/7.jpg",
      },
      {
        id: "4",
        name: "Byzantine Solidus — Justinian I",
        price: 8400,
        quantity: 1,
        imageUrl: "/7.jpg",
      },
    ],
    shippingAddress: {
      fullName: "James Sterling",
      phone: "+20 100 123 4567",
      address: "15 Tahrir Square, Apt 4B",
      city: "Cairo",
      postalCode: "11511",
      country: "Egypt",
    },
    paymentDetails: { method: "card", cardLastFour: "4242", cardBrand: "Visa" },
    subtotal: 15200,
    shippingCost: 0,
    total: 15200,
    trackingEvents: [
      {
        status: "pending",
        label: "Order Placed",
        description: "Your order has been received.",
        timestamp: daysAgo(18),
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Payment verified, order confirmed.",
        timestamp: daysAgo(18),
      },
      {
        status: "processing",
        label: "Being Prepared",
        description: "Your coins are being carefully packaged.",
        timestamp: daysAgo(16),
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Package handed to courier.",
        timestamp: daysAgo(14),
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Package delivered successfully.",
        timestamp: daysAgo(11),
      },
    ],
  },
  {
    id: "ord-003",
    orderNumber: "CNT-2024-0035",
    status: "confirmed",
    createdAt: daysAgo(1),
    estimatedDelivery: daysFromNow(6),
    items: [
      {
        id: "1",
        name: "1854 Indian Head Gold Dollar",
        price: 12500,
        quantity: 1,
        imageUrl: "/7.jpg",
      },
    ],
    shippingAddress: {
      fullName: "James Sterling",
      phone: "+20 100 123 4567",
      address: "15 Tahrir Square, Apt 4B",
      city: "Cairo",
      postalCode: "11511",
      country: "Egypt",
    },
    paymentDetails: { method: "cash_on_delivery" },
    subtotal: 12500,
    shippingCost: 0,
    total: 12500,
    trackingEvents: [
      {
        status: "pending",
        label: "Order Placed",
        description: "Your order has been received.",
        timestamp: daysAgo(1),
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        description: "Order confirmed, awaiting preparation.",
        timestamp: daysAgo(1),
      },
      {
        status: "processing",
        label: "Being Prepared",
        description: "Your coin is being carefully packaged.",
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
  },
];

export function getMockOrderById(id: string) {
  return MOCK_ORDERS.find((order) => order.id === id) ?? null;
}
