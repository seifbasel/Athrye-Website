"use client";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  condition: string;
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
  onRemove,
  onMoveToCart,
}: FavoriteItemProps) => {
  return (
    <motion.div
      layout
      className="flex items-center w-full gap-4 p-4 rounded-xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">
          ${price.toLocaleString()}
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
          <span>Condition: {condition}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onMoveToCart(id)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors duration-300"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(id)}
          className="p-2 text-red-500 rounded-full hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FavoriteItemCard;
