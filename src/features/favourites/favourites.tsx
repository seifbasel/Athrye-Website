"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";
import FavoriteItemCard from "@/components/ui/favourite-card";

export default function FavoritesPage() {
  const { items, removeItem, clearAll } = useFavorites();
  const { addItem } = useCart();

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  const handleMoveToCart = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      addItem({ 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        imageUrl: item.imageUrl 
      });
      removeItem(item.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground">
            Favorites
          </h1>
          <p className="text-sm font-montserrat text-foreground/60 mt-1">
            {items.length === 0
              ? "No saved items"
              : `${items.length} saved piece${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-montserrat text-foreground/50 hover:text-red-500 transition-colors underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List using the Component Card */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                >
                  <FavoriteItemCard
                    {...item}
                    onRemove={removeItem}
                    onMoveToCart={handleMoveToCart}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Value Summary Sidebar */}
          <motion.div
            layout
            className="h-fit p-6 bg-background rounded-2xl border border-foreground/5 shadow-sm space-y-5"
          >
            <h2 className="font-playfair font-bold text-lg text-foreground">
              Collection Value
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-xs font-montserrat text-foreground/60 line-clamp-1 flex-1">
                    {item.name}
                  </span>
                  <span className="text-xs font-montserrat font-semibold text-foreground shrink-0">
                    {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-foreground/10" />

            <div className="flex justify-between items-center">
              <span className="font-montserrat font-semibold text-foreground">
                Total Value
              </span>
              <span className="font-playfair font-bold text-2xl text-foreground">
                {totalValue.toLocaleString()} <span className="text-sm font-montserrat font-normal opacity-60">EGP</span>
              </span>
            </div>

            <Button
              className="w-full h-11 font-montserrat text-sm"
              onClick={() => items.forEach(i => handleMoveToCart(i.id))}
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
          <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center">
            <Heart className="w-9 h-9 text-foreground/20" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-playfair text-2xl text-foreground">
              No favorites yet
            </p>
            <p className="font-montserrat text-sm text-foreground/60">
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