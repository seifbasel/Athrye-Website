import { MOCK_PRODUCTS } from "@/mocks/products";
import type Product from "@/types/product";

type UseProductResult = {
  data: Product | null;
  isLoading: boolean;
  error: Error | null;
};

export function useProduct(productId: number | string): UseProductResult {
  const product =
    MOCK_PRODUCTS.find((entry) => entry.id === String(productId)) ?? null;

  return {
    data: product,
    isLoading: false,
    error: product ? null : new Error("Product not found"),
  };
}
