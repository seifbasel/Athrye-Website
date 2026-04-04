"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, Variants } from "motion/react";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock3,
  Globe2,
  Globe,
  ShieldCheck,
  Shield,
  Sparkles,
  BadgeCheck,
  Diamond,
  Users,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TRUST_FEATURES = [
  { text: "Authenticated Assets", icon: ShieldCheck },
  { text: "Global Collectors", icon: Globe },
  { text: "Verified Provenance", icon: BadgeCheck },
  { text: "Premium Marketplace", icon: Diamond },
];

const MARQUEE_ITEMS = Array(4).fill(TRUST_FEATURES).flat();

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
    year: "27 BC - 476 AD",
    significance: "Portrait-led denarii & imperial icons",
    image: "/1.png",
  },
  {
    era: "Greek City-States",
    year: "600 BC - 146 BC",
    significance: "Sculptural owls & artistic mastery",
    image: "/2.png",
  },
  {
    era: "Royal Europe",
    year: "1485 - 1910",
    significance: "Ceremonial crowns & precious metals",
    image: "/3.png",
  },
];

const STATS = [
  { value: "2,400+", label: "Coins Listed" },
  { value: "180+", label: "Countries" },
  { value: "12K+", label: "Collectors" },
  { value: "98%", label: "Satisfaction" },
];

const PILLARS = [
  {
    icon: Shield,
    title: "Authentication First",
    description:
      "Every coin undergoes rigorous expert review. We work with PCGS and NGC certified numismatists to verify authenticity and grade accuracy before any listing goes live.",
  },
  {
    icon: Award,
    title: "Condition Integrity",
    description:
      "Grades are assigned conservatively. Our photography captures every surface detail - luster, strike, and imperfections - so what you see is exactly what you receive.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "From Athenian owls to modern bullion, our catalog spans 3,000 years across six continents. We make the world's numismatic heritage accessible from one trusted platform.",
  },
  {
    icon: Users,
    title: "Collector Community",
    description:
      "Coinat is built for collectors, by collectors. Expert guidance, market insights, and a community of passionate numismatists who share your love of the discipline.",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE_OUT_QUINT },
  }),
};

// ─── Reusable Components ──────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full border-primary/20 bg-primary/10">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {text}
      </span>
    </div>
  );
}

function TrustCard({ icon: Icon, label, sub }: (typeof TRUST_ITEMS)[number]) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative p-8 overflow-hidden transition-all border group rounded-4xl border-border/50 bg-card shadow-soft hover:border-primary/40 hover:shadow-elevated"
    >
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-br from-primary/5 to-transparent group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6 transition-transform duration-500 h-14 w-14 rounded-2xl bg-primary/10 text-primary group-hover:scale-110">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold font-playfair text-foreground">{label}</h3>
        <p className="mt-3 text-sm leading-relaxed font-montserrat text-foreground/70">{sub}</p>
      </div>
    </motion.div>
  );
}

