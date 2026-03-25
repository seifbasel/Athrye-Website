"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useProduct } from "@/hooks/products/use-get-product-by-id";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  productId: number;
}

const rarityColor: Record<string, string> = {
  Unique:           "text-amber-700 dark:text-amber-400  bg-amber-50   dark:bg-amber-900/25",
  "Extremely Rare": "text-red-700   dark:text-red-400    bg-red-50     dark:bg-red-900/25",
  "Very Rare":      "text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/25",
  Rare:             "text-blue-700  dark:text-blue-400   bg-blue-50    dark:bg-blue-900/25",
  Scarce:           "text-green-700 dark:text-green-400  bg-green-50   dark:bg-green-900/25",
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isFavorite } = useFavorites();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-7 h-7 animate-spin text-text-dark/40 dark:text-text/40" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="font-playfair text-2xl text-text-dark dark:text-text">Product not found</p>
        <Button variant="outline" onClick={() => router.push("/products")}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  const allImages = product.images ?? [];
  const imageUrl = allImages[selectedImage]?.image ?? product.main_image?.image ?? "/coin1.jpg";
  const inCart = isInCart(product.id as string);
  const favorited = isFavorite(product.id as string);
  const displayYear = product.year < 0 ? `${Math.abs(product.year)} BC` : `${product.year} AD`;
  const totalPrice = product.price * quantity;
  const maxQty = Math.min(5, product.quantity);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id as string,
        name: product.name,
        price: product.price,
        imageUrl: product.main_image?.image ?? "/coin1.jpg",
      });
    }
  };

  const handleFavorite = () => {
    toggleItem({
      id: product.id as string,
      name: product.name,
      price: product.price,
      imageUrl: product.main_image?.image ?? "/coin1.jpg",
      condition: product.condition,
      rarity: product.rarity,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-sm font-montserrat text-text-dark/60 dark:text-text/60 hover:text-text-dark dark:hover:text-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── Image Gallery ── */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-text-dark/3 dark:bg-text/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl}
                  alt={allImages[selectedImage]?.alt_text ?? product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((p) => (p === 0 ? allImages.length - 1 : p - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-md hover:bg-background dark:hover:bg-background-dark transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-text-dark dark:text-text" />
                </button>
                <button
                  onClick={() => setSelectedImage((p) => (p === allImages.length - 1 ? 0 : p + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-md hover:bg-background dark:hover:bg-background-dark transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-text-dark dark:text-text" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-200",
                    selectedImage === i
                      ? "ring-2 ring-text-dark dark:ring-text ring-offset-2 ring-offset-background dark:ring-offset-background-dark"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img.image} alt={img.alt_text ?? `View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ── */}
        <div className="space-y-7">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              {product.rarity && (
                <span className={cn("px-3 py-1 rounded-lg text-xs font-montserrat font-semibold", rarityColor[product.rarity])}>
                  {product.rarity}
                </span>
              )}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleFavorite}
                className="p-2 rounded-full hover:bg-text-dark/5 dark:hover:bg-text/5 transition-colors ml-auto"
              >
                <Heart className={cn("w-5 h-5 transition-colors", favorited ? "fill-red-500 stroke-red-500" : "stroke-text-dark/50 dark:stroke-text/50")} />
              </motion.button>
            </div>
            <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text leading-tight">
              {product.name}
            </h1>
            <div>
              <p className="text-3xl font-montserrat font-bold text-text-dark dark:text-text">
                {totalPrice.toLocaleString()}{" "}
                <span className="text-base font-normal opacity-50">EGP</span>
              </p>
              {quantity > 1 && (
                <p className="text-sm font-montserrat text-text-dark/60 dark:text-text/60 mt-0.5">
                  {product.price.toLocaleString()} EGP × {quantity}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-text-dark/10 dark:bg-text/10" />

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Year",      value: displayYear },
              { label: "Origin",    value: product.origin },
              { label: "Condition", value: product.condition },
              { label: "Material",  value: product.material },
              { label: "Available", value: `${product.quantity} piece${product.quantity !== 1 ? "s" : ""}` },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-xs tracking-widest uppercase font-montserrat text-text-dark/45 dark:text-text/45">
                  {label}
                </p>
                <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-text-dark/10 dark:bg-text/10" />

          {/* Description */}
          <div className="space-y-2">
            <p className="text-xs tracking-widest uppercase font-montserrat text-text-dark/45 dark:text-text/45">
              Description
            </p>
            <p className="font-montserrat text-sm leading-relaxed text-text-dark/75 dark:text-text/75">
              {product.description}
            </p>
          </div>

          {/* Quantity + Actions */}
          <div className="space-y-4">
            {/* Quantity Stepper */}
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase font-montserrat text-text-dark/45 dark:text-text/45">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-text-dark/15 dark:border-text/15 text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 disabled:opacity-30 transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-montserrat font-semibold text-text-dark dark:text-text tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-text-dark/15 dark:border-text/15 text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 disabled:opacity-30 transition-colors"
                >
                  +
                </button>
                <span className="text-xs font-montserrat text-text-dark/50 dark:text-text/50">
                  of {maxQty} available
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-montserrat font-semibold text-sm transition-all duration-200",
                  inCart
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-button dark:bg-button-dark text-text dark:text-text-dark hover:opacity-90"
                )}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? "In Cart" : "Add to Cart"}
              </motion.button>

              <Button
                variant="outline"
                className="flex-1 h-12 font-montserrat font-semibold text-sm"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}