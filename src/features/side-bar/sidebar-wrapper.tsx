"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  Home,
  Coins,
  ShoppingCart,
  User,
  Info,
  Atom,
  Heart,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Coinat",
    href: "#",
    icon: (
      <Atom className="h-10 w-10 text-primary-foreground dark:text-primary " />
    ),
  },
  {
    label: "Home",
    href: "/",
    icon: (
      <Home className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
  {
    label: "Coin Catalog",
    href: "/products",
    icon: (
      <Coins className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
  {
    label: "Shopping Cart",
    href: "/shopping-cart",
    icon: (
      <ShoppingCart className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: (
      <Heart className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <User className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
  {
    label: "About",
    href: "/about",
    icon: (
      <Info className="w-5 h-5 text-primary-foreground dark:text-primary" />
    ),
  },
];

export function SidebarWrapper() {
  return (
    <Sidebar>
      <SidebarBody>
        <div className="flex flex-col gap-5">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
