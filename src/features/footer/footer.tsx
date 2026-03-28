import Link from "next/link";
import { Atom, Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { label: "Catalog", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto flex w-full max-w-360 flex-col gap-6">
      <div className="rounded-[1.75rem] border border-border/80 bg-background/70 p-5 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-card px-3 py-2 shadow-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Atom className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-playfair text-lg font-bold text-foreground">
                  Coinat
                </p>
                <p className="text-[11px] font-montserrat uppercase tracking-[0.24em] text-muted-foreground">
                  Numismatic Marketplace
                </p>
              </div>
            </div>

            <p className="text-sm font-montserrat leading-relaxed text-muted-foreground">
              A curated home for authenticated coins, collector-grade history,
              and modern numismatic discovery.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:min-w-136">
            <nav className="flex flex-wrap gap-3">
              {footerLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-border/70 bg-card px-4 py-2 text-sm font-montserrat font-medium text-foreground transition-colors hover:bg-secondary/80 hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/75 bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/80 hover:text-primary"
                >
                  <Icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border/70 mt-4 pt-4 text-xs font-montserrat text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {year} Coinat. All rights reserved.</p>
          <p>
            Authenticated pieces. Transparent provenance. Collector-first
            experience.
          </p>
        </div>
      </div>
    </div>
  );
}
