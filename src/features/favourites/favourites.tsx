"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";

export default function FavoritesPage() {
  const { items, removeItem, clearAll } = useFavorites();
  const { addItem, isInCart } = useCart();

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl });
    removeItem(item.id);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl });
    });
    clearAll();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-text-dark dark:text-text">
            Favorites
          </h1>
          <p className="text-sm font-montserrat text-text-dark/60 dark:text-text/60 mt-1">
            {items.length === 0
              ? "No saved items"
              : `${items.length} saved piece${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 hover:text-red-500 transition-colors underline underline-offset-2"
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
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/20 dark:shadow-background/10 hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold font-montserrat text-text-dark dark:text-text line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text mt-0.5">
                      {item.price.toLocaleString()} <span className="text-xs font-normal opacity-60">EGP</span>
                    </p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs font-montserrat text-text-dark/60 dark:text-text/60">
                        {item.condition}
                      </span>
                      <span className="text-xs font-montserrat text-text-dark/60 dark:text-text/60">·</span>
                      <span className="text-xs font-montserrat text-text-dark/60 dark:text-text/60">
                        {item.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-text-dark/15 dark:border-text/15 text-xs font-montserrat font-medium text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                      </span>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            layout
            className="h-fit p-6 bg-background dark:bg-background-dark rounded-2xl shadow-sm shadow-background-dark/20 dark:shadow-background/10 space-y-5"
          >
            <h2 className="font-playfair font-bold text-lg text-text-dark dark:text-text">
              Collection Value
            </h2>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-xs font-montserrat text-text-dark/60 dark:text-text/60 line-clamp-1 flex-1">
                    {item.name}
                  </span>
                  <span className="text-xs font-montserrat font-semibold text-text-dark dark:text-text shrink-0">
                    {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-text-dark/10 dark:bg-text/10" />

            <div className="flex justify-between items-center">
              <span className="font-montserrat font-semibold text-text-dark dark:text-text">
                Total Value
              </span>
              <span className="font-playfair font-bold text-2xl text-text-dark dark:text-text">
                {totalValue.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-60">EGP</span>
              </span>
            </div>

            <Button
              className="w-full h-11 font-montserrat text-sm"
              onClick={handleMoveAllToCart}
            >
              Move All to Cart
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
            <Heart className="w-9 h-9 text-text-dark/25 dark:text-text/25" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-playfair text-2xl text-text-dark dark:text-text">
              No favorites yet
            </p>
            <p className="font-montserrat text-sm text-text-dark/60 dark:text-text/60">
              Heart coins in the catalog to save them here
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