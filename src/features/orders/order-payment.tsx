"use client";

import { CreditCard } from "lucide-react";

export function OrderPayment({ paymentLabel }: { paymentLabel: string }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-playfair text-base font-bold text-foreground">
          Payment
        </h3>
      </div>

      <p className="text-sm font-montserrat font-semibold text-foreground">
        {paymentLabel}
      </p>
    </div>
  );
}
