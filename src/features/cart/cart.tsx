"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import CartItem from "@/components/ui/cart-item";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "1854 Indian Head Gold Dollar",
      price: 12500,
      quantity: 1,
      imageUrl: "/coin1.jpg",
    },
    {
      id: "2",
      name: "Ancient Roman Aureus",
      price: 28000,
      quantity: 1,
      imageUrl: "/coin1.jpg",
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto justify-center items-center w-full">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-text-dark dark:text-text">
        Shopping Cart
      </h1>

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <CartItem
                {...item}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {cartItems.length > 0 ? (
        <div className="p-4 bg-background dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500">
          <div className="flex justify-between items-center mb-4 ">
            <span className="text-lg font-medium text-text-dark dark:text-text">
              Total
            </span>
            <span className="text-2xl font-bold text-text-dark dark:text-text">
              ${total.toLocaleString()}
            </span>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-text-dark/70 dark:text-text/70">
            Your cart is empty
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
