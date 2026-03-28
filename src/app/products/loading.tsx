import { ProductCardSkeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-text-dark/8 dark:bg-text/8" />
        <div className="h-4 w-28 animate-pulse rounded-lg bg-text-dark/6 dark:bg-text/6" />
      </div>
      <div className="flex gap-3">
        <div className="flex-1 h-11 animate-pulse rounded-xl bg-text-dark/6 dark:bg-text/6" />
        <div className="w-24 h-11 animate-pulse rounded-xl bg-text-dark/6 dark:bg-text/6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
