"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Shield, Award, Globe2 } from "lucide-react";

const GRID_IMAGES = [
  { src: "/coin1.jpg", alt: "Gold Double Eagle",       size: "lg" as const },
  { src: "/coin1.jpg", alt: "Roman Aureus",             size: "sm" as const },
  { src: "/coin1.jpg", alt: "Athenian Tetradrachm",    size: "md" as const },
  { src: "/coin1.jpg", alt: "Byzantine Solidus",       size: "lg" as const },
  { src: "/coin1.jpg", alt: "Indian Head Gold Dollar", size: "sm" as const },
];

const sizeClasses = {
  lg: "md:col-span-2 md:row-span-2",
  md: "md:col-span-1 md:row-span-2",
  sm: "md:col-span-1 md:row-span-1",
};

const TRUST_ITEMS = [
  { icon: Shield,  label: "Authenticated",   sub: "Every coin verified" },
  { icon: Award,   label: "Expert Graded",   sub: "PCGS & NGC standards" },
  { icon: Globe2,  label: "Global Catalog",  sub: "3,000 years of history" },
];

export default function Home() {
  const router = useRouter();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline();
      if (headerRef.current) tl.from(headerRef.current, { y: -40, opacity: 0, duration: 0.9, ease: "power3.out" });
      if (subRef.current)    tl.from(subRef.current,    { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        });
      }

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">

      {/* ── Hero ── */}
      <section className="py-16 md:py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase font-montserrat text-text-dark/45 dark:text-text/45 mb-6">
          Numismatic Marketplace
        </p>
        <h1 ref={headerRef}
          className="text-5xl md:text-7xl font-playfair font-bold text-text-dark dark:text-text leading-[1.05] mb-8">
          Every Coin<br />
          <span className="text-text-dark/35 dark:text-text/35">Tells a Story</span>
        </h1>

        <div ref={subRef} className="max-w-xl mx-auto space-y-8">
          <p className="text-base font-montserrat font-light leading-relaxed text-text-dark/65 dark:text-text/65">
            Discover authenticated coins from ancient civilizations to modern rarities.
            Each piece curated for collectors who demand provenance, condition, and beauty.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button variant="default" className="px-8 font-montserrat font-semibold gap-2"
              onClick={() => router.push("/products")}>
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="px-8 font-montserrat font-semibold"
              onClick={() => router.push("/about")}>
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-3 gap-3 mb-20"
      >
        {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
          <div key={label}
            className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8">
            <Icon className="w-5 h-5 text-text-dark/60 dark:text-text/60" strokeWidth={1.5} />
            <p className="text-sm font-montserrat font-semibold text-text-dark dark:text-text">{label}</p>
            <p className="text-xs font-montserrat text-text-dark/50 dark:text-text/50 hidden sm:block">{sub}</p>
          </div>
        ))}
      </motion.section>

      {/* ── Image Grid ── */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-playfair font-bold text-text-dark dark:text-text">
            Featured Pieces
          </h2>
          <button onClick={() => router.push("/products")}
            className="flex items-center gap-1.5 text-sm font-montserrat font-medium text-text-dark/60 dark:text-text/60 hover:text-text-dark dark:hover:text-text transition-colors">
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {GRID_IMAGES.map((img, i) => (
            <div key={i}
              onClick={() => router.push("/products")}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${sizeClasses[img.size]}`}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105" priority={i < 2} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-playfair font-semibold text-sm">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}