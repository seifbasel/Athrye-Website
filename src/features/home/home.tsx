"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock3,
  Globe2,
  Globe,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Diamond,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_FEATURES = [
  { text: "Authenticated Assets", icon: ShieldCheck },
  { text: "Global Collectors", icon: Globe },
  { text: "Verified Provenance", icon: BadgeCheck },
  { text: "Premium Marketplace", icon: Diamond },
];

const MARQUEE_ITEMS = [
  ...TRUST_FEATURES,
  ...TRUST_FEATURES,
  ...TRUST_FEATURES,
  ...TRUST_FEATURES,
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "Verified Provenance",
    sub: "Every coin undergoes rigorous authentication and historical validation.",
  },
  {
    icon: Award,
    label: "Expert Graded",
    sub: "Museum-quality presentation driven by strict PCGS & NGC standards.",
  },
  {
    icon: Globe2,
    label: "Global Catalog",
    sub: "Curated acquisitions spanning over 3,000 years of human civilization.",
  },
];

const COLLECTIONS = [
  {
    era: "Roman Empire",
    year: "27 BC – 476 AD",
    significance: "Portrait-led denarii & imperial icons",
    image: "/coin1.jpg",
  },
  {
    era: "Greek City-States",
    year: "600 BC – 146 BC",
    significance: "Sculptural owls & artistic mastery",
    image: "/coin1.jpg",
  },
  {
    era: "Royal Europe",
    year: "1485 – 1910",
    significance: "Ceremonial crowns & precious metals",
    image: "/coin1.jpg",
  },
];

const easeOutQuint: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[60vw] max-h-[600px] w-[60vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOutQuint }}
          className="mx-auto max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutQuint }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              The Premier Numismatic Gallery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutQuint }}
            className="font-playfair text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Own a Piece of <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">
              Living History
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOutQuint }}
            className="mx-auto mb-10 mt-8 max-w-2xl font-montserrat text-base leading-relaxed text-foreground/80 sm:text-lg md:text-xl"
          >
            A curated gallery of authenticated numismatic treasures—where
            ancient empires, artistic mastery, and scarcity meet modern
            collecting excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeOutQuint }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => router.push("/products")}
              size="lg"
              className="group relative h-14 w-full overflow-hidden bg-primary px-8 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 scale-x-0 bg-white/20 transition-transform duration-500 group-hover:scale-x-100" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/about")}
              className="h-14 w-full border-border/60 text-foreground  px-8 font-montserrat text-[15px] font-semibold transition-all hover:bg-card/50 sm:w-auto"
            >
              Discover Our Story
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* PREMIUM TRUST STRIP */}
      <section className="relative overflow-hidden border-y border-border/80 bg-transparent py-10 sm:py-14">
        {" "}
        <div className="mx-auto w-full max-w-[100vw] px-4 sm:px-6 lg:px-8">
          <div
            className="relative flex w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <motion.div
              className="flex shrink-0 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {MARQUEE_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center">
                    <div className="group flex cursor-pointer items-center gap-3 px-8 transition-all duration-500 hover:text-foreground sm:px-12">
                      <Icon
                        strokeWidth={2}
                        className="h-5 w-5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-foreground group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] sm:h-6 sm:w-6"
                      />
                      <span className="whitespace-nowrap font-montserrat text-[12px] font-semibold uppercase tracking-[0.25em] text-foreground/80 transition-colors duration-500 group-hover:text-foreground sm:text-xs">
                        {item.text}
                      </span>
                    </div>
                    <span className="text-foreground/20">✦</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CURATED COLLECTIONS */}
        <section className="py-24 sm:py-32">
          <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-playfair text-4xl font-bold text-foreground sm:text-5xl"
              >
                Curated Collections
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-3 font-montserrat text-base text-foreground/60"
              >
                Hand-selected eras from the annals of history
              </motion.p>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => router.push("/products")}
              className="group flex items-center gap-2 font-montserrat text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              View all collections
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((coin, idx) => (
              <motion.div
                key={coin.era}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease: easeOutQuint,
                }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => router.push("/products")}
                className={`group relative cursor-pointer overflow-hidden rounded-[2rem] border border-border/40 bg-card shadow-soft transition-all hover:border-primary/40 hover:shadow-elevated sm:min-h-[400px] ${
                  idx === 0
                    ? "sm:col-span-2 sm:row-span-2 lg:min-h-[500px]"
                    : "min-h-[300px]"
                }`}
              >
                <Image
                  src={coin.image}
                  alt={coin.era}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">
                  <h3 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
                    {coin.era}
                  </h3>
                  <p className="mt-2 font-montserrat text-xs font-semibold uppercase tracking-widest text-primary">
                    {coin.year}
                  </p>
                  <p className="mt-3 font-montserrat text-sm font-light text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {coin.significance}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURED MASTERPIECE */}
        <section className="mb-24 overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/40 shadow-soft sm:mb-32">
          <div className="grid lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: easeOutQuint }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-auto lg:h-[600px]"
            >
              <Image
                src="/coin1.jpg"
                alt="1933 Double Eagle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent lg:from-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easeOutQuint }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"
            >
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                <Clock3 className="h-3 w-3 text-primary" />
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Featured Artifact
                </span>
              </div>

              <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                1933 Double Eagle
              </h2>

              <div className="mt-6 space-y-4 font-montserrat text-base leading-relaxed text-foreground/80">
                <p>
                  One of the rarest and most coveted coins ever minted—a symbol
                  of history, artistry, and unparalleled exclusivity in the
                  numismatic world.
                </p>
                <p className="border-l-2 border-primary/50 pl-4 text-sm italic text-foreground/60">
                  Only 13 examples are known to exist, making it the Mona Lisa
                  of American coinage.
                </p>
              </div>

              <div className="mt-10 flex flex-col items-start gap-6 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    Starting From
                  </p>
                  <p className="mt-1 font-playfair text-3xl font-bold text-primary">
                    \$7,500,000
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/products")}
                  size="lg"
                  className="w-full px-8 shadow-md sm:w-auto"
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUST GRID */}
        <section className="mb-24 border-t border-border/50 pt-20 sm:mb-32 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl">
              Verified by Experts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-montserrat text-foreground/60">
              Every coin undergoes rigorous authentication, professional
              grading, and comprehensive provenance validation before entering
              our marketplace.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.6,
                  ease: easeOutQuint,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-soft transition-all hover:border-primary/40 hover:shadow-elevated"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {label}
                  </h3>
                  <p className="mt-3 font-montserrat text-sm leading-relaxed text-foreground/70">
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeOutQuint }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card/60 px-6 py-20 text-center shadow-elevated backdrop-blur-md sm:px-12 sm:py-28"
          >
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Begin Your Journey
                </span>
              </div>

              <h2 className="bg-linear-to-r from-foreground via-foreground/80 to-foreground bg-clip-text font-playfair text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                Start Your Collection
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-montserrat text-base leading-relaxed text-foreground/60 sm:text-lg">
                Join a community of discerning collectors and acquire pieces
                that tell the story of human civilization.
              </p>

              <Button
                onClick={() => router.push("/products")}
                size="lg"
                className="group mt-10 h-14 w-full px-10 font-montserrat text-[15px] shadow-soft sm:w-auto"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <p className="mt-6 font-montserrat text-xs text-foreground/40">
                Free shipping worldwide • Lifetime authenticity guarantee
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
