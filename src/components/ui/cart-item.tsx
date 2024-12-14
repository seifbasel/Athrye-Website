import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <motion.div
      layout
      className="flex items-center w-full gap-4 p-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
    >
      <div className="relative h-20 w-20 rounded-md overflow-hidden ">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-text-dark dark:text-text">
          {name}
        </h3>
        <p className="text-sm text-text-dark/70 dark:text-text/70">
          ${price.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          className="rounded-full bg-background dark:bg-background-dark overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5 text-background-dark dark:text-background" />
        </motion.button>
        <span className="text-lg font-medium w-8 text-center text-background-dark dark:text-background">
          {quantity}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="rounded-full bg-background dark:bg-background-dark overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500"
        >
          <Plus className="w-5 h-5 text-background-dark dark:text-background" />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(id)}
        className="p-2 text-red-500 hover:bg-background-dark dark:hover:bg-red-900/20 rounded-full"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
