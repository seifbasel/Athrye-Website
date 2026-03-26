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
  const shipping = 0; // Free shipping
  const grandTotal = total + shipping;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground">Shopping Cart</h1>
          <p className="text-sm font-montserrat text-foreground/60 mt-1">
            {items.length === 0 ? "Your cart is empty" : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
          </p>
        </div>
        {items.length > 0 && <button onClick={clearCart} className="text-xs font-montserrat text-foreground/50 hover:text-red-500 transition-colors underline underline-offset-2">Clear all</button>}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }} transition={{ duration: 0.3 }}>
                  <CartItem {...item} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div layout className="h-fit p-6 bg-background rounded-2xl shadow-sm border border-foreground/5 space-y-5">
            <h2 className="font-playfair font-bold text-lg text-foreground">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-xs font-montserrat text-foreground/70 line-clamp-1 flex-1">{item.name} × {item.quantity}</span>
                  <span className="text-xs font-montserrat font-semibold text-foreground shrink-0">{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-foreground/10" />
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-sm font-montserrat text-foreground/60">Subtotal</span><span className="text-sm font-montserrat font-medium text-foreground">{total.toLocaleString()} EGP</span></div>
              <div className="flex justify-between"><span className="text-sm font-montserrat text-foreground/60">Shipping</span><span className="text-sm font-montserrat font-medium text-green-500">Free</span></div>
            </div>
            <div className="h-px bg-foreground/10" />
            <div className="flex justify-between items-center">
              <span className="font-montserrat font-semibold text-foreground">Total</span>
              <span className="font-playfair font-bold text-2xl text-foreground">{grandTotal.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-60">EGP</span></span>
            </div>
            <Button className="w-full h-11 font-montserrat text-sm" size="lg" onClick={() => router.push("/checkout")}>Checkout <ArrowRight className="w-4 h-4 ml-2" /></Button>
            <p className="text-xs font-montserrat text-center text-foreground/40">Secure checkout · All transactions encrypted</p>
          </motion.div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24 space-y-5">
          <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center"><ShoppingBag className="w-9 h-9 text-foreground/30" /></div>
          <div className="text-center space-y-1">
            <p className="font-playfair text-2xl text-foreground">Nothing here yet</p>
            <p className="font-montserrat text-sm text-foreground/60">Add coins from the catalog to get started</p>
          </div>
          <Link href="/products"><Button variant="outline" className="font-montserrat text-sm">Browse Catalog</Button></Link>
        </motion.div>
      )}
    </div>
  );
}