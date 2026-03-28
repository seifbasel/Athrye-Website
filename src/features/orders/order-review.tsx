"use client";

export function OrderReview({
  subtotal,
  total,
}: {
  subtotal: number;
  total: number;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h3 className="font-playfair text-base font-bold text-foreground">
        Order Total
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-montserrat text-muted-foreground">
            Subtotal
          </span>
          <span className="text-sm font-montserrat font-medium text-foreground">
            {subtotal.toLocaleString()} EGP
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-montserrat text-muted-foreground">
            Shipping
          </span>
          <span className="text-sm font-montserrat font-medium text-green-600 dark:text-green-400">
            Free
          </span>
        </div>
      </div>

      <div className="h-px bg-border/70" />

      <div className="flex justify-between">
        <span className="font-montserrat font-semibold text-foreground">
          Total
        </span>
        <span className="font-playfair text-xl font-bold text-foreground">
          {total.toLocaleString()}{" "}
          <span className="text-xs font-montserrat font-normal text-muted-foreground">
            EGP
          </span>
        </span>
      </div>
    </div>
  );
}
