"use client";

import { motion } from "motion/react";
import { CheckCircle2, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export function CheckoutConfirmation({
  orderNumber,
  estimatedDelivery,
}: {
  orderNumber: string;
  estimatedDelivery: string;
}) {
  const router = useRouter();
  const date = new Date(estimatedDelivery).toLocaleDateString("en-EG", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-playfair text-3xl font-bold text-foreground">
          Order Confirmed!
        </h2>
        <p className="text-sm font-montserrat text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      <div className="inline-block rounded-xl border border-border bg-card px-5 py-3 shadow-soft">
        <p className="mb-1 text-xs font-montserrat uppercase tracking-[0.2em] text-muted-foreground">
          Order Number
        </p>
        <p className="font-playfair text-xl font-bold text-foreground">
          {orderNumber}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
        <Package className="h-5 w-5 shrink-0 text-muted-foreground" />
        <p className="text-sm font-montserrat text-muted-foreground">
          Estimated delivery:{" "}
          <span className="font-semibold text-foreground">{date}</span>
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/orders")}
          className="h-12 rounded-xl bg-button px-8 text-sm font-semibold text-text transition-opacity hover:opacity-90 dark:bg-button-dark dark:text-text-dark"
        >
          Track Order
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/products")}
          className="h-12 rounded-xl border border-border bg-card px-8 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          Continue Shopping
        </motion.button>
      </div>
    </motion.div>
  );
}
