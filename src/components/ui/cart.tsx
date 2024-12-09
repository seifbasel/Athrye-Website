import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { motion } from "motion/react"
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
      className="flex items-center gap-4 p-4 bg-card dark:bg-background-dark rounded-lg"
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
        <h3 className="font-medium text-text-dark dark:text-text">{name}</h3>
        <p className="text-sm text-text-dark/70 dark:text-text/70">
          ${price.toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          className="p-1 rounded-full bg-background dark:bg-background-dark"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="text-lg font-medium w-8 text-center">{quantity}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="p-1 rounded-full bg-background dark:bg-background-dark"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(id)}
        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;