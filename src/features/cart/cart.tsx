"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import CartItem from "@/components/ui/cart-item";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const shipping = 0;
  const grandTotal = total + shipping;

  return (
    <div className="mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-foreground">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm font-montserrat text-muted-foreground">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.reduce((sum, item) => sum + item.quantity, 0)} items`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-montserrat text-muted-foreground underline underline-offset-2 transition-colors hover:text-red-500"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItem
                    {...item}
                    onRemove={removeItem}
                    onUpdateQuantity={updateQuantity}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            layout
            className="h-fit space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="font-playfair text-lg font-bold text-foreground">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="flex-1 line-clamp-1 text-xs font-montserrat text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="shrink-0 text-xs font-montserrat font-semibold text-foreground">
                    {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-px bg-border/70" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-sm font-montserrat font-medium text-foreground">
                  {total.toLocaleString()} EGP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-muted-foreground">
                  Shipping
                </span>
                <span className="text-sm font-montserrat font-medium text-green-600">
                  Free
                </span>
              </div>
            </div>
            <div className="h-px bg-border/70" />
            <div className="flex items-center justify-between">
              <span className="font-montserrat font-semibold text-foreground">
                Total
              </span>
              <span className="font-playfair text-2xl font-bold text-foreground">
                {grandTotal.toLocaleString()}{" "}
                <span className="font-montserrat text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>
            <Button
              className="h-11 w-full font-montserrat text-sm"
              size="lg"
              onClick={() => router.push("/checkout")}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-xs font-montserrat text-muted-foreground">
              Secure checkout. All transactions encrypted.
            </p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center space-y-5 py-24"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
            <ShoppingBag className="h-9 w-9 text-muted-foreground" />
          </div>
          <div className="space-y-1 text-center">
            <p className="font-playfair text-2xl text-foreground">
              Nothing here yet
            </p>
            <p className="text-sm font-montserrat text-muted-foreground">
              Add coins from the catalog to get started
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="secondary"
              className="bg-card font-montserrat text-sm text-foreground"
            >
              Browse Catalog
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
