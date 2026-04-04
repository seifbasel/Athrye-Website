"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "At least 2 characters"),
    lastName: z.string().min(2, "At least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="flex gap-4 pt-1"
    >
      {checks.map(({ label, pass }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors duration-300 ${
              pass ? "bg-green-500" : "bg-border"
            }`}
          >
            {pass && <Check className="h-2 w-2 text-white" />}
          </div>
          <span
            className={`text-xs font-montserrat transition-colors duration-300 ${
              pass
                ? "text-green-600 dark:text-green-400"
                : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

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
      <label className="block text-xs font-montserrat font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-montserrat text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `h-12 w-full rounded-xl border px-4 text-sm ${
    hasError ? "border-red-400" : "border-border hover:border-primary/45"
  }`;

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5 fill-foreground" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle, loginWithApple } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(
    null,
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const password = watch("password", "");

  const onSubmit = async (data: SignupForm) => {
    setServerError(null);
    try {
      await signup(data);
      router.push("/");
    } catch (error: unknown) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    }
  };

  const handleGoogle = async () => {
    setSocialLoading("google");
    try {
      await loginWithGoogle("mock-google-token");
      router.push("/");
    } catch {
      setServerError("Google sign-up failed.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleApple = async () => {
    setSocialLoading("apple");
    try {
      await loginWithApple("mock-code", "mock-token");
      router.push("/");
    } catch {
      setServerError("Apple sign-up failed.");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-xs font-montserrat uppercase tracking-[0.25em] text-muted-foreground"
          >
            Join Athrye
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-playfair text-4xl font-bold text-foreground"
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm font-montserrat text-muted-foreground"
          >
            Start building your collection today
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 space-y-3"
        >
          {[
            {
              id: "google" as const,
              label: "Continue with Google",
              icon: <GoogleIcon />,
              handler: handleGoogle,
            },
            {
              id: "apple" as const,
              label: "Continue with Apple",
              icon: <AppleIcon />,
              handler: handleApple,
            },
          ].map(({ id, label, icon, handler }) => (
            <motion.button
              key={id}
              type="button"
              onClick={handler}
              disabled={!!socialLoading}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary/80 disabled:opacity-50"
            >
              {socialLoading === id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                icon
              )}
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-border/70" />
          <span className="text-xs font-montserrat uppercase tracking-widest text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-border/70" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
              <Input
                {...register("firstName")}
                placeholder="James"
                className={inputClass(!!errors.firstName)}
              />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <Input
                {...register("lastName")}
                placeholder="Sterling"
                className={inputClass(!!errors.lastName)}
              />
            </Field>
          </div>

          <Field label="Email" error={errors.email?.message}>
            <Input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              className={inputClass(!!errors.email)}
            />
          </Field>

          <Field label="Password" error={errors.password?.message}>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                className={`${inputClass(!!errors.password)} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <PasswordStrength password={password} />
          </Field>

          <Field
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={`${inputClass(!!errors.confirmPassword)} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20"
              >
                <p className="text-sm font-montserrat text-red-600 dark:text-red-400">
                  {serverError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs font-montserrat text-muted-foreground">
            By creating an account you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </p>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-button font-montserrat text-sm font-semibold tracking-wide text-text transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 dark:bg-button-dark dark:text-text-dark"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Creating account..." : "Create Account"}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm font-montserrat text-muted-foreground"
        >
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
