"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Order } from "@/types/order";
import { StatusBadge } from "./orders-list";
import { ArrowLeft, Loader2, RotateCcw, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMockOrderById } from "@/mocks/orders";
import { OrderConfirmation } from "./order-confirmation";
import { OrderAddress } from "./order-address";
import { OrderReview } from "./order-review";
import { OrderPayment } from "./order-payment";

export default function OrderDetailPage({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [reordered, setReordered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrder(getMockOrderById(orderId));
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-4 py-24 text-center">
        <p className="font-playfair text-2xl text-foreground">
          Order not found
        </p>
        <button
          onClick={() => router.push("/orders")}
          className="text-sm font-montserrat text-muted-foreground underline"
        >
          Back to orders
        </button>
      </div>
    );
  }

  const canCancel = ["pending", "confirmed"].includes(order.status);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setCancelling(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setOrder((currentOrder) =>
        currentOrder
          ? {
              ...currentOrder,
              status: "cancelled",
            }
          : currentOrder,
      );
    } finally {
      setCancelling(false);
    }
  };

  const handleReorder = () => {
    setReordered(true);
  };

  const createdDate = new Date(order.createdAt).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString(
    "en-EG",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  );

  const paymentLabel = {
    card: order.paymentDetails.cardLastFour
      ? `${order.paymentDetails.cardBrand ?? "Card"} ending in ${order.paymentDetails.cardLastFour}`
      : "Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
  }[order.paymentDetails.method];

  return (
    <div className="mx-auto max-w-4xl">
      <button
        onClick={() => router.push("/orders")}
        className="mb-8 flex items-center gap-2 text-sm font-montserrat text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All Orders
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h1 className="font-playfair text-3xl font-bold text-foreground">
            {order.orderNumber}
          </h1>
          <p className="mt-0.5 text-sm font-montserrat text-muted-foreground">
            Placed on {createdDate}
          </p>
          {reordered && (
            <p className="mt-1 text-xs font-montserrat text-muted-foreground">
              Added to this page's mock cart preview.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />

          {order.status === "delivered" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleReorder}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-xs font-montserrat font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {reordered ? "Added to Mock Cart" : "Reorder"}
            </motion.button>
          )}

          {canCancel && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              disabled={cancelling}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-red-300 px-4 text-xs font-montserrat font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              {cancelling ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <XCircle className="h-3.5 w-3.5" />
              )}
              Cancel
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <OrderConfirmation order={order} deliveryDate={deliveryDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="mb-5 font-playfair text-lg font-bold text-foreground">
              Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)}
              )
            </h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-montserrat font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs font-montserrat text-muted-foreground">
                      Qty: {item.quantity} x {item.price.toLocaleString()} EGP
                      each
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-montserrat font-bold text-foreground">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <OrderReview subtotal={order.subtotal} total={order.total} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            <OrderAddress address={order.shippingAddress} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <OrderPayment paymentLabel={paymentLabel} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