function PillarCard({
  icon: Icon,
  title,
  description,
}: (typeof PILLARS)[number]) {
  return (
    <div className="space-y-4 transition-all duration-500 border group rounded-2xl border-border bg-card p-7 shadow-soft hover:border-primary/40 hover:shadow-elevated">
      <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-xl bg-primary/10 group-hover:scale-110">
        <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-semibold font-playfair text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed font-montserrat text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: (typeof STATS)[number]) {
  return (
    <div className="space-y-1.5 rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-shadow duration-500 hover:shadow-elevated">
      <p className="text-4xl font-bold font-playfair text-foreground">{value}</p>
      <p className="font-montserrat text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* HERO */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[60vw] max-h-150 w-[60vw] max-w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_QUINT }}
          >
            <SectionBadge icon={Sparkles} text="The Premier Numismatic Gallery" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.3}
            className="font-playfair text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Own a Piece of{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-linear-to-r from-primary via-amber-600 to-primary bg-clip-text">
              Living History
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.4}
            className="max-w-2xl mx-auto mt-8 mb-10 text-base leading-relaxed font-montserrat text-foreground/80 sm:text-lg md:text-xl"
          >
            A curated gallery of authenticated numismatic treasures - where
            ancient empires, artistic mastery, and scarcity meet modern
            collecting excellence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => router.push("/products")}
              size="lg"
              className="group relative h-14 w-full overflow-hidden bg-primary px-8 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                Explore Marketplace
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 transition-transform duration-500 scale-x-0 bg-white/20 group-hover:scale-x-100" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/auth/login")}
              className="h-14 w-full border-border/60 px-8 font-montserrat text-[15px] font-semibold text-foreground transition-all hover:bg-card/50 sm:w-auto"
            >
              Join us now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="relative py-10 overflow-hidden bg-transparent border-y border-border/80 sm:py-14">
        <div
          className="relative flex w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex items-center shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {MARQUEE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center">
                  <div className="flex items-center gap-3 px-8 transition-all duration-500 cursor-pointer group hover:text-foreground sm:px-12">
                    <Icon
                      strokeWidth={2}
                      className="h-5 w-5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-foreground group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] sm:h-6 sm:w-6"
                    />
                    <span className="whitespace-nowrap font-montserrat text-[12px] font-semibold uppercase tracking-[0.25em] text-foreground/80 transition-colors duration-500 group-hover:text-foreground sm:text-xs">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-foreground/20">&#10022;</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* CURATED COLLECTIONS */}
        <section className="py-24 sm:py-32">
          <div className="flex flex-col items-start gap-4 mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl font-bold font-playfair text-foreground sm:text-5xl"
              >
                Curated Collections
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-3 text-base font-montserrat text-foreground/60"
              >
                Hand-selected eras from the annals of history
              </motion.p>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => router.push("/products")}
              className="flex items-center gap-2 text-sm font-semibold transition-colors group font-montserrat text-foreground hover:text-primary"
            >
              View all collections
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((coin, idx) => (
              <motion.div
                key={coin.era}
                variants={fadeUp}
                custom={idx * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => router.push("/products")}
                className={`group relative bg-transparent cursor-pointer overflow-hidden rounded-4xl border border-border/40 shadow-soft transition-all hover:border-primary/40 hover:shadow-elevated sm:min-h-100 ${
                  idx === 0 ? "sm:col-span-2 sm:row-span-2 lg:min-h-125" : "min-h-75"
                }`}
              >
                <Image
                  src={coin.image}
                  alt={coin.era}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className=" object-contain transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-500 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90" />
                <div className="absolute text-white bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                  <h3 className="text-3xl font-bold tracking-tight font-playfair sm:text-4xl">
                    {coin.era}
                  </h3>
                  <p className="mt-2 text-xs font-semibold tracking-widest uppercase font-montserrat text-primary">
                    {coin.year}
                  </p>
                  <p className="mt-3 text-sm font-light transition-opacity duration-500 opacity-0 font-montserrat text-white/70 group-hover:opacity-100">
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
              transition={{ duration: 1, ease: EASE_OUT_QUINT }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full aspect-square sm:aspect-4/3 lg:aspect-auto lg:h-150"
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
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full w-fit border-primary/20 bg-primary/10">
                <Clock3 className="w-3 h-3 text-primary" />
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Featured Artifact
                </span>
              </div>

              <h2 className="text-4xl font-bold font-playfair text-foreground sm:text-5xl lg:text-6xl">
                1933 Double Eagle
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed font-montserrat text-foreground/80">
                <p>
                  One of the rarest and most coveted coins ever minted - a symbol
                  of history, artistry, and unparalleled exclusivity in the
                  numismatic world.
                </p>
                <p className="pl-4 text-sm italic border-l-2 border-primary/50 text-foreground/60">
                  Only 13 examples are known to exist, making it the Mona Lisa of
                  American coinage.
                </p>
              </div>

              <div className="flex flex-col items-start gap-6 pt-8 mt-10 border-t border-border/50 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    Starting From
                  </p>
                  <p className="mt-1 text-3xl font-bold font-playfair text-primary">
                    $7,500,000
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

        {/* OUR STORY */}
        <section id="our-story" className="mb-24 sm:mb-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn>
              <p className="mb-5 font-montserrat text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Our Story
              </p>
              <h2 className="mb-8 font-playfair text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
                Where History
                <br />
                <span className="text-primary">Meets Craft</span>
              </h2>
              <p className="max-w-2xl text-lg font-light leading-relaxed font-montserrat text-muted-foreground">
                Coinat was founded on a singular belief: that every coin is a
                witness to history. We created a marketplace where collectors,
                historians, and investors can find authenticated numismatic pieces
                with full confidence in their provenance and condition.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* DECORATIVE DIVIDER */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-24 sm:mb-32">
            <div className="flex-1 h-px bg-border/70" />
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/45" />
              ))}
            </div>
            <div className="flex-1 h-px bg-border/70" />
          </div>
        </FadeIn>

        {/* THE COINAT STANDARD */}
        <section className="mb-24 sm:mb-32">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="mb-4 font-montserrat text-xs uppercase tracking-[0.3em] text-muted-foreground">
                What We Stand For
              </p>
              <h2 className="text-4xl font-bold font-playfair text-foreground sm:text-5xl">
                The Coinat Standard
              </h2>
              <p className="max-w-2xl mx-auto mt-4 font-montserrat text-foreground/60">
                Every coin undergoes rigorous authentication, professional grading,
                and comprehensive provenance validation before entering our marketplace.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {PILLARS.map((pillar, idx) => (
              <FadeIn key={pillar.title} delay={idx * 0.08}>
                <PillarCard {...pillar} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* TRUST GRID */}
        <section className="pt-20 mb-24 border-t border-border/50 sm:mb-32 sm:pt-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold font-playfair text-foreground sm:text-5xl">
              Verified by Experts
            </h2>
            <p className="max-w-2xl mx-auto mt-4 font-montserrat text-foreground/60">
              Museum-quality standards applied to every coin in our collection.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TRUST_ITEMS.map((item, idx) => (
              <motion.div key={item.label} custom={idx * 0.1} variants={fadeUp}>
                <TrustCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOUNDERS QUOTE */}
        <section className="mb-24 sm:mb-32">
          <FadeIn>
            <div className="space-y-5 rounded-[2rem] bg-primary p-8 text-background shadow-elevated sm:p-12 md:p-16">
              <p className="font-montserrat text-xs uppercase tracking-[0.3em] opacity-50">
                A Note from Our Founders
              </p>
              <blockquote className="text-2xl leading-relaxed font-playfair sm:text-3xl md:text-4xl">
                &ldquo;We built Coinat because we were collectors first. We know
                the thrill of finding the right coin - and the frustration of
                uncertainty. That feeling drives every decision we make.&rdquo;
              </blockquote>
              <p className="text-sm font-montserrat opacity-70">- The Coinat Team</p>
            </div>
          </FadeIn>
        </section>

        {/* FINAL CTA */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_QUINT }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card/60 px-6 py-20 text-center shadow-elevated backdrop-blur-md sm:px-12 sm:py-28"
          >
            <div className="relative z-10 flex flex-col items-center">
              <SectionBadge icon={Sparkles} text="Begin Your Journey" />

              <h2 className="text-4xl font-bold text-transparent bg-linear-to-r from-foreground via-foreground/80 to-foreground bg-clip-text font-playfair sm:text-5xl lg:text-6xl">
                Start Your Collection
              </h2>
              <p className="max-w-xl mx-auto mt-6 text-base leading-relaxed font-montserrat text-foreground/60 sm:text-lg">
                Join a community of discerning collectors and acquire pieces that
                tell the story of human civilization.
              </p>

              <Button
                onClick={() => router.push("/products")}
                size="lg"
                className="group mt-10 h-14 w-full px-10 font-montserrat text-[15px] shadow-soft sm:w-auto"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <p className="mt-6 text-xs font-montserrat text-foreground/40">
                Free shipping worldwide - Lifetime authenticity guarantee
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}