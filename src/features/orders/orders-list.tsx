"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOrders } from "@/context/order-context";
import { useCart } from "@/context/cart-context";
import { Order, OrderStatus } from "@/types/order";
import { Loader2, Package, ChevronRight, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label: string; dot: string; badge: string }> = {
  pending:    { label: "Pending",    dot: "bg-yellow-400",  badge: "text-yellow-700  dark:text-yellow-400  bg-yellow-50  dark:bg-yellow-900/20" },
  confirmed:  { label: "Confirmed",  dot: "bg-blue-400",    badge: "text-blue-700    dark:text-blue-400    bg-blue-50    dark:bg-blue-900/20"   },
  processing: { label: "Processing", dot: "bg-purple-400",  badge: "text-purple-700  dark:text-purple-400  bg-purple-50  dark:bg-purple-900/20" },
  shipped:    { label: "Shipped",    dot: "bg-orange-400",  badge: "text-orange-700  dark:text-orange-400  bg-orange-50  dark:bg-orange-900/20" },
  delivered:  { label: "Delivered",  dot: "bg-green-400",   badge: "text-green-700   dark:text-green-400   bg-green-50   dark:bg-green-900/20"  },
  cancelled:  { label: "Cancelled",  dot: "bg-red-400",     badge: "text-red-700     dark:text-red-400     bg-red-50     dark:bg-red-900/20"    },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-montserrat font-semibold", cfg.badge)}>
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: Order }) {
  const { addItem } = useCart();
  const router      = useRouter();

  const handleReorder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    order.items.forEach((item) => addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }));
    router.push("/shopping-cart");
  };

  const date = new Date(order.createdAt).toLocaleDateString("en-EG", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/orders/${order.id}`}
        className="block p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 hover:shadow-md transition-shadow duration-300 group">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="font-playfair font-bold text-lg text-text-dark dark:text-text">{order.orderNumber}</p>
            <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 mt-0.5">{date}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <ChevronRight className="w-4 h-4 text-text-dark/30 dark:text-text/30 group-hover:text-text-dark dark:group-hover:text-text transition-colors" />
          </div>
        </div>

        {/* Items preview */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, i) => (
              <div key={item.id}
                style={{ zIndex: order.items.length - i }}
                className="relative w-11 h-11 rounded-lg overflow-hidden border-2 border-background dark:border-background-dark">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-11 h-11 rounded-lg bg-text-dark/8 dark:bg-text/8 border-2 border-background dark:border-background-dark flex items-center justify-center">
                <span className="text-xs font-montserrat font-bold text-text-dark/60 dark:text-text/60">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-montserrat text-text-dark dark:text-text line-clamp-1">
              {order.items.map((i) => i.name).join(", ")}
            </p>
            <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 mt-0.5">
              {order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <p className="font-playfair font-bold text-lg text-text-dark dark:text-text">
            {order.total.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-50">EGP</span>
          </p>
          {order.status === "delivered" && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleReorder}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-text-dark/12 dark:border-text/12 text-xs font-montserrat font-medium text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 transition-colors">
              <RotateCcw className="w-3 h-3" />
              Reorder
            </motion.button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Orders Page ──────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { orders, isLoading, fetchOrders } = useOrders();

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-text-dark dark:text-text">My Orders</h1>
        <p className="font-montserrat text-sm text-text-dark/55 dark:text-text/55 mt-1">
          {isLoading ? "Loading…" : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-text-dark/35 dark:text-text/35" />
        </div>
      ) : orders.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-24 space-y-5">
          <div className="w-20 h-20 rounded-full bg-text-dark/5 dark:bg-text/5 flex items-center justify-center">
            <Package className="w-9 h-9 text-text-dark/25 dark:text-text/25" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-playfair text-2xl text-text-dark dark:text-text">No orders yet</p>
            <p className="font-montserrat text-sm text-text-dark/55 dark:text-text/55">Your order history will appear here</p>
          </div>
          <Link href="/products"
            className="h-11 px-8 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 transition-colors flex items-center">
            Browse Catalog
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order, i) => (
              <motion.div key={order.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}>
                <OrderCard order={order} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}