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

  const shipping = items.length > 0 ? 0 : 0; // Free shipping
  const grandTotal = total + shipping;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-text-dark dark:text-text">
            Shopping Cart
          </h1>
          <p className="text-sm font-montserrat text-text-dark/60 dark:text-text/60 mt-1">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 hover:text-red-500 dark:hover:text-red-400 transition-colors underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
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

          {/* Order Summary */}
          <motion.div
            layout
            className="h-fit p-6 bg-background dark:bg-background-dark rounded-2xl shadow-sm shadow-background-dark/20 dark:shadow-background/10 space-y-5"
          >
            <h2 className="font-playfair font-bold text-lg text-text-dark dark:text-text">
              Order Summary
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-xs font-montserrat text-text-dark/70 dark:text-text/70 line-clamp-1 flex-1">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-xs font-montserrat font-semibold text-text-dark dark:text-text shrink-0">
                    {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-text-dark/10 dark:bg-text/10" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-text-dark/60 dark:text-text/60">
                  Subtotal
                </span>
                <span className="text-sm font-montserrat font-medium text-text-dark dark:text-text">
                  {total.toLocaleString()} EGP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-montserrat text-text-dark/60 dark:text-text/60">
                  Shipping
                </span>
                <span className="text-sm font-montserrat font-medium text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>
            </div>

            <div className="h-px bg-text-dark/10 dark:bg-text/10" />

            <div className="flex justify-between items-center">
              <span className="font-montserrat font-semibold text-text-dark dark:text-text">
                Total
              </span>
              <span className="font-playfair font-bold text-2xl text-text-dark dark:text-text">
                {grandTotal.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-60">EGP</span>
              </span>
            </div>

            <Button onClick={() => router.push("/checkout")} className="w-full h-11 font-montserrat text-sm" size="lg">
              Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-xs font-montserrat text-center text-text-dark/40 dark:text-text/40">
              Secure checkout · All transactions encrypted
            </p>
          </motion.div>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 space-y-5"
        >
          <div className="w-20 h-20 rounded-full bg-text-dark/5 dark:bg-text/5 flex items-center justify-center">
            <ShoppingBag className="w-9 h-9 text-text-dark/25 dark:text-text/25" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-playfair text-2xl text-text-dark dark:text-text">
              Nothing here yet
            </p>
            <p className="font-montserrat text-sm text-text-dark/60 dark:text-text/60">
              Add coins from the catalog to get started
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="font-montserrat text-sm">
              Browse Catalog
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}