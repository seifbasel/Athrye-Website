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

const STATUS_CONFIG: Record<OrderStatus, { label: string; dot: string; badge: string }> = {
  pending: { label: "Pending", dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" },
  confirmed: { label: "Confirmed", dot: "bg-blue-400", badge: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" },
  processing: { label: "Processing", dot: "bg-purple-400", badge: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400" },
  shipped: { label: "Shipped", dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400" },
  delivered: { label: "Delivered", dot: "bg-green-400", badge: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" },
  cancelled: { label: "Cancelled", dot: "bg-red-400", badge: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-montserrat font-semibold",
        config.badge
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleReorder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    order.items.forEach((item) =>
      addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl })
    );
    router.push("/shopping-cart");
  };

  const date = new Date(order.createdAt).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/orders/${order.id}`}
        className="group block rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow duration-300 hover:shadow-elevated"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-playfair text-lg font-bold text-foreground">{order.orderNumber}</p>
            <p className="mt-0.5 text-xs font-montserrat text-muted-foreground">{date}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                style={{ zIndex: order.items.length - index }}
                className="relative h-11 w-11 overflow-hidden rounded-lg border-2 border-card"
              >
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-card bg-secondary">
                <span className="text-xs font-montserrat font-bold text-muted-foreground">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-montserrat text-foreground">
              {order.items.map((item) => item.name).join(", ")}
            </p>
            <p className="mt-0.5 text-xs font-montserrat text-muted-foreground">
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} item
              {order.items.reduce((sum, item) => sum + item.quantity, 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-playfair text-lg font-bold text-foreground">
            {order.total.toLocaleString()}{" "}
            <span className="text-sm font-montserrat font-normal text-muted-foreground">EGP</span>
          </p>
          {order.status === "delivered" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleReorder}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-montserrat font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              <RotateCcw className="h-3 w-3" />
              Reorder
            </motion.button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function OrdersPage() {
  const { orders, isLoading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-foreground">My Orders</h1>
        <p className="mt-1 text-sm font-montserrat text-muted-foreground">
          {isLoading ? "Loading..." : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-5 py-24"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
            <Package className="h-9 w-9 text-muted-foreground" />
          </div>
          <div className="space-y-1 text-center">
            <p className="font-playfair text-2xl text-foreground">No orders yet</p>
            <p className="text-sm font-montserrat text-muted-foreground">
              Your order history will appear here
            </p>
          </div>
          <Link
            href="/products"
            className="flex h-11 items-center rounded-xl border border-border bg-card px-8 text-sm font-montserrat font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            Browse Catalog
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
