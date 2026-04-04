"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import FavoriteItemCard from "@/components/ui/favourite-card";
import { MOCK_FAVORITE_ITEMS } from "@/mocks/favorites";
import type { FavoriteItem } from "@/types/favourites";
import type { CartItem } from "@/types/cart-item";

export default function FavoritesPage() {
  const [items, setItems] = useState<FavoriteItem[]>(MOCK_FAVORITE_ITEMS);
  const [mockCartPreview, setMockCartPreview] = useState<CartItem[]>([]);

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearAll = () => setItems([]);

  const handleMoveToCart = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) return;

    setMockCartPreview((currentItems) => [
      ...currentItems,
      {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        imageUrl: item.imageUrl,
      },
    ]);
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
            {mockCartPreview.length > 0 && (
              <p className="text-xs font-montserrat text-muted-foreground">
                {mockCartPreview.length} item
                {mockCartPreview.length !== 1 ? "s" : ""} added to this page's
                mock cart preview.
              </p>
            )}
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
