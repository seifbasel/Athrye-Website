"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/auth-context";
import { motion } from "motion/react";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  firstName:   z.string().min(2, "At least 2 characters").max(50),
  lastName:    z.string().min(2, "At least 2 characters").max(50),
  email:       z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone number").min(10).max(15).or(z.literal("")),
  address:     z.string().min(5).max(100).or(z.literal("")),
  city:        z.string().min(2).max(50).or(z.literal("")),
  postalCode:  z.string().min(4).max(10).or(z.literal("")),
  country:     z.string().min(2).max(50).or(z.literal("")),
});
type ProfileForm = z.infer<typeof profileSchema>;

const inputCls = (err?: boolean) =>
  `w-full h-12 px-4 rounded-xl border bg-background dark:bg-background-dark font-montserrat text-sm text-text-dark dark:text-text placeholder:text-text-dark/30 dark:placeholder:text-text/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-text-dark/12 dark:focus:ring-text/12 ${
    err ? "border-red-400" : "border-text-dark/12 dark:border-text/12 hover:border-text-dark/25 dark:hover:border-text/25"
  }`;

function Field({ label, error, children }: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs tracking-[0.18em] uppercase font-montserrat font-medium text-text-dark/55 dark:text-text/55">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs font-montserrat">{error}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName:   user?.firstName ?? "",
      lastName:    user?.lastName  ?? "",
      email:       user?.email     ?? "",
      phoneNumber: "",
      address:     "",
      city:        "",
      postalCode:  "",
      country:     "",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    // TODO: PATCH /api/auth/profile/ with data
    await new Promise((r) => setTimeout(r, 900));
    console.log("Profile update payload:", data);
  };

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "?";

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-button dark:bg-button-dark flex items-center justify-center shrink-0">
            {user ? (
              <span className="text-xl font-playfair font-bold text-text dark:text-text-dark uppercase">
                {initials}
              </span>
            ) : (
              <User className="w-7 h-7 text-text dark:text-text-dark" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text">
              {user ? `${user.firstName} ${user.lastName}` : "Profile Settings"}
            </h1>
            {user && (
              <p className="font-montserrat text-sm text-text-dark/55 dark:text-text/55 mt-0.5">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <div className="h-px bg-text-dark/8 dark:bg-text/8" />
      </motion.div>

      {/* Form */}
      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Personal Info */}
        <div className="space-y-5">
          <p className="text-xs tracking-[0.25em] uppercase font-montserrat font-semibold text-text-dark/45 dark:text-text/45">
            Personal Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="First Name" error={errors.firstName?.message}>
              <input {...register("firstName")} placeholder="James" className={inputCls(!!errors.firstName)} />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <input {...register("lastName")} placeholder="Sterling" className={inputCls(!!errors.lastName)} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="your@email.com"
                className={inputCls(!!errors.email)} />
            </Field>
            <Field label="Phone Number" error={errors.phoneNumber?.message}>
              <input {...register("phoneNumber")} placeholder="+20 100 000 0000"
                className={inputCls(!!errors.phoneNumber)} />
            </Field>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-5">
          <p className="text-xs tracking-[0.25em] uppercase font-montserrat font-semibold text-text-dark/45 dark:text-text/45">
            Shipping Address
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Field label="Street Address" error={errors.address?.message}>
                <input {...register("address")} placeholder="123 Collector's Lane"
                  className={inputCls(!!errors.address)} />
              </Field>
            </div>
            <Field label="City" error={errors.city?.message}>
              <input {...register("city")} placeholder="Cairo" className={inputCls(!!errors.city)} />
            </Field>
            <Field label="Postal Code" error={errors.postalCode?.message}>
              <input {...register("postalCode")} placeholder="11511" className={inputCls(!!errors.postalCode)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Country" error={errors.country?.message}>
                <input {...register("country")} placeholder="Egypt" className={inputCls(!!errors.country)} />
              </Field>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-3 pt-2">
          <Button type="button" variant="outline"
            onClick={() => window.history.back()}
            className="font-montserrat font-medium text-sm">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}
            className="font-montserrat font-semibold text-sm min-w-[140px] flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}