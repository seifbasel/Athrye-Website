import { OrderCardSkeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-1">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-text-dark/8 dark:bg-text/8" />
        <div className="h-4 w-20 animate-pulse rounded-lg bg-text-dark/6 dark:bg-text/6" />
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <OrderCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}