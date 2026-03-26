"use client";

import { SidebarLink } from "@/components/ui/sidebar";
import { LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context"; // your auth context
import { useRouter } from "next/navigation";

export function SidebarUserSection() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const links = isAuthenticated
    ? [
        {
          label: "Profile",
          href: "/profile",
          icon: <User className="w-5 h-5 text-primary" />,
        },
        {
          label: "Sign Out",
          href: "#",
          icon: <LogOut className="w-5 h-5 text-primary" />,
          onClick: () => {
            logout();
            router.push("/");
          },
        },
      ]
    : [
        {
          label: "Sign In",
          href: "/auth/login",
          icon: <LogIn className="w-5 h-5 text-primary" />,
        },
        {
          label: "Get Started",
          href: "/auth/signup",
          icon: <User className="w-5 h-5 text-primary" />,
        },
      ];

  return (
    <div className="flex flex-col gap-1 mt-4 border-t border-border pt-3">
      {links.map((link) => (
        <div key={link.href} onClick={link.onClick}>
          <SidebarLink
            link={{
              label: link.label,
              href: link.href,
              icon: link.icon,
            }}
          />
        </div>
      ))}
    </div>
  );
}