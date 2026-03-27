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

interface ProductDetailProps { productId: number; }


export default function ProductDetail({ productId }: ProductDetailProps) {
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isFavorite } = useFavorites();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="w-7 h-7 animate-spin text-foreground/40" /></div>;
  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="font-playfair text-2xl text-foreground">Product not found</p>
      <Button variant="outline" onClick={() => router.push("/products")}>Back to Catalog</Button>
    </div>
  );

  const allImages = product.images ?? [];
  const imageUrl = allImages[selectedImage]?.image ?? product.main_image?.image ?? "/coin1.jpg";
  const inCart = isInCart(product.id as string);
  const favorited = isFavorite(product.id as string);
  const displayYear = product.year < 0 ? `${Math.abs(product.year)} BC` : `${product.year} AD`;
  const totalPrice = product.price * quantity;
  const maxQty = Math.min(5, product.quantity);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem({ id: product.id as string, name: product.name, price: product.price, imageUrl: product.main_image?.image ?? "/coin1.jpg" });
  };

  const handleFavorite = () => toggleItem({ id: product.id as string, name: product.name, price: product.price, imageUrl: product.main_image?.image ?? "/coin1.jpg", condition: product.condition});

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 mb-8 text-sm font-montserrat text-foreground/60 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-foreground/5">
            <AnimatePresence mode="wait">
              <motion.div key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0">
                <Image src={imageUrl} alt={allImages[selectedImage]?.alt_text ?? product.name} fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
            {allImages.length > 1 && (
              <>
                <button onClick={() => setSelectedImage((p) => (p === 0 ? allImages.length - 1 : p - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-background transition-colors"><ChevronLeft className="w-5 h-5 text-foreground" /></button>
                <button onClick={() => setSelectedImage((p) => (p === allImages.length - 1 ? 0 : p + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-md hover:bg-background transition-colors"><ChevronRight className="w-5 h-5 text-foreground" /></button>
              </>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 px-1 w-full scrollbar-thin scrollbar-track-transparent">
              {allImages.map((img, i) => (
                <button key={img.id} onClick={() => setSelectedImage(i)} className={cn("relative w-20 h-20 mt-1 shrink-0 rounded-sm overflow-hidden transition-all duration-200", selectedImage === i ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100")}>
                  <Image src={img.image} alt={img.alt_text ?? `View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-7">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <motion.button whileTap={{ scale: 0.88 }} onClick={handleFavorite} className="p-2 rounded-full hover:bg-foreground/5 transition-colors ml-auto">
                <Heart className={cn("w-5 h-5 transition-colors", favorited ? "fill-red-500 stroke-red-500" : "stroke-foreground/50")} />
              </motion.button>
            </div>
            <h1 className="text-3xl font-playfair font-bold text-foreground leading-tight">{product.name}</h1>
            <div>
              <p className="text-3xl font-montserrat font-bold text-foreground">{totalPrice.toLocaleString()} <span className="text-base font-normal opacity-50">EGP</span></p>
              {quantity > 1 && <p className="text-sm font-montserrat text-foreground/60 mt-0.5">{product.price.toLocaleString()} EGP × {quantity}</p>}
            </div>
          </div>

          <div className="h-px bg-foreground/10" />

          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Year", value: displayYear }, { label: "Origin", value: product.origin }, { label: "Condition", value: product.condition }, { label: "Material", value: product.material }, { label: "Available", value: `${product.quantity} piece${product.quantity !== 1 ? "s" : ""}` }].map(({ label, value }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-xs tracking-widest uppercase font-montserrat text-foreground/50">{label}</p>
                <p className="text-sm font-montserrat font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-foreground/10" />

          <div className="space-y-2">
            <p className="text-xs tracking-widest uppercase font-montserrat text-foreground/50">Description</p>
            <p className="font-montserrat text-sm leading-relaxed text-foreground/75">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase font-montserrat text-foreground/50">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} className="w-9 h-9 flex items-center justify-center rounded-lg border border-foreground/15 text-foreground hover:bg-foreground/5 disabled:opacity-30 transition-colors">−</button>
                <span className="w-8 text-center font-montserrat font-semibold text-foreground tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))} disabled={quantity >= maxQty} className="w-9 h-9 flex items-center justify-center rounded-lg border border-foreground/15 text-foreground hover:bg-foreground/5 disabled:opacity-30 transition-colors">+</button>
                <span className="text-xs font-montserrat text-foreground/50">of {maxQty} available</span>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAddToCart} className={cn("flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-montserrat font-semibold text-sm transition-all duration-200", inCart ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-foreground text-background hover:opacity-90")}>
                <ShoppingCart className="w-4 h-4" /> {inCart ? "In Cart" : "Add to Cart"}
              </motion.button>
              <Button variant="outline" className="flex-1 h-12 font-montserrat font-semibold text-sm">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}