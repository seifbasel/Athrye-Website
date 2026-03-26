import Link from "next/link";
import { Coins } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Decorative number */}
        <div className="relative inline-block">
          <p className="text-[8rem] font-playfair font-bold leading-none text-text-dark/8 dark:text-text/8 select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-text-dark/6 dark:bg-text/6 flex items-center justify-center">
              <Coins className="w-8 h-8 text-text-dark/40 dark:text-text/40" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text">
            Page Not Found
          </h1>
          <p className="text-sm font-montserrat text-text-dark/55 dark:text-text/55 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Perhaps it was as rare as a 1933 Double Eagle.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="h-11 px-8 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark font-montserrat font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="h-11 px-8 rounded-xl border border-text-dark/12 dark:border-text/12 text-text-dark dark:text-text font-montserrat font-medium text-sm hover:bg-text-dark/4 dark:hover:bg-text/4 transition-colors inline-flex items-center"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}