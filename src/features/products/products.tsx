"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import Product from "@/types/product";
import { Input } from "@/components/ui/input";
import { MOCK_PRODUCTS } from "@/mocks/products";

const MATERIALS = ["Gold", "Silver", "Bronze", "Copper"];

type ProductFilters = {
  search: string;
  material: string;
};

export default function CoinsCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    material: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search.trim()), 350);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const filteredProducts = useMemo(() => {
    const searchTerm = debouncedSearch.toLowerCase();

    return MOCK_PRODUCTS.filter((product) => {
      const matchesMaterial =
        !filters.material || product.material === filters.material;
      const matchesSearch =
        !searchTerm ||
        [product.name, product.origin, product.material, product.condition]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm);

      return matchesMaterial && matchesSearch;
    });
  }, [debouncedSearch, filters.material]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [filteredProducts]);

  const clearFilters = () => setFilters({ search: "", material: "" });
  const activeCount = [filters.material].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-foreground">
          Coin Catalog
        </h1>
        <p className="mt-1 font-montserrat text-sm text-foreground/60">
          {isLoading
            ? "Loading..."
            : `${products.length} piece${products.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      <div className="flex gap-3">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4 transition-all focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="h-4 w-4 shrink-0 text-foreground/40" />

          <Input
            variant="ghost"
            type="text"
            placeholder="Search by name, origin, material..."
            value={filters.search}
            onChange={(e) =>
              setFilters((currentFilters) => ({
                ...currentFilters,
                search: e.target.value,
              }))
            }
            className="font-montserrat placeholder:text-foreground/40"
          />

          {filters.search && (
            <button
              onClick={() =>
                setFilters((currentFilters) => ({
                  ...currentFilters,
                  search: "",
                }))
              }
              className="rounded-md p-1 transition-colors hover:bg-foreground/5"
            >
              <X className="h-4 w-4 text-foreground/40 hover:text-foreground" />
            </button>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex h-11 items-center gap-2 rounded-xl border px-4 font-montserrat text-sm font-medium transition-all duration-200 ${
            showFilters || activeCount > 0
              ? "border-transparent bg-foreground text-background"
              : "border-foreground/15 text-foreground hover:bg-foreground/5"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-background/25 text-xs font-bold">
              {activeCount}
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-5 rounded-xl border border-foreground/10 bg-background p-5">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  {
                    label: "Material",
                    options: MATERIALS,
                    key: "material" as const,
                  },
                ].map(({ label, options, key }) => (
                  <div key={key} className="space-y-2.5">
                    <p className="text-xs font-montserrat font-medium uppercase tracking-[0.2em] text-foreground/50">
                      {label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setFilters((currentFilters) => ({
                              ...currentFilters,
                              [key]:
                                currentFilters[key] === option ? "" : option,
                            }))
                          }
                          className={`rounded-lg px-3 py-1.5 text-xs font-montserrat font-medium transition-all duration-200 ${
                            filters[key] === option
                              ? "bg-foreground text-background"
                              : "border border-foreground/15 text-foreground hover:bg-foreground/5"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {activeCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-montserrat text-foreground/50 underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-7 w-7 animate-spin text-foreground/40" />
        </div>
      ) : products.length === 0 ? (
        <div className="space-y-3 py-24 text-center">
          <p className="font-playfair text-2xl text-foreground/40">
            No coins found
          </p>
          <p className="font-montserrat text-sm text-foreground/50">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-sm font-montserrat font-semibold text-foreground underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {products.map((coin, index) => (
              <motion.div
                key={coin.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <ProductCard {...coin} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
