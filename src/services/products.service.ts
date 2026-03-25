/**
 * Products Service
 * All functions are mock implementations with the exact Django DRF contract documented.
 * To go live: replace BASE_URL env var + remove the mock logic blocks.
 */

import Product from "@/types/product";
import { MOCK_PRODUCTS } from "@/mocks/data";

// TODO: const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type ProductFilters = {
  search?: string;
  rarity?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  ordering?: string;
  page?: number;
};

export type PaginatedProducts = {
  results: Product[];
  count: number;
  next: string | null;
  previous: string | null;
};

/**
 * GET /api/products/
 * Query params: search, rarity, material, min_price, max_price, ordering, page
 * Returns: DRF paginated response
 */
export async function getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
  // TODO: swap with real fetch:
  // const params = new URLSearchParams();
  // Object.entries(filters).forEach(([k, v]) => v && params.set(k, String(v)));
  // const res = await fetch(`${BASE_URL}/products/?${params}`);
  // if (!res.ok) throw new Error("Failed to fetch products");
  // return res.json();

  await delay(500);
  let results = [...MOCK_PRODUCTS];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }
  if (filters.rarity)   results = results.filter((p) => p.rarity === filters.rarity);
  if (filters.material) results = results.filter((p) => p.material === filters.material);
  if (filters.minPrice) results = results.filter((p) => p.price >= filters.minPrice!);
  if (filters.maxPrice) results = results.filter((p) => p.price <= filters.maxPrice!);

  return { results, count: results.length, next: null, previous: null };
}

/**
 * GET /api/products/:id/
 * Returns: single Product
 */
export async function getProductById(id: number | string): Promise<Product> {
  // TODO: const res = await fetch(`${BASE_URL}/products/${id}/`); return res.json();

  await delay(350);
  const product = MOCK_PRODUCTS.find((p) => p.id === String(id));
  if (!product) throw new Error(`Product ${id} not found`);
  return product;
}