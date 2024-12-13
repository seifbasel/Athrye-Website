"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
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
  undefined
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
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
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
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <motion.div
        className={cn(
          "fixed left-0 top-0 h-screen px-4 py-4 hidden md:flex md:flex-col bg-background dark:bg-background-dark w-[300px] flex-shrink-0 z-30",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        <motion.div className="flex flex-col h-full">
          <motion.div className="flex-grow">
            <motion.div>{children}</motion.div>
          </motion.div>
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 py-2 cursor-pointer mt-auto"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-background" />
            ) : (
              <Moon className="w-5 h-5 text-background-dark" />
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
              className="text-background-dark dark:text-background text-2xl whitespace-pre"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
      <div
        className={cn(
          "hidden md:block flex-shrink-0",
          animate ? (open ? "w-[300px]" : "w-[60px]") : "w-[300px]"
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 h-16 px-4 bg-background dark:bg-background-dark flex flex-row md:hidden items-center justify-between w-full z-30"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-foreground dark:text-foreground-dark"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-background dark:bg-background-dark p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-primary-foreground dark:text-primary"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              <div className="flex-grow">{children}</div>
              <div
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 py-2 cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-text" />
                ) : (
                  <Moon className="w-5 h-5 text-text-dark" />
                )}
                <span className="text-background-dark dark:text-background text-xl">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-16 md:hidden" />
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-text-dark dark:text-text text-xl group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
