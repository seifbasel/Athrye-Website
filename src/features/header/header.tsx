"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, ChevronDown, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  // Don't render auth UI during SSR hydration
  if (isLoading)
    return (
      <header className="sticky top-0 z-20 w-full px-6 md:px-8 md:pl-19 py-4 h-15 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-text-dark/8 dark:border-text/8" />
    );

  return (
    <header className="sticky top-0 z-20 w-full px-6 md:px-8 md:pl-19 py-4 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-text-dark/8 dark:border-text/8">
      <div className="flex items-center justify-end">
        {isAuthenticated && user ? (
          /* Authenticated — user menu */
          <div className="relative" ref={menuRef}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-text-dark/6 dark:hover:bg-text/6 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-button dark:bg-button-dark flex items-center justify-center shrink-0">
                <span className="text-xs font-montserrat font-bold text-text dark:text-text-dark uppercase">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-montserrat font-medium text-text-dark dark:text-text">
                {user.firstName}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-text-dark/40 dark:text-text/40 transition-transform duration-200",
                  menuOpen && "rotate-180",
                )}
              />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-text-dark/10 dark:border-text/10 bg-background dark:bg-background-dark shadow-lg shadow-text-dark/10 dark:shadow-text/5 overflow-hidden"
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-text-dark/8 dark:border-text/8">
                    <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    <MenuButton
                      icon={<Settings className="w-3.5 h-3.5" />}
                      label="Profile Settings"
                      onClick={() => {
                        router.push("/profile");
                        setMenuOpen(false);
                      }}
                    />
                    <div className="mx-3 my-1 h-px bg-text-dark/8 dark:bg-text/8" />
                    <MenuButton
                      icon={<LogOut className="w-3.5 h-3.5" />}
                      label="Sign Out"
                      onClick={handleLogout}
                      danger
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Not authenticated */
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/auth/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-montserrat font-medium text-text-dark dark:text-text hover:bg-text-dark/6 dark:hover:bg-text/6 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/auth/signup")}
              className="px-4 py-2 rounded-xl bg-button dark:bg-button-dark text-text dark:text-text-dark text-sm font-montserrat font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-montserrat transition-colors",
        danger
          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          : "text-text-dark dark:text-text hover:bg-text-dark/5 dark:hover:bg-text/5",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

// cn inline since this is a standalone file
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
