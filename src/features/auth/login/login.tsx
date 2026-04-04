"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MOCK_LOGIN_USER } from "@/mocks/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

function SocialButton({
  onClick,
  isLoading,
  children,
}: {
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      whileTap={{ scale: 0.98 }}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary/80 disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </motion.button>
  );
}

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

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(
    null,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (data.email !== MOCK_LOGIN_USER.user.email) {
        throw new Error("Mock login failed. Use collector@athrye.com.");
      }

      setLoggedInEmail(data.email);
      router.push("/");
    } catch (error: unknown) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleGoogle = async () => {
    setSocialLoading("google");
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setLoggedInEmail(MOCK_LOGIN_USER.user.email);
      router.push("/");
    } catch {
      setServerError("Google sign-in failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleApple = async () => {
    setSocialLoading("apple");
    setServerError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setLoggedInEmail(MOCK_LOGIN_USER.user.email);
      router.push("/");
    } catch {
      setServerError("Apple sign-in failed. Please try again.");
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
            Welcome back
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-playfair text-4xl font-bold text-foreground"
          >
            Sign In
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm font-montserrat text-muted-foreground"
          >
            Access your collection and orders
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 space-y-3"
        >
          <SocialButton
            onClick={handleGoogle}
            isLoading={socialLoading === "google"}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </SocialButton>
          <SocialButton
            onClick={handleApple}
            isLoading={socialLoading === "apple"}
          >
            <AppleIcon />
            <span>Continue with Apple</span>
          </SocialButton>
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
          <div className="space-y-1.5">
            <label className="block text-xs font-montserrat font-medium uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="collector@athrye.com"
              className={`h-12 w-full rounded-xl border px-4 text-sm ${
                errors.email
                  ? "border-red-400"
                  : "border-border hover:border-primary/45"
              }`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-0.5 text-xs font-montserrat text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-montserrat font-medium uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-montserrat text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="mockpass"
                className={`h-12 w-full rounded-xl border px-4 pr-11 text-sm ${
                  errors.password
                    ? "border-red-400"
                    : "border-border hover:border-primary/45"
                }`}
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
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-0.5 text-xs font-montserrat text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

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

          {loggedInEmail && (
            <div className="rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-sm font-montserrat text-muted-foreground">
                Mock session ready for {loggedInEmail}
              </p>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-button font-montserrat text-sm font-semibold tracking-wide text-text transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 dark:bg-button-dark dark:text-text-dark"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Sign In"}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm font-montserrat text-muted-foreground"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-foreground underline-offset-2 transition-colors hover:underline"
          >
            Create one
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
