"use client";

import ProductCard from "@/components/ui/product-card";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/products/use-get-all-products";

export const CoinsCatalog = () => {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-text-dark dark:text-text" />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="text-center py-16 text-text-dark dark:text-text">
        Error loading products: {error.message}
      </div>
    );
  }

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
