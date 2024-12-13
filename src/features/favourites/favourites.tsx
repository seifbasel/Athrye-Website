'use client';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from "motion/react"
import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    <div className="flex items-center gap-4 p-4 bg-background dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-text-dark dark:text-text mb-1">{name}</h3>
        <div className="flex gap-4 text-sm text-text-dark/70 dark:text-text/70">
          <span>Condition: {condition}</span>
          <span>Rarity: {rarity}</span>
        </div>
        <div className="text-lg font-bold text-text-dark dark:text-text mt-1">
          ${price.toLocaleString()}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onRemove(id)}
          className="flex-shrink-0"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
        <Button
          variant="default"
          onClick={() => onMoveToCart(id)}
          className="flex-shrink-0"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([
    {
      id: '1',
      name: '1854 Indian Head Gold Dollar',
      price: 12500,
      imageUrl: '/coin1.jpg',
      condition: 'MS-63',
      rarity: 'Very Rare',
    },
    {
      id: '2',
      name: 'Ancient Roman Aureus',
      price: 28000,
      imageUrl: '/coin1.jpg',
      condition: 'XF-45',
      rarity: 'Extremely Rare',
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    // Here you would typically add the item to the cart
    // and optionally remove it from favorites
    console.log('Moving item to cart:', id);
  };

  return (
    <div className="max-w-4xl mx-auto justify-center items-center w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-playfair text-text-dark dark:text-text">
          Favorites
        </h1>
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 fill-red-500 stroke-red-500" />
          <span className="text-lg font-medium text-text-dark dark:text-text">
            {favoriteItems.length} items
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {favoriteItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <FavoriteItemCard
                {...item}
                onRemove={handleRemoveItem}
                onMoveToCart={handleMoveToCart}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {favoriteItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 stroke-text-dark/30 dark:stroke-text/30 mx-auto mb-4" />
          <p className="text-lg text-text-dark/70 dark:text-text/70 mb-4">
            Your favorites list is empty
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/catalog'}
          >
            Browse Catalog
          </Button>
        </div>
      )}
    </div>
  );
}