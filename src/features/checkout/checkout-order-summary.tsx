"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";

export function CheckoutOrderSummary({
  items,
  total,
}: {
  items: ReturnType<typeof useCart>["items"];
  total: number;
}) {
  return (
    <div className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="font-playfair text-base font-bold text-foreground">
        Order Summary
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-xs font-montserrat font-semibold text-foreground">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs font-montserrat text-muted-foreground">
                {item.quantity} x {item.price.toLocaleString()} EGP
              </p>
            </div>
            <p className="shrink-0 text-xs font-montserrat font-bold text-foreground">
              {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="h-px bg-border/70" />
      <div className="flex items-center justify-between">
        <span className="text-sm font-montserrat text-muted-foreground">
          Subtotal
        </span>
        <span className="text-sm font-montserrat font-medium text-foreground">
          {total.toLocaleString()} EGP
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-montserrat text-muted-foreground">
          Shipping
        </span>
        <span className="text-sm font-montserrat font-medium text-green-600 dark:text-green-400">
          Free
        </span>
      </div>
      <div className="h-px bg-border/70" />
      <div className="flex items-center justify-between">
        <span className="font-montserrat font-semibold text-foreground">
          Total
        </span>
        <span className="font-playfair text-xl font-bold text-foreground">
          {total.toLocaleString()}{" "}
          <span className="font-montserrat text-sm font-normal text-muted-foreground">
            EGP
          </span>
        </span>
      </div>
    </div>
  );
}
