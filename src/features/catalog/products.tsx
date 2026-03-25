"use client";

import ProductCard from "@/components/ui/product-card";

const products: Array<{ id: number; name: string }> = [
{
      id: 1,
      name: "1854 Indian Head Gold Dollar",
      price: 12500,
      quantity: 1,
      imageUrl: "/coin1.jpg",
    },
    {
      id: 2,
      name: "Ancient Roman Aureus",
      price: 28000,
      quantity: 1,
      imageUrl: "/coin1.jpg",
    },
];

export const CoinsCatalog = () => {

  

  return (
    <div className="space-y-8">
      <h1 className="text-text-dark dark:text-text font-playfair text-4xl font-semibold">
        Premium Coin Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((coin) => (
          <div key={coin.id} className="w-full min-w-0">
            <ProductCard {...coin} />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16 text-text-dark dark:text-text font-medium">
          No coins available.
        </div>
      )}
    </div>
  );
};

export default CoinsCatalog;
