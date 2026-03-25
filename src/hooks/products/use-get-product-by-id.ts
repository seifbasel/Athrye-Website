import { useState, useEffect } from "react";
import Product from "@/types/product";
import { getProductById } from "@/services/products.service";

export function useProduct(id: number | string) {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    getProductById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}