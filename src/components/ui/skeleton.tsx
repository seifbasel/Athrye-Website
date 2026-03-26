"use client";

import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-foreground/10", // Using foreground with low opacity for a neutral shimmer
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="w-full bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm shadow-foreground/5">
      <Skeleton className="aspect-4/3 rounded-none" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-3.5 w-full" />
          ))}
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-background border border-border/50 shadow-sm shadow-foreground/5 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-lg" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="w-11 h-11 rounded-lg border-2 border-background" />
          ))}
        </div>
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-28" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="flex gap-3">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
          </div>
          <div className="h-px bg-border/50" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
          <div className="h-px bg-border/50" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="flex-1 h-12 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;