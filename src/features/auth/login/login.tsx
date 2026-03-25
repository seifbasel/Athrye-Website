"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Social Button ────────────────────────────────────────────────────────────

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
      className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-text-dark/15 dark:border-text/15 bg-background dark:bg-background-dark text-sm font-medium font-montserrat text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5 transition-colors duration-200 disabled:opacity-50"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </motion.button>
  );
}

// ─── Google Icon ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ─── Apple Icon ───────────────────────────────────────────────────────────────

function AppleIcon() {
  return (
    <svg className="w-5 h-5 fill-text-dark dark:fill-text" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithApple } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      await login(data);
      router.push("/");
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleGoogle = async () => {
    setSocialLoading("google");
    try {
      // TODO: Integrate Google OAuth SDK — get idToken from Google Sign-In popup
      // const { credential } = await google.accounts.id.prompt();
      // await loginWithGoogle(credential);
      await loginWithGoogle("mock-google-token");
      router.push("/");
    } catch {
      setServerError("Google sign-in failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleApple = async () => {
    setSocialLoading("apple");
    try {
      // TODO: Integrate Apple Sign In SDK
      // const response = await AppleID.auth.signIn();
      // await loginWithApple(response.authorization.code, response.authorization.id_token);
      await loginWithApple("mock-apple-code", "mock-apple-token");
      router.push("/");
    } catch {
      setServerError("Apple sign-in failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs tracking-[0.25em] uppercase font-montserrat text-text-dark/50 dark:text-text/50 mb-3"
          >
            Welcome back
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl font-playfair font-bold text-text-dark dark:text-text"
          >
            Sign In
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm font-montserrat text-text-dark/60 dark:text-text/60"
          >
            Access your collection and orders
          </motion.p>
        </div>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3 mb-8"
        >
          <SocialButton onClick={handleGoogle} isLoading={socialLoading === "google"}>
            <GoogleIcon />
            <span>Continue with Google</span>
          </SocialButton>
          <SocialButton onClick={handleApple} isLoading={socialLoading === "apple"}>
            <AppleIcon />
            <span>Continue with Apple</span>
          </SocialButton>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex-1 h-px bg-text-dark/10 dark:bg-text/10" />
          <span className="text-xs font-montserrat text-text-dark/40 dark:text-text/40 tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-text-dark/10 dark:bg-text/10" />
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs tracking-widest uppercase font-montserrat font-medium text-text-dark/60 dark:text-text/60">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              className={`w-full h-12 px-4 rounded-xl border bg-background dark:bg-background-dark font-montserrat text-sm text-text-dark dark:text-text placeholder:text-text-dark/30 dark:placeholder:text-text/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-text-dark/20 dark:focus:ring-text/20 ${
                errors.email
                  ? "border-red-400"
                  : "border-text-dark/15 dark:border-text/15 hover:border-text-dark/30 dark:hover:border-text/30"
              }`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-montserrat pt-0.5"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs tracking-widest uppercase font-montserrat font-medium text-text-dark/60 dark:text-text/60">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 hover:text-text-dark dark:hover:text-text transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full h-12 px-4 pr-11 rounded-xl border bg-background dark:bg-background-dark font-montserrat text-sm text-text-dark dark:text-text placeholder:text-text-dark/30 dark:placeholder:text-text/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-text-dark/20 dark:focus:ring-text/20 ${
                  errors.password
                    ? "border-red-400"
                    : "border-text-dark/15 dark:border-text/15 hover:border-text-dark/30 dark:hover:border-text/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-dark/40 dark:text-text/40 hover:text-text-dark dark:hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs font-montserrat pt-0.5"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Server Error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <p className="text-red-600 dark:text-red-400 text-sm font-montserrat">{serverError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm tracking-wide transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Signing in…" : "Sign In"}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm font-montserrat text-text-dark/60 dark:text-text/60"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-text-dark dark:text-text font-medium hover:underline underline-offset-2 transition-colors"
          >
            Create one
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}