"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Package, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order, OrderStatus } from "@/types/order";

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function TrackingTimeline({ order }: { order: Order }) {
  const currentIdx = STATUS_ORDER.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-0">
      {order.trackingEvents.map((event, index) => {
        const eventIdx = STATUS_ORDER.indexOf(event.status);
        const isDone = !isCancelled && eventIdx <= currentIdx && event.timestamp !== null;
        const isActive = !isCancelled && eventIdx === currentIdx;
        const isReached = !isCancelled && eventIdx <= currentIdx;
        const isLast = index === order.trackingEvents.length - 1;

        const date = event.timestamp
          ? new Date(event.timestamp).toLocaleString("en-EG", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : null;

        return (
          <div key={event.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{ scale: isActive ? 1.15 : 1 }}
                className={cn(
                  "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                  isDone
                    ? "bg-button dark:bg-button-dark"
                    : isActive
                      ? "bg-button ring-4 ring-primary/20 dark:bg-button-dark dark:ring-button-dark/20"
                      : "bg-secondary"
                )}
              >
                {isDone ? (
                  <Check className="h-3.5 w-3.5 text-text dark:text-text-dark" strokeWidth={2.5} />
                ) : isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-2.5 w-2.5 rounded-full bg-text dark:bg-text-dark"
                  />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/45" />
                )}
              </motion.div>

              {!isLast && (
                <div
                  className={cn(
                    "my-1 min-h-10 w-0.5 flex-1 transition-colors duration-500",
                    isReached && eventIdx < currentIdx
                      ? "bg-button dark:bg-button-dark"
                      : "bg-border"
                  )}
                />
              )}
            </div>

            <div className={cn("min-w-0 flex-1 pb-6", isLast && "pb-0")}>
              <div className="flex items-start justify-between gap-2 pt-1">
                <p
                  className={cn(
                    "text-sm font-montserrat font-semibold transition-colors",
                    isReached ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {event.label}
                </p>
                {date && (
                  <p className="shrink-0 text-xs font-montserrat text-muted-foreground">
                    {date}
                  </p>
                )}
              </div>
              <p
                className={cn(
                  "mt-0.5 text-xs font-montserrat leading-relaxed transition-colors",
                  isReached ? "text-foreground/70" : "text-muted-foreground/70"
                )}
              >
                {event.description}
              </p>
            </div>
          </div>
        );
      })}

      {isCancelled && (
        <div className="mt-2 flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <XCircle className="h-4 w-4 text-red-500" />
          </div>
          <div className="pt-1">
            <p className="text-sm font-montserrat font-semibold text-red-600 dark:text-red-400">
              Order Cancelled
            </p>
            <p className="mt-0.5 text-xs font-montserrat text-muted-foreground">
              This order has been cancelled.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function OrderConfirmation({
  order,
  deliveryDate,
}: {
  order: Order;
  deliveryDate: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-playfair text-lg font-bold text-foreground">
          Order Tracking
        </h2>
        {order.trackingNumber && (
          <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5">
            <Package className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-montserrat font-medium text-foreground">
              {order.trackingNumber}
            </span>
            <CopyButton text={order.trackingNumber} />
          </div>
        )}
      </div>

      <TrackingTimeline order={order} />

      {order.status !== "delivered" && order.status !== "cancelled" && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs font-montserrat text-muted-foreground">
            Estimated delivery:{" "}
            <span className="font-semibold text-foreground">{deliveryDate}</span>
          </p>
        </div>
      )}
    </div>
  );
}
