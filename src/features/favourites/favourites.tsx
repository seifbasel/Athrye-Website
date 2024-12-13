'use client';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from "motion/react"
import { Heart } from 'lucide-react';
import { useState } from 'react';
import FavoriteItemCard from '@/components/ui/favourite-card';
import favouriteItem from '@/types/favourites';

export default function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState<favouriteItem[]>([
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
    console.log('Moving item to cart:', id);
  };

  const totalValue = favoriteItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto justify-center items-center w-full">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-text-dark dark:text-text">
        Favorites
      </h1>

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {favoriteItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
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

      {favoriteItems.length > 0 ? (
        <div className="p-4 bg-background dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md shadow-background-dark dark:shadow-background transition-shadow duration-500">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-text-dark dark:text-text">
              Total Value
            </span>
            <span className="text-2xl font-bold text-text-dark dark:text-text">
              ${totalValue.toLocaleString()}
            </span>
          </div>
          <Button className="w-full" size="lg">
            Move All to Cart
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 stroke-text-dark/30 dark:stroke-text/30 mx-auto mb-4" />
          <p className="text-lg text-text-dark/70 dark:text-text/70">
            Your favorites list is empty
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.href = '/catalog'}
          >
            Browse Catalog
          </Button>
        </div>
      )}
    </div>
  );
}