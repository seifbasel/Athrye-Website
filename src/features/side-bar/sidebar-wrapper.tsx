"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Home, Coins, ShoppingCart, User, Info, Atom, Heart, Package } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";

export function SidebarWrapper() {
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();

  const links = [
    {
      label: "Coinat",
      href: "#",
      icon: <Atom className="h-6 w-6 text-primary-foreground dark:text-primary" />,
    },
    {
      label: "Home",
      href: "/",
      icon: <Home className="w-5 h-5 text-primary-foreground dark:text-primary" />,
    },
    {
      label: "Coin Catalog",
      href: "/products",
      icon: <Coins className="w-5 h-5 text-primary-foreground dark:text-primary" />,
    },
    {
      label: "Shopping Cart",
      href: "/shopping-cart",
      icon: <ShoppingCart className="w-5 h-5 text-primary-foreground dark:text-primary" />,
      badge: cartCount,
    },
    {
      label: "Favorites",
      href: "/favorites",
      icon: <Heart className="w-5 h-5 text-primary-foreground dark:text-primary" />,
      badge: favCount,
    },
    {
      label: "My Orders",
      href: "/orders",
      icon: <Package className="w-5 h-5 text-primary-foreground dark:text-primary" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="w-5 h-5 text-primary-foreground dark:text-primary" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="w-5 h-5 text-primary-foreground dark:text-primary" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarBody>
        <div className="flex flex-col gap-1">
          {links.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}