"use client";

import { AthryeBrandLink } from "@/components/brand/athrye-brand";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <motion.div
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen shrink-0 border-r border-border/70 bg-card/86 px-3 py-4 backdrop-blur-xl md:flex md:flex-col",
          className,
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        <motion.div className="flex h-full flex-col">
          <motion.div className="grow">
            <motion.div>{children}</motion.div>
          </motion.div>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="mt-auto flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-3 py-3 transition-colors hover:bg-secondary/70"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
            <motion.span
              animate={{
                display: animate
                  ? open
                    ? "inline-block"
                    : "none"
                  : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="whitespace-pre text-sm font-semibold text-foreground"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </motion.span>
          </button>
        </motion.div>
      </motion.div>

      <div
        className={cn(
          "hidden shrink-0 md:block",
          animate ? (open ? "w-75" : "w-15") : "w-75",
        )}
      />
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-30 flex h-16 w-full flex-row items-center justify-between border-b border-border/60 bg-background/92 px-4 backdrop-blur-md md:hidden",
        )}
        {...props}
      >
        <div className="z-20 flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-card text-foreground shadow-soft"
          >
            <Menu className="text-foreground" />
          </button>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-card text-foreground shadow-soft"
          >
            {darkMode ? (
              <Sun className="h-4.5 w-4.5 text-primary" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ zIndex: 9998 }}
                  className="fixed inset-0 bg-black/45 md:hidden"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ backgroundColor: "var(--card)", zIndex: 9999 }}
                  className={cn(
                    "fixed inset-y-0 left-0 flex h-full w-full max-w-full flex-col justify-between border-r border-border p-8 shadow-elevated md:hidden",
                    className,
                  )}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <AthryeBrandLink variant="lockup" size="md" className="max-w-40" />
                    <button
                      type="button"
                      aria-label="Close navigation"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background text-primary"
                      onClick={() => setOpen(false)}
                    >
                      <X />
                    </button>
                  </div>

                  <div className="grow">{children}</div>

                  <button
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3"
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-foreground" />
                    ) : (
                      <Moon className="h-5 w-5 text-foreground" />
                    )}
                    <span className="text-base font-semibold text-foreground">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <div className="h-16 md:hidden" />
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  props?: LinkProps;
}) => {
  const { open, animate, setOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      setOpen(false);
    }
    onClick?.(e);
  };

  return (
    <Link
      href={link.href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-3 rounded-2xl px-2 py-3 text-sm transition-colors hover:bg-secondary/72",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <motion.span
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex h-5 w-5  shrink-0 items-center justify-center"
      >
        {link.icon}
      </motion.span>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="inline-block whitespace-pre p-0! m-0! text-sm font-medium text-foreground transition duration-150 group-hover/sidebar:translate-x-1"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
