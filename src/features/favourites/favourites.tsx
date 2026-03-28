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
    const item = items.find((entry) => entry.id === id);
    if (!item) return;

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });
    removeItem(item.id);
  };

  return (
    <div className="mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-foreground">
            Favorites
          </h1>
          <p className="mt-1 text-sm font-montserrat text-muted-foreground">
            {items.length === 0
              ? "No saved items"
              : `${items.length} saved piece${items.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-montserrat text-muted-foreground underline underline-offset-2 transition-colors hover:text-red-500"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
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

          <motion.div
            layout
            className="h-fit space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="font-playfair text-lg font-bold text-foreground">
              Collection Value
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="flex-1 line-clamp-1 text-xs font-montserrat text-muted-foreground">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-xs font-montserrat font-semibold text-foreground">
                    {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-px bg-border/70" />
            <div className="flex items-center justify-between">
              <span className="font-montserrat font-semibold text-foreground">
                Total Value
              </span>
              <span className="font-playfair text-2xl font-bold text-foreground">
                {totalValue.toLocaleString()}{" "}
                <span className="font-montserrat text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>
            <Button
              className="h-11 w-full font-montserrat text-sm"
              onClick={() => items.forEach((item) => handleMoveToCart(item.id))}
            >
              Move All to Cart
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center space-y-5 py-24"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
            <Heart className="h-9 w-9 text-muted-foreground" />
          </div>
          <div className="space-y-1 text-center">
            <p className="font-playfair text-2xl text-foreground">
              No favorites yet
            </p>
            <p className="text-sm font-montserrat text-muted-foreground">
              Heart coins in the catalog to save them here
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
