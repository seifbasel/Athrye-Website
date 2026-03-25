"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { getProducts, ProductFilters } from "@/services/products.service";
import Product from "@/types/product";

const RARITIES  = ["Very Rare", "Extremely Rare", "Unique", "Rare", "Scarce"];
const MATERIALS = ["Gold", "Silver", "Bronze", "Copper"];

export default function CoinsCatalog() {
  const [products, setProducts]       = useState<Product[]>([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters]         = useState<ProductFilters>({ search: "", rarity: "", material: "" });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search ?? ""), 350);
    return () => clearTimeout(t);
  }, [filters.search]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({ ...filters, search: debouncedSearch });
      setProducts(data.results);
    } catch { setProducts([]); }
    finally { setIsLoading(false); }
  }, [debouncedSearch, filters.rarity, filters.material]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const clearFilters = () => setFilters({ search: "", rarity: "", material: "" });
  const activeCount  = [filters.rarity, filters.material].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-playfair font-bold text-text-dark dark:text-text">
          Coin Catalog
        </h1>
        <p className="font-montserrat text-sm text-text-dark/55 dark:text-text/55 mt-1">
          {isLoading ? "Loading…" : `${products.length} piece${products.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2.5 h-11 px-4 rounded-xl border border-text-dark/12 dark:border-text/12 bg-background dark:bg-background-dark focus-within:ring-2 focus-within:ring-text-dark/12 dark:focus-within:ring-text/12 transition-all">
          <Search className="w-4 h-4 text-text-dark/35 dark:text-text/35 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, origin, material…"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="flex-1 bg-transparent text-sm font-montserrat text-text-dark dark:text-text placeholder:text-text-dark/30 dark:placeholder:text-text/30 outline-none"
          />
          {filters.search && (
            <button onClick={() => setFilters((f) => ({ ...f, search: "" }))}>
              <X className="w-3.5 h-3.5 text-text-dark/35 dark:text-text/35 hover:text-text-dark dark:hover:text-text transition-colors" />
            </button>
          )}
        </div>

        <motion.button whileTap={{ scale: 0.96 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 h-11 px-4 rounded-xl border font-montserrat text-sm font-medium transition-all duration-200 ${
            showFilters || activeCount > 0
              ? "bg-button dark:bg-button-dark text-text dark:text-text-dark border-transparent"
              : "border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text hover:bg-text-dark/4 dark:hover:bg-text/4"
          }`}>
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-text/25 dark:bg-text-dark/25 text-xs font-bold">
              {activeCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden">
            <div className="p-5 rounded-xl border border-text-dark/8 dark:border-text/8 bg-background dark:bg-background-dark space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Rarity",   options: RARITIES,  key: "rarity"   as const },
                  { label: "Material", options: MATERIALS, key: "material" as const },
                ].map(({ label, options, key }) => (
                  <div key={key} className="space-y-2.5">
                    <p className="text-xs tracking-[0.2em] uppercase font-montserrat font-medium text-text-dark/50 dark:text-text/50">
                      {label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((o) => (
                        <button key={o}
                          onClick={() => setFilters((f) => ({ ...f, [key]: f[key] === o ? "" : o }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-montserrat font-medium transition-all duration-200 ${
                            filters[key] === o
                              ? "bg-button dark:bg-button-dark text-text dark:text-text-dark"
                              : "border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text hover:bg-text-dark/4 dark:hover:bg-text/4"
                          }`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {activeCount > 0 && (
                <button onClick={clearFilters}
                  className="text-xs font-montserrat text-text-dark/45 dark:text-text/45 hover:text-text-dark dark:hover:text-text transition-colors underline underline-offset-2">
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid / States */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-text-dark/35 dark:text-text/35" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 space-y-3">
          <p className="font-playfair text-2xl text-text-dark/35 dark:text-text/35">No coins found</p>
          <p className="font-montserrat text-sm text-text-dark/45 dark:text-text/45">
            Try adjusting your search or filters
          </p>
          <button onClick={clearFilters}
            className="mt-2 text-sm font-montserrat font-semibold text-text-dark dark:text-text underline underline-offset-2">
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {products.map((coin, i) => (
              <motion.div key={coin.id} layout
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}>
                <ProductCard {...coin} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}