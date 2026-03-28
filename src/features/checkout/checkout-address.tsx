"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ShippingAddress } from "@/types/order";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z
    .string()
    .min(10, "Valid phone number required")
    .regex(/^[0-9+\-\s()]+$/),
  address: z.string().min(5, "Street address required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(4, "Postal code required"),
  country: z.string().min(2, "Country required"),
});

type AddressForm = z.infer<typeof addressSchema>;

const inputCls = (hasError?: boolean) =>
  `h-12 w-full rounded-xl border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-ring ${
    hasError ? "border-red-400" : "border-border hover:border-primary/45"
  }`;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-montserrat font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-xs font-montserrat text-red-500">{error}</p>}
    </div>
  );
}

export function CheckoutAddress({
  defaultValues,
  onNext,
}: {
  defaultValues: Partial<ShippingAddress>;
  onNext: (data: ShippingAddress) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div>
        <h2 className="mb-1 font-playfair text-2xl font-bold text-foreground">
          Shipping Address
        </h2>
        <p className="text-sm font-montserrat text-muted-foreground">
          Where should we deliver your coins?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full Name" error={errors.fullName?.message}>
            <input
              {...register("fullName")}
              placeholder="James Sterling"
              className={inputCls(!!errors.fullName)}
            />
          </Field>
        </div>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            placeholder="+20 100 000 0000"
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Street Address" error={errors.address?.message}>
            <input
              {...register("address")}
              placeholder="15 Tahrir Square, Apt 4B"
              className={inputCls(!!errors.address)}
            />
          </Field>
        </div>
        <Field label="City" error={errors.city?.message}>
          <input
            {...register("city")}
            placeholder="Cairo"
            className={inputCls(!!errors.city)}
          />
        </Field>
        <Field label="Postal Code" error={errors.postalCode?.message}>
          <input
            {...register("postalCode")}
            placeholder="11511"
            className={inputCls(!!errors.postalCode)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Country" error={errors.country?.message}>
            <input
              {...register("country")}
              placeholder="Egypt"
              className={inputCls(!!errors.country)}
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="flex h-12 items-center gap-2 rounded-xl bg-button px-8 text-sm font-semibold text-text transition-opacity hover:opacity-90 dark:bg-button-dark dark:text-text-dark"
        >
          Continue to Payment <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </form>
  );
}
