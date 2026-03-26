"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Globe2, Sparkles, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const TRUST_ITEMS = [
  { icon: Shield, label: "Authenticated", sub: "Every coin verified", gradient: "from-primary/10 to-primary/5" },
  { icon: Award, label: "Expert Graded", sub: "PCGS & NGC standards", gradient: "from-primary/10 to-primary/5" },
  { icon: Globe2, label: "Global Catalog", sub: "3,000+ years of history", gradient: "from-primary/10 to-primary/5" },
];

const FEATURED_COINS = [
  { era: "Roman Empire", year: "27 BC - 476 AD", significance: "Imperial Legacy", image: "/coin1.jpg" },
  { era: "Greek City-States", year: "600 BC - 146 BC", significance: "Artistic Mastery", image: "/coin1.jpg" },
  { era: "Byzantine Empire", year: "330 - 1453 AD", significance: "Sacred Treasury", image: "/coin1.jpg" },
];

const NEW_ARRIVALS = [
  { name: "Athenian Tetradrachm", year: "454 BC", price: "$8,250" },
  { name: "Julius Caesar Denarius", year: "44 BC", price: "$12,400"},
  { name: "Constantine Solidus", year: "324 AD", price: "$5,800"},
  { name: "Elizabeth I Crown", year: "1592", price: "$3,200"},
];

export default function Home() {
  const router = useRouter();


  useEffect(() => {
  const handleScroll = () => {};
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="relative overflow-hidden bg-background">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Decorative Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs tracking-wider uppercase font-montserrat text-primary font-semibold">
                The Premier Numismatic Gallery
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-bold leading-[1.1] mb-6 bg-linear-to-br from-background via-foreground to-primary bg-clip-text text-transparent"
            >
              Own a Piece of
              <br />
              <span className="bg-linear-to-r from-primary via-amber-500 to-primary-foreground bg-clip-text text-transparent">
                Living History
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl font-montserrat text-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              A curated gallery of authenticated numismatic treasures —
              where ancient empires meet modern collecting excellence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                onClick={() => router.push("/products")}
                size="lg"
                className="group relative px-8 py-6 text-base font-semibold overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span className="relative z-10">Explore Marketplace</span>
                <ArrowRight className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 group-hover:scale-110 transition-transform duration-500" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/about")}
                className="px-8 py-6 text-base border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                Discover Our Story
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-y border-border mb-24">
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-6 md:gap-12">
            {["Authenticated Assets", "Global Collectors", "Verified Provenance", "Premium Marketplace"].map((item, idx) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-foreground font-montserrat font-semibold whitespace-nowrap">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Curated Collections */}
        <section className="mb-28">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground"
              >
                Curated Collections
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary mt-2 font-montserrat"
              >
                Hand-selected eras from the annals of history
              </motion.p>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => router.push("/products")}
              className="group flex items-center gap-2 text-sm font-montserrat text-foreground hover:text-primary transition-colors"
            >
              View all collections
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] sm:auto-rows-[300px] gap-5">
            {FEATURED_COINS.map((coin, idx) => (
              <motion.div
                key={coin.era}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer ${idx === 0 ? 'lg:row-span-2 lg:col-span-2' : ''}`}
              >
                <Image
                  src={coin.image}
                  alt={coin.era}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-playfair font-bold mb-1">{coin.era}</h3>
                  <p className="text-sm opacity-80 font-montserrat">{coin.year}</p>
                  <p className="text-xs opacity-60 mt-2">{coin.significance}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Artifact */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card">
                <Image src="/coin1.jpg" alt="Featured coin" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Clock className="w-3 h-3 text-primary" />
                <span className="text-xs tracking-wider uppercase font-montserrat text-primary font-semibold">
                  Featured Artifact
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground">
                1933 Double Eagle
              </h2>

              <div className="space-y-4 text-foreground font-montserrat leading-relaxed">
                <p>
                  One of the rarest and most coveted coins ever minted — a symbol of history,
                  artistry, and unparalleled exclusivity in the numismatic world.
                </p>
                <p className="text-sm italic border-l-2 border-primary pl-4">
                  Only 13 examples are known to exist, making it the "Mona Lisa" of American coinage.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={() => router.push("/products")}
                  className="group bg-foreground text-background hover:text-primary-foreground "
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="text-right">
                  <p className="text-xs text-foreground">Starting from</p>
                  <p className="text-xl font-bold text-primary">$7,500,000</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-3xl sm:text-4xl font-playfair font-bold text-foreground"
              >
                New Arrivals
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-foreground/60 text-sm sm:text-base mt-2"
              >
                Fresh additions to our gallery
              </motion.p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => router.push("/products")}
              className="group flex items-center gap-2 text-sm font-montserrat text-primary hover:text-primary/80 transition-colors"
            >
              View all arrivals
              <TrendingUp className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEW_ARRIVALS.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-card shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="/coin1.jpg"
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <p className="font-playfair font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs font-montserrat text-foreground/50">{item.year}</p>
                  <p className="text-primary font-bold text-lg mt-2">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 sm:py-24 border-t border-border">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Verified by Experts
            </h2>
            <p className="text-foreground/60 font-montserrat max-w-2xl mx-auto">
              Every coin undergoes rigorous authentication, professional grading, 
              and comprehensive provenance validation before entering our marketplace.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub, gradient }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 bg-linear-to-br ${gradient} bg-card`}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-lg mb-2">{label}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{sub}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs tracking-wider uppercase font-montserrat text-primary font-semibold">
                Begin Your Journey
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-linear-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent">
              Start Your Collection
            </h2>

            <p className="text-foreground/60 mb-10 font-montserrat max-w-2xl mx-auto text-base sm:text-lg">
              Join a community of discerning collectors and acquire pieces that 
              tell the story of human civilization.
            </p>

            <Button
              onClick={() => router.push("/products")}
              size="lg"
              className="px-8 sm:px-12 py-6 text-base sm:text-lg group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="relative z-10">Explore Marketplace</span>
              <ArrowRight className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 group-hover:scale-110 transition-transform duration-500" />
            </Button>

            <p className="mt-6 text-xs text-foreground/40 font-montserrat">
              Free shipping worldwide • Lifetime authenticity guarantee
            </p>
          </motion.div>

          
        </section>
      </div>
    </div>
  );
}