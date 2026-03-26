import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .or(z.literal("")),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters")
    .or(z.literal("")),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters")
    .or(z.literal("")),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 4 characters")
    .max(10, "Postal code must be less than 10 characters")
    .or(z.literal("")),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be less than 50 characters")
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;