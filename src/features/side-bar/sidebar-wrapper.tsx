"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  Home,
  Coins,
  ShoppingCart,
  Info,
  Atom,
  Heart,
  Package,
  User,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { SidebarUserSection } from "./sidebar-user-section";

export function SidebarWrapper() {
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();

  const links = [
    {
      label: "Coinat",
      href: "#",
      icon: <Atom className="h-6 w-6 text-primary" />,
    },
    {
      label: "Home",
      href: "/",
      icon: <Home className="w-5 h-5 text-primary" />,
    },
    {
      label: "Coin Catalog",
      href: "/products",
      icon: <Coins className="w-5 h-5 text-primary" />,
    },
    {
      label: "Shopping Cart",
      href: "/shopping-cart",
      icon: <ShoppingCart className="w-5 h-5 text-primary" />,
      badge: cartCount,
    },
    {
      label: "Favorites",
      href: "/favorites",
      icon: <Heart className="w-5 h-5 text-primary" />,
      badge: favCount,
    },
    {
      label: "My Orders",
      href: "/orders",
      icon: <Package className="w-5 h-5 text-primary" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarBody>
        <div className="flex flex-col h-full justify-between">
          {/* Main Links */}
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>

          {/* User Section */}
          <SidebarUserSection />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}