"use client";

import { AthryeBrandLink } from "@/components/brand/athrye-brand";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  Home,
  Coins,
  ShoppingCart,
  Heart,
  Package,
  LogIn,
  UserCircle2Icon,
} from "lucide-react";

const links = [
  { label: "Home", href: "/", icon: <Home className="w-5 h-5 text-primary" /> },
  { label: "Coin Catalog", href: "/products", icon: <Coins className="w-5 h-5 text-primary" /> },
  { label: "Shopping Cart", href: "/shopping-cart", icon: <ShoppingCart className="w-5 h-5 text-primary" /> },
  { label: "Favorites", href: "/favorites", icon: <Heart className="w-5 h-5 text-primary" /> },
  { label: "My Orders", href: "/orders", icon: <Package className="w-5 h-5 text-primary" /> },
  { label: "Profile", href: "/profile", icon: <UserCircle2Icon className="w-5 h-5 text-primary" /> },
  { label: "Login", href: "/auth/login", icon: <LogIn className="w-5 h-5 text-primary" /> },
];

export function SidebarWrapper() {
  return (
    <Sidebar>
      <SidebarBody>
        <div className="flex h-full flex-col gap-5">
          <div className="hidden md:flex justify-center pt-1">
            <AthryeBrandLink
              variant="symbol"
              size="sm"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-card/90 px-1.5 py-1.5 shadow-soft transition-colors hover:bg-secondary/80"
            />
          </div>

          {links.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}