import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AthryeBrandVariant = "symbol" | "emblem" | "lockup";
type AthryeBrandTheme = "auto" | "light" | "dark";
type AthryeBrandSize = "sm" | "md" | "lg" | "xl";

const BRAND_ASSETS = {
  symbol: {
    src: "/brand/athrye-symbol.svg",
    alt: "Athrye symbol",
    width: 92,
    height: 100,
  },
  emblem: {
    src: "/brand/athrye-emblem.svg",
    alt: "Athrye emblem",
    width: 120,
    height: 120,
  },
  lightLockup: {
    src: "/brand/athrye-wordmark-light.svg",
    alt: "Athrye",
    width: 320,
    height: 68,
  },
  darkLockup: {
    src: "/brand/athrye-wordmark-dark.svg",
    alt: "Athrye",
    width: 264,
    height: 68,
  },
} as const;

const SIZE_CLASSNAMES: Record<AthryeBrandSize, Record<AthryeBrandVariant, string>> =
  {
    sm: {
      symbol: "h-8 w-auto",
      emblem: "h-10 w-auto",
      lockup: "h-7 w-auto",
    },
    md: {
      symbol: "h-10 w-auto",
      emblem: "h-14 w-auto",
      lockup: "h-9 w-auto",
    },
    lg: {
      symbol: "h-14 w-auto",
      emblem: "h-20 w-auto",
      lockup: "h-12 w-auto",
    },
    xl: {
      symbol: "h-18 w-auto",
      emblem: "h-28 w-auto",
      lockup: "h-16 w-auto",
    },
  };

function BrandImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}

export function AthryeBrand({
  variant = "lockup",
  theme = "auto",
  size = "md",
  className,
}: {
  variant?: AthryeBrandVariant;
  theme?: AthryeBrandTheme;
  size?: AthryeBrandSize;
  className?: string;
}) {
  const sizeClassName = SIZE_CLASSNAMES[size][variant];

  if (variant === "symbol") {
    return (
      <BrandImage
        {...BRAND_ASSETS.symbol}
        className={cn(sizeClassName, className)}
      />
    );
  }

  if (variant === "emblem") {
    return (
      <BrandImage
        {...BRAND_ASSETS.emblem}
        className={cn(sizeClassName, className)}
      />
    );
  }

  if (theme === "light") {
    return (
      <BrandImage
        {...BRAND_ASSETS.lightLockup}
        className={cn(sizeClassName, className)}
      />
    );
  }

  if (theme === "dark") {
    return (
      <BrandImage
        {...BRAND_ASSETS.darkLockup}
        className={cn(sizeClassName, className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <BrandImage
        {...BRAND_ASSETS.lightLockup}
        className={cn(sizeClassName, "dark:hidden")}
      />
      <BrandImage
        {...BRAND_ASSETS.darkLockup}
        className={cn(sizeClassName, "hidden dark:block")}
      />
    </span>
  );
}

export function AthryeBrandLink({
  variant = "lockup",
  theme = "auto",
  size = "md",
  href = "/",
  className,
}: {
  variant?: AthryeBrandVariant;
  theme?: AthryeBrandTheme;
  size?: AthryeBrandSize;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Athrye home"
      className={cn("inline-flex items-center", className)}
    >
      <AthryeBrand variant={variant} theme={theme} size={size} />
    </Link>
  );
}
