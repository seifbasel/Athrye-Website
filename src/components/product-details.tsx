"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useProduct } from "@/hooks/products/use-get-product-by-id";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isFavorite } = useFavorites();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-foreground/40" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-playfair text-2xl text-foreground">
          Product not found
        </p>
        <Button variant="outline" onClick={() => router.push("/products")}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  const allImages = product.images ?? [];
  const imageUrl =
    allImages[selectedImage]?.image ??
    product.main_image?.image ??
    "/coin1.jpg";
  const inCart = isInCart(product.id as string);
  const favorited = isFavorite(product.id as string);
  const displayYear =
    product.year < 0 ? `${Math.abs(product.year)} BC` : `${product.year} AD`;
  const totalPrice = product.price * quantity;
  const maxQty = Math.min(5, product.quantity);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addItem({
        id: product.id as string,
        name: product.name,
        price: product.price,
        imageUrl: product.main_image?.image ?? "/coin1.jpg",
      });
    }
  };

  const handleFavorite = () =>
    toggleItem({
      id: product.id as string,
      name: product.name,
      price: product.price,
      imageUrl: product.main_image?.image ?? "/coin1.jpg",
      condition: product.condition,
    });

  return (
    <div className="mx-auto max-w-6xl">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm font-montserrat text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-soft">
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
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-background/92 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-background/92 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex w-full gap-3 overflow-x-auto px-1 pb-2 scrollbar-thin scrollbar-track-transparent">
              {allImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative mt-1 h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-200",
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/25 ring-offset-2 ring-offset-background"
                      : "border-border/60 opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={img.image}
                    alt={img.alt_text ?? `View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleFavorite}
                className="ml-auto rounded-full border border-border/70 p-2 transition-colors hover:bg-secondary/70"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    favorited
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-foreground/50",
                  )}
                />
              </motion.button>
            </div>

            <h1 className="text-3xl font-playfair font-bold leading-tight text-foreground">
              {product.name}
            </h1>

            <div>
              <p className="text-3xl font-montserrat font-bold text-foreground">
                {totalPrice.toLocaleString()}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  EGP
                </span>
              </p>
              {quantity > 1 && (
                <p className="mt-0.5 text-sm font-montserrat text-muted-foreground">
                  {product.price.toLocaleString()} EGP x {quantity}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-border/70" />

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Year", value: displayYear },
              { label: "Origin", value: product.origin },
              { label: "Condition", value: product.condition },
              { label: "Material", value: product.material },
              {
                label: "Available",
                value: `${product.quantity} piece${product.quantity !== 1 ? "s" : ""}`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-xs font-montserrat uppercase tracking-widest text-muted-foreground">
                  {label}
                </p>
                <p className="text-sm font-montserrat font-semibold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-border/70" />

          <div className="space-y-2">
            <p className="text-xs font-montserrat uppercase tracking-widest text-muted-foreground">
              Description
            </p>
            <p className="text-sm leading-relaxed text-foreground/85">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-montserrat uppercase tracking-widest text-muted-foreground">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                  disabled={quantity <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary/75 disabled:opacity-30"
                >
                  -
                </button>
                <span className="w-8 text-center font-montserrat font-semibold tabular-nums text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((qty) => Math.min(maxQty, qty + 1))
                  }
                  disabled={quantity >= maxQty}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary/75 disabled:opacity-30"
                >
                  +
                </button>
                <span className="text-xs font-montserrat text-muted-foreground">
                  of {maxQty} available
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={cn(
                  "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-montserrat font-semibold transition-all duration-200",
                  inCart
                    ? "cursor-default bg-accent text-accent-foreground"
                    : "bg-foreground text-background hover:-translate-y-0.5 hover:opacity-95",
                )}
              >
                <ShoppingCart className="h-4 w-4" />{" "}
                {inCart ? "In Cart" : "Add to Cart"}
              </motion.button>
              <Button
                variant="secondary"
                className="h-12 flex-1 font-montserrat bg-primary text-text text-sm font-semibold"
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
