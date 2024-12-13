import Image from "next/image";
import { motion } from "motion/react"
import React, { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Product from "@/types/product";
import { Button } from "./button";

const ProductCard = ({
  name,
  year,
  price,
  rarity,
  condition,
  origin,
  imageUrl,
  description,
}: Product) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      className="w-80 bg-background dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <span className="text-text text-lg font-semibold">{name}</span>
          <span className="text-text text-lg font-bold">
            ${price.toLocaleString()}
          </span>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              isFavorite
                ? "fill-red-500 stroke-red-500"
                : "stroke-gray-600 dark:stroke-gray-300"
            )}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-dark dark:text-text">{year}</span>
          <span className="text-sm font-medium text-text-dark dark:text-text">
            {origin}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-card-foreground dark:text-text">Rarity:</span>
            <span className="font-medium  text-text-dark dark:text-text">
              {rarity}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-card-foreground dark:text-text">
              Condition:
            </span>
            <span className="font-medium  text-text-dark dark:text-text">
              {condition}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-card-foreground dark:text-text">
              Condition:
            </span>
            <span className="font-medium  text-text-dark dark:text-text">
              {condition}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-card-foreground dark:text-text">
              Condition:
            </span>
            <span className="font-medium  text-text-dark dark:text-text">
              {condition}
            </span>
          </div>
        </div>

        <p className="text-sm text-card-foreground dark:text-text line-clamp-3 mb-4">
          {description}
        </p>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
          <Button variant="default" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
