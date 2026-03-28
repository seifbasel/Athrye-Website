"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-playfair font-bold text-text-dark dark:text-text">
            Something went wrong
          </h2>
          <p className="text-sm font-montserrat text-text-dark/60 dark:text-text/60">
            An unexpected error occurred. Please try again or return to the
            homepage.
          </p>
          {error.digest && (
            <p className="text-xs font-montserrat text-text-dark/35 dark:text-text/35 mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={reset}
            className="flex items-center gap-2 h-11 px-6 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 h-11 px-6 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 dark:hover:bg-text/4 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
