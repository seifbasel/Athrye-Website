import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="md:pl-[56px] px-6 md:px-8 py-8 border-t border-text-dark/8 dark:border-text/8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <p className="font-playfair text-base font-semibold text-text-dark dark:text-text">Coinat</p>
          <p className="font-montserrat text-xs text-text-dark/45 dark:text-text/45">
            © {year} Coinat. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-5 flex-wrap">
          {[
            { label: "Catalog", href: "/products" },
            { label: "About",   href: "/about" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms",   href: "/terms" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="font-montserrat text-xs text-text-dark/45 dark:text-text/45 hover:text-text-dark dark:hover:text-text transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}