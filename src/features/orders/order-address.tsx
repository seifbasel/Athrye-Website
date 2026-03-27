"use client";

import { MapPin } from "lucide-react";
import { ShippingAddress } from "@/types/order";

export function OrderAddress({ address }: { address: ShippingAddress }) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-playfair text-base font-bold text-foreground">
          Delivery Address
        </h3>
      </div>

      <div className="space-y-0.5 text-sm font-montserrat">
        <p className="font-semibold text-foreground">{address.fullName}</p>
        <p className="text-muted-foreground">{address.phone}</p>
        <p className="text-muted-foreground">{address.address}</p>
        <p className="text-muted-foreground">
          {address.city}, {address.postalCode}
        </p>
        <p className="text-muted-foreground">{address.country}</p>
      </div>
    </div>
  );
}
