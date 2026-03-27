"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ShippingAddress, PaymentMethod } from "@/types/order";
import { useCart } from "@/context/cart-context";

export function CheckoutReview({
  address,
  paymentMethod,
  cardLastFour,
  items,
  total,
  onBack,
  onPlace,
  isPlacing,
}: {
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  cardLastFour?: string;
  items: ReturnType<typeof useCart>["items"];
  total: number;
  onBack: () => void;
  onPlace: () => void;
  isPlacing: boolean;
}) {
  const paymentLabel = {
    card: cardLastFour ? `Card ending in ${cardLastFour}` : "Credit / Debit Card",
    cash_on_delivery: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
  }[paymentMethod];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 font-playfair text-2xl font-bold text-foreground">Review Order</h2>
        <p className="text-sm font-montserrat text-muted-foreground">
          Please confirm all details before placing your order.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Delivery Address
          </p>
          <button
            onClick={onBack}
            className="text-xs font-montserrat text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Edit
          </button>
        </div>
        <div className="space-y-0.5 text-sm font-montserrat text-foreground">
          <p className="font-semibold">{address.fullName}</p>
          <p className="text-muted-foreground">{address.phone}</p>
          <p className="text-muted-foreground">{address.address}</p>
          <p className="text-muted-foreground">
            {address.city}, {address.postalCode}
          </p>
          <p className="text-muted-foreground">{address.country}</p>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Payment
        </p>
        <p className="text-sm font-montserrat font-semibold text-foreground">{paymentLabel}</p>
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
        </p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <p className="line-clamp-1 flex-1 text-sm font-montserrat text-foreground">
              {item.name}
            </p>
            <div className="shrink-0 text-right">
              <p className="text-xs font-montserrat text-muted-foreground">x{item.quantity}</p>
              <p className="text-sm font-montserrat font-semibold text-foreground">
                {(item.price * item.quantity).toLocaleString()} EGP
              </p>
            </div>
          </div>
        ))}
        <div className="h-px bg-border/70" />
        <div className="flex justify-between">
          <span className="font-montserrat font-semibold text-foreground">Total</span>
          <span className="font-playfair text-lg font-bold text-foreground">
            {total.toLocaleString()} EGP
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          disabled={isPlacing}
          className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onPlace}
          disabled={isPlacing}
          className="flex h-12 items-center gap-2 rounded-xl bg-button px-8 text-sm font-semibold text-text transition-opacity hover:opacity-90 disabled:opacity-60 dark:bg-button-dark dark:text-text-dark"
        >
          {isPlacing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Placing Order...
            </>
          ) : (
            <>
              Place Order <ChevronRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
