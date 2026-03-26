"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Product from "@/types/product";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";

const rarityColor: Record<string, string> = {
  Unique:           "text-amber-700 dark:text-amber-400  bg-amber-50   dark:bg-amber-900/25",
  "Extremely Rare": "text-red-700   dark:text-red-400    bg-red-50     dark:bg-red-900/25",
  "Very Rare":      "text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/25",
  Rare:             "text-blue-700  dark:text-blue-400   bg-blue-50    dark:bg-blue-900/25",
  Scarce:           "text-green-700 dark:text-green-400  bg-green-50   dark:bg-green-900/25",
};

const ProductCard = (product: Product) => {
  const { id, name, year, price, rarity, condition, origin, material, main_image, description } = product;
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isFavorite } = useFavorites();

  const imageUrl = main_image?.image || "/coin1.jpg";
  const inCart = isInCart(id as string);
  const favorited = isFavorite(id as string);
  const displayYear = year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: id as string, name, price, imageUrl });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem({ id: id as string, name, price, imageUrl, condition, rarity });
  };

  return (
    <motion.div
      className="w-full bg-foreground/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md shadow-foreground transition-shadow duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/products/${id}`)}
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View details — appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background backdrop-blur-sm text-xs font-montserrat font-semibold text-text-dark dark:text-text shadow-md">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </span>
        </div>

        {/* Rarity Badge */}
        {rarity && (
          <div
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-montserrat font-semibold",
              rarityColor[rarity] ?? "text-background bg-foreground"
            )}
          >
            {rarity}
          </div>
        )}

        {/* Favorite button */}
        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-background/90 dark:bg-background-dark/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-background dark:hover:bg-background-dark transition-colors"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              favorited ? "fill-red-500 stroke-red-500" : "stroke-text-dark/50 dark:stroke-text/50"
            )}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Name + Price */}
        <div>
          <h3 className="font-playfair font-bold text-lg text-foreground leading-snug line-clamp-1">
            {name}
          </h3>
          <p className="font-montserrat font-bold text-xl text-foreground mt-1">
            {price.toLocaleString()}{" "}
            <span className="text-xs font-normal opacity-50">EGP</span>
          </p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { label: "Year",      value: displayYear },
            { label: "Origin",    value: origin },
            { label: "Condition", value: condition },
            { label: "Material",  value: material },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-baseline gap-1">
              <span className="text-xs font-montserrat text-foreground shrink-0">
                {label}
              </span>
              <span className="text-xs font-montserrat font-semibold text-foreground text-right line-clamp-1">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs font-montserrat text-foreground/55 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={cn(
            "w-full h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-montserrat font-semibold transition-all duration-00",
            inCart
              ? "bg-primary-foreground text-foreground cursor-default"
              : "bg-foreground text-background hover:opacity-80"
          )}
        >
          <ShoppingCart className="w-5 h-5" />
          {inCart ? "Added to Cart" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;