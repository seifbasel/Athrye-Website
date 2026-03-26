"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { getProducts, ProductFilters } from "@/services/products.service";
import Product from "@/types/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RARITIES = ["Very Rare", "Extremely Rare", "Unique", "Rare", "Scarce"];
const MATERIALS = ["Gold", "Silver", "Bronze", "Copper"];

export default function CoinsCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({ search: "", rarity: "", material: "" });
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
  const activeCount = [filters.rarity, filters.material].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-playfair font-bold text-foreground">Coin Catalog</h1>
        <p className="font-montserrat text-sm text-foreground/60 mt-1">
          {isLoading ? "Loading…" : `${products.length} piece${products.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      <div className="flex gap-3">
  {/* Search Bar Wrapper */}
  <div className="flex-1 flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-primary/20 transition-all">
    <Search className="w-4 h-4 text-foreground/40 shrink-0" />
    
    <Input
      variant="ghost" // Use the ghost variant here
      type="text"
      placeholder="Search by name, origin, material…"
      value={filters.search}
      onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
      className="font-montserrat placeholder:text-foreground/40"
    />

    {filters.search && (
      <button 
        onClick={() => setFilters((f) => ({ ...f, search: "" }))}
        className="p-1 hover:bg-foreground/5 rounded-md transition-colors"
      >
        <X className="w-4 h-4 text-foreground/40 hover:text-foreground" />
      </button>
    )}
  </div>

        <motion.button whileTap={{ scale: 0.96 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 h-11 px-4 rounded-xl border font-montserrat text-sm font-medium transition-all duration-200 ${
            showFilters || activeCount > 0
              ? "bg-foreground text-background border-transparent"
              : "border-foreground/15 text-foreground hover:bg-foreground/5"
          }`}>
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && <span className="w-4 h-4 flex items-center justify-center rounded-full bg-background/25 text-xs font-bold">{activeCount}</span>}
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }} className="overflow-hidden">
            <div className="p-5 rounded-xl border border-foreground/10 bg-background space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[{ label: "Rarity", options: RARITIES, key: "rarity" as const }, { label: "Material", options: MATERIALS, key: "material" as const }].map(({ label, options, key }) => (
                  <div key={key} className="space-y-2.5">
                    <p className="text-xs tracking-[0.2em] uppercase font-montserrat font-medium text-foreground/50">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((o) => (
                        <button key={o} onClick={() => setFilters((f) => ({ ...f, [key]: f[key] === o ? "" : o }))} className={`px-3 py-1.5 rounded-lg text-xs font-montserrat font-medium transition-all duration-200 ${filters[key] === o ? "bg-foreground text-background" : "border border-foreground/15 text-foreground hover:bg-foreground/5"}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {activeCount > 0 && <button onClick={clearFilters} className="text-xs font-montserrat text-foreground/50 hover:text-foreground transition-colors underline underline-offset-2">Clear all filters</button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center items-center py-24"><Loader2 className="w-7 h-7 animate-spin text-foreground/40" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 space-y-3">
          <p className="font-playfair text-2xl text-foreground/40">No coins found</p>
          <p className="font-montserrat text-sm text-foreground/50">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="mt-2 text-sm font-montserrat font-semibold text-foreground underline underline-offset-2">Clear filters</button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {products.map((coin, i) => (
              <motion.div key={coin.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, delay: i * 0.04 }}>
                <ProductCard {...coin} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}