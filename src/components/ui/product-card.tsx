"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React, { useState } from "react"; // 1. Import useState
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Product from "@/types/product";
import { useRouter } from "next/navigation";

const ProductCard = (product: Product) => {
  const {
    id,
    name,
    year,
    price,
    condition,
    origin,
    material,
    main_image,
    description,
  } = product;

  const router = useRouter();

  // 2. Initialize toggle states
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const imageUrl = main_image?.image || "/7.jpg";
  const displayYear = year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;

  // 3. Toggle Handlers
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInCart((prev) => !prev);
    // Add your logic to update global cart state/context here
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
    // Add your logic to update global favorites/wishlist here
  };

  return (
    <motion.div
      className="group w-full cursor-pointer overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/94 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/58 via-black/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-background/95 px-4 py-2 text-xs font-montserrat font-semibold text-foreground shadow-md backdrop-blur-md">
            <Eye className="h-3.5 w-3.5" />
            View Details
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={handleFavorite}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-background/90 p-2 shadow-sm backdrop-blur-md transition-colors hover:bg-background dark:bg-card/90 dark:hover:bg-card"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              isFavorited
                ? "fill-red-500 stroke-red-500" // Red when active
                : "stroke-foreground/55",
            )}
          />
        </motion.button>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold leading-snug text-foreground">
            {name}
          </h3>
          <p className="mt-1 text-xl font-bold text-foreground">
            {price.toLocaleString()}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              EGP
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { label: "Year", value: displayYear },
            { label: "Origin", value: origin },
            { label: "Condition", value: condition },
            { label: "Material", value: material },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-1"
            >
              <span className="shrink-0 text-[11px] font-montserrat uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </span>
              <span className="line-clamp-1 text-right text-xs font-montserrat font-semibold text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>

        <p className="line-clamp-2 text-sm font-montserrat leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* 4. Cart Button Toggle Logic */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={cn(
            "flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-montserrat font-semibold transition-all duration-200",
            isInCart
              ? "bg-accent text-accent-foreground" // "Added" State
              : "bg-foreground text-background hover:-translate-y-0.5 hover:opacity-95", // "Initial" State
          )}
        >
          <ShoppingCart className={cn("h-5 w-5", isInCart && "fill-current")} />
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;