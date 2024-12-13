"use client";
// app/profile/page.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileFormData, profileSchema } from "./schema/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text mb-2">
          Profile Settings
        </h1>
        <p className="text-text-dark/70 dark:text-text/70">
          Update your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              First Name
            </label>
            <Input
              {...register("firstName")}
              placeholder="Enter your first name"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Last Name
            </label>
            <Input
              {...register("lastName")}
              placeholder="Enter your last name"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Phone Number
            </label>
            <Input
              {...register("phoneNumber")}
              placeholder="Enter your phone number"
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Address
            </label>
            <Input
              {...register("address")}
              placeholder="Enter your address"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              City
            </label>
            <Input
              {...register("city")}
              placeholder="Enter your city"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Postal Code
            </label>
            <Input
              {...register("postalCode")}
              placeholder="Enter your postal code"
              className={errors.postalCode ? "border-red-500" : ""}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-dark dark:text-text">
              Country
            </label>
            <Input
              {...register("country")}
              placeholder="Enter your country"
              className={errors.country ? "border-red-500" : ""}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
