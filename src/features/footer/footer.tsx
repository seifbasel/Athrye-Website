import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  companyName?: string;
  year?: number;
  links?: FooterLink[];
}

export function Footer({
  companyName = "Coinat",
  year = new Date().getFullYear(),
}: FooterProps) {
  return (
    <div className="flex flex-col items-center md:items-start gap-4">
      <div className="font-playfair text-lg text-text dark:text-text-dark">
        {companyName}
      </div>
      <p className="font-montserrat text-sm p-10 text-text/80 dark:text-text-dark/80">
        © {year} {companyName}. All rights reserved.
      </p>
    </div>
  );
}
