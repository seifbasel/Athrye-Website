"use client";

import React from "react";
import { MapPin, CreditCard, ClipboardList, CheckCircle2 } from "lucide-react";
import { CheckoutStep } from "@/types/order";
import { cn } from "@/lib/utils";

const STEPS: { key: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { key: "address", label: "Address", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: ClipboardList },
  { key: "confirmation", label: "Done", icon: CheckCircle2 },
];

export function CheckoutStepIndicator({ current }: { current: CheckoutStep }) {
  const currentIdx = STEPS.findIndex((step) => step.key === current);

  return (
    <div className="mb-10 flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const done = index < currentIdx;
        const active = index === currentIdx;
        const Icon = step.icon;

        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                  done
                    ? "bg-button dark:bg-button-dark"
                    : active
                      ? "bg-button ring-4 ring-primary/20 dark:bg-button-dark dark:ring-button-dark/20"
                      : "bg-secondary"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    done || active ? "text-text dark:text-text-dark" : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "hidden text-xs font-montserrat transition-colors duration-300 sm:block",
                  active
                    ? "font-semibold text-foreground"
                    : done
                      ? "text-foreground/70"
                      : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 mb-4 h-px w-12 transition-colors duration-500 sm:w-20",
                  index < currentIdx ? "bg-button dark:bg-button-dark" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
