"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useOrders } from "@/context/order-context";
import { useCart } from "@/context/cart-context";
import { Order, OrderStatus } from "@/types/order";
import { StatusBadge } from "./orders-list";
import {
  ArrowLeft, Loader2, Package, MapPin, CreditCard,
  RotateCcw, Copy, Check, XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getOrderById } from "@/services/orders.service";

// ─── Tracking Timeline ────────────────────────────────────────────────────────

const STATUS_ORDER: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered"];

function TrackingTimeline({ order }: { order: Order }) {
  const currentIdx = STATUS_ORDER.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-0">
      {order.trackingEvents.map((event, i) => {
        const eventIdx  = STATUS_ORDER.indexOf(event.status);
        const isDone    = !isCancelled && eventIdx <= currentIdx && event.timestamp !== null;
        const isActive  = !isCancelled && eventIdx === currentIdx;
        const isReached = !isCancelled && eventIdx <= currentIdx;
        const isLast    = i === order.trackingEvents.length - 1;

        const date = event.timestamp
          ? new Date(event.timestamp).toLocaleString("en-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
          : null;

        return (
          <div key={event.status} className="flex gap-4">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 z-10",
                  isDone    ? "bg-button dark:bg-button-dark"
                            : isActive ? "bg-button dark:bg-button-dark ring-4 ring-button/20 dark:ring-button-dark/20"
                                       : "bg-text-dark/8 dark:bg-text/8"
                )}>
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-text dark:text-text-dark" strokeWidth={2.5} />
                ) : isActive ? (
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2.5 h-2.5 rounded-full bg-text dark:bg-text-dark" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-text-dark/20 dark:bg-text/20" />
                )}
              </motion.div>
              {!isLast && (
                <div className={cn(
                  "w-0.5 flex-1 min-h-[2.5rem] my-1 transition-colors duration-500",
                  isReached && !isLast && eventIdx < currentIdx
                    ? "bg-button dark:bg-button-dark"
                    : "bg-text-dark/10 dark:bg-text/10"
                )} />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6 flex-1 min-w-0", isLast && "pb-0")}>
              <div className="flex items-start justify-between gap-2 pt-1">
                <p className={cn(
                  "text-sm font-montserrat font-semibold transition-colors",
                  isReached ? "text-text-dark dark:text-text" : "text-text-dark/35 dark:text-text/35"
                )}>
                  {event.label}
                </p>
                {date && (
                  <p className="text-xs font-montserrat text-text-dark/45 dark:text-text/45 shrink-0">{date}</p>
                )}
              </div>
              <p className={cn(
                "text-xs font-montserrat mt-0.5 leading-relaxed transition-colors",
                isReached ? "text-text-dark/60 dark:text-text/60" : "text-text-dark/25 dark:text-text/25"
              )}>
                {event.description}
              </p>
            </div>
          </div>
        );
      })}

      {isCancelled && (
        <div className="flex gap-4 mt-2">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="pt-1">
            <p className="text-sm font-montserrat font-semibold text-red-600 dark:text-red-400">Order Cancelled</p>
            <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 mt-0.5">This order has been cancelled.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="p-1 rounded-md text-text-dark/40 dark:text-text/40 hover:text-text-dark dark:hover:text-text transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Order Detail ─────────────────────────────────────────────────────────────

export default function OrderDetailPage({ orderId }: { orderId: string }) {
  const router              = useRouter();
  const { cancelOrderById } = useOrders();
  const { addItem }         = useCart();
  const [order, setOrder]   = useState<Order | null>(null);
  const [loading, setLoading]         = useState(true);
  const [cancelling, setCancelling]   = useState(false);

  useEffect(() => {
    getOrderById(orderId).then(setOrder).catch(console.error).finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div className="flex justify-center py-24"><Loader2 className="w-7 h-7 animate-spin text-text-dark/35 dark:text-text/35" /></div>
  );
  if (!order) return (
    <div className="text-center py-24 space-y-4">
      <p className="font-playfair text-2xl text-text-dark dark:text-text">Order not found</p>
      <button onClick={() => router.push("/orders")}
        className="text-sm font-montserrat underline text-text-dark/60 dark:text-text/60">Back to orders</button>
    </div>
  );

  const canCancel = ["pending", "confirmed"].includes(order.status);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    try {
      await cancelOrderById(order.id);
      const updated = await getOrderById(order.id);
      setOrder(updated);
    } finally { setCancelling(false); }
  };

  const handleReorder = () => {
    order.items.forEach((item) => addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }));
    router.push("/shopping-cart");
  };

  const createdDate = new Date(order.createdAt).toLocaleDateString("en-EG", { year: "numeric", month: "long", day: "numeric" });
  const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString("en-EG", { weekday: "long", month: "long", day: "numeric" });
  const paymentLabel = {
    card:             order.paymentDetails.cardLastFour ? `${order.paymentDetails.cardBrand ?? "Card"} ···· ${order.paymentDetails.cardLastFour}` : "Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer:    "Bank Transfer",
  }[order.paymentDetails.method];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <button onClick={() => router.push("/orders")}
        className="flex items-center gap-2 mb-8 text-sm font-montserrat text-text-dark/55 dark:text-text/55 hover:text-text-dark dark:hover:text-text transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Orders
      </button>

      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text">{order.orderNumber}</h1>
          <p className="font-montserrat text-sm text-text-dark/55 dark:text-text/55 mt-0.5">Placed on {createdDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          {order.status === "delivered" && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleReorder}
              className="flex items-center gap-1.5 h-9 px-4 rounded-xl border border-text-dark/12 dark:border-text/12 text-xs font-montserrat font-medium text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reorder
            </motion.button>
          )}
          {canCancel && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleCancel} disabled={cancelling}
              className="flex items-center gap-1.5 h-9 px-4 rounded-xl border border-red-300 dark:border-red-800 text-xs font-montserrat font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 transition-colors">
              {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
              Cancel
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — tracking + items */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tracking */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="p-6 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-bold text-lg text-text-dark dark:text-text">Order Tracking</h2>
              {order.trackingNumber && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text-dark/5 dark:bg-text/5">
                  <Package className="w-3.5 h-3.5 text-text-dark/50 dark:text-text/50" />
                  <span className="text-xs font-montserrat font-medium text-text-dark dark:text-text">{order.trackingNumber}</span>
                  <CopyButton text={order.trackingNumber} />
                </div>
              )}
            </div>
            <TrackingTimeline order={order} />
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="mt-4 pt-4 border-t border-text-dark/8 dark:border-text/8">
                <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50">
                  Estimated delivery: <span className="font-semibold text-text-dark dark:text-text">{deliveryDate}</span>
                </p>
              </div>
            )}
          </motion.div>

          {/* Items */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8">
            <h2 className="font-playfair font-bold text-lg text-text-dark dark:text-text mb-5">
              Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text line-clamp-1">{item.name}</p>
                    <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 mt-0.5">
                      Qty: {item.quantity} · {item.price.toLocaleString()} EGP each
                    </p>
                  </div>
                  <p className="font-montserrat font-bold text-sm text-text-dark dark:text-text shrink-0">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — summary cards */}
        <div className="space-y-4">
          {/* Price summary */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 space-y-3">
            <h3 className="font-playfair font-bold text-base text-text-dark dark:text-text">Order Total</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-text-dark/55 dark:text-text/55">Subtotal</span>
                <span className="text-sm font-montserrat font-medium text-text-dark dark:text-text">{order.subtotal.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-text-dark/55 dark:text-text/55">Shipping</span>
                <span className="text-sm font-montserrat font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
            </div>
            <div className="h-px bg-text-dark/8 dark:bg-text/8" />
            <div className="flex justify-between">
              <span className="font-montserrat font-semibold text-text-dark dark:text-text">Total</span>
              <span className="font-playfair font-bold text-xl text-text-dark dark:text-text">
                {order.total.toLocaleString()} <span className="text-xs font-montserrat font-normal opacity-50">EGP</span>
              </span>
            </div>
          </motion.div>

          {/* Shipping address */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-text-dark/45 dark:text-text/45" />
              <h3 className="font-playfair font-bold text-base text-text-dark dark:text-text">Delivery Address</h3>
            </div>
            <div className="font-montserrat text-sm space-y-0.5">
              <p className="font-semibold text-text-dark dark:text-text">{order.shippingAddress.fullName}</p>
              <p className="text-text-dark/55 dark:text-text/55">{order.shippingAddress.phone}</p>
              <p className="text-text-dark/55 dark:text-text/55">{order.shippingAddress.address}</p>
              <p className="text-text-dark/55 dark:text-text/55">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p className="text-text-dark/55 dark:text-text/55">{order.shippingAddress.country}</p>
            </div>
          </motion.div>

          {/* Payment */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-text-dark/45 dark:text-text/45" />
              <h3 className="font-playfair font-bold text-base text-text-dark dark:text-text">Payment</h3>
            </div>
            <p className="font-montserrat text-sm font-semibold text-text-dark dark:text-text">{paymentLabel}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}