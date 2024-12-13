'use client';
import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';
import { motion } from "motion/react";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  condition: string;
  rarity: string;
}

interface FavoriteItemProps extends FavoriteItem {
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

const FavoriteItemCard = ({
  id,
  name,
  price,
  imageUrl,
  condition,
  rarity,
  onRemove,
  onMoveToCart
}: FavoriteItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center w-full gap-4 p-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
    >
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-text-dark dark:text-text">{name}</h3>
        <p className="text-sm text-text-dark/70 dark:text-text/70">
          ${price.toLocaleString()}
        </p>
        <div className="flex gap-4 text-xs text-text-dark/70 dark:text-text/70 mt-1">
          <span>Condition: {condition}</span>
          <span>Rarity: {rarity}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onMoveToCart(id)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-background dark:bg-background-dark text-sm font-medium text-text-dark dark:text-text hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(id)}
          className="p-2 text-red-500 hover:bg-background-dark dark:hover:bg-red-900/20 rounded-full"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FavoriteItemCard;