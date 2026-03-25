"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, Award, Globe2, Users } from "lucide-react";

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center space-y-1.5 p-6 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 hover:shadow-md transition-shadow duration-500">
      <p className="text-4xl font-playfair font-bold text-text-dark dark:text-text">{value}</p>
      <p className="text-xs tracking-widest uppercase font-montserrat text-text-dark/55 dark:text-text/55">{label}</p>
    </div>
  );
}

function PillarCard({ icon: Icon, title, description }: {
  icon: React.ElementType; title: string; description: string;
}) {
  return (
    <div className="p-7 rounded-2xl bg-background dark:bg-background-dark shadow-sm shadow-background-dark/15 dark:shadow-background/8 space-y-4 group hover:shadow-md transition-shadow duration-500">
      <div className="w-10 h-10 rounded-xl bg-text-dark/6 dark:bg-text/6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-4.5 h-4.5 text-text-dark dark:text-text" strokeWidth={1.75} />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-text-dark dark:text-text">{title}</h3>
      <p className="font-montserrat text-sm leading-relaxed text-text-dark/60 dark:text-text/60">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-20 pb-24">

      {/* Hero */}
      <section className="pt-6">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-montserrat text-text-dark/45 dark:text-text/45 mb-5">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-text-dark dark:text-text leading-[1.1] mb-8">
            Where History<br />
            <span className="text-text-dark/35 dark:text-text/35">Meets Craft</span>
          </h1>
          <p className="text-lg font-montserrat font-light leading-relaxed text-text-dark/65 dark:text-text/65 max-w-2xl">
            Coinat was founded on a singular belief: that every coin is a witness to history.
            We created a marketplace where collectors, historians, and investors can find
            authenticated numismatic pieces with full confidence in their provenance and condition.
          </p>
        </FadeIn>
      </section>

      {/* Dot divider */}
      <FadeIn>
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px bg-text-dark/8 dark:bg-text/8" />
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-text-dark/20 dark:bg-text/20" />
            ))}
          </div>
          <div className="flex-1 h-px bg-text-dark/8 dark:bg-text/8" />
        </div>
      </FadeIn>

      {/* Stats */}
      <section>
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="2,400+" label="Coins Listed" />
            <StatCard value="180+"   label="Countries" />
            <StatCard value="12K+"   label="Collectors" />
            <StatCard value="98%"    label="Satisfaction" />
          </div>
        </FadeIn>
      </section>

      {/* Mission */}
      <section>
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-montserrat text-text-dark/45 dark:text-text/45 mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-text-dark dark:text-text mb-6">
            Preserving Numismatic Heritage
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-5 font-montserrat text-base leading-relaxed text-text-dark/65 dark:text-text/65">
            <p>
              For millennia, coins have chronicled the rise and fall of empires, the faces of rulers,
              the iconography of belief systems, and the economic structures of civilizations.
              Each piece in our catalog is more than currency — it is a primary source.
            </p>
            <p>
              We partner with leading numismatic experts and grading services to ensure every coin
              is authenticated, accurately graded, and honestly described. No surprises.
              No compromises. Just the real thing.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Pillars */}
      <section>
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-montserrat text-text-dark/45 dark:text-text/45 mb-4">
            What We Stand For
          </p>
          <h2 className="text-3xl font-playfair font-bold text-text-dark dark:text-text mb-10">
            The Coinat Standard
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: Shield, title: "Authentication First", delay: 0,
              description: "Every coin undergoes rigorous expert review. We work with PCGS and NGC certified numismatists to verify authenticity and grade accuracy before any listing goes live." },
            { icon: Award, title: "Condition Integrity", delay: 0.08,
              description: "Grades are assigned conservatively. Our photography captures every surface detail — luster, strike, and imperfections — so what you see is exactly what you receive." },
            { icon: Globe2, title: "Global Reach", delay: 0.16,
              description: "From Athenian owls to modern bullion, our catalog spans 3,000 years across six continents. We make the world's numismatic heritage accessible from one trusted platform." },
            { icon: Users, title: "Collector Community", delay: 0.24,
              description: "Coinat is built for collectors, by collectors. Expert guidance, market insights, and a community of passionate numismatists who share your love of the discipline." },
          ].map((p) => (
            <FadeIn key={p.title} delay={p.delay}>
              <PillarCard icon={p.icon} title={p.title} description={p.description} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Quote */}
      <FadeIn>
        <div className="p-8 md:p-12 rounded-2xl bg-text-dark dark:bg-text text-text dark:text-text-dark space-y-5">
          <p className="text-xs tracking-[0.3em] uppercase font-montserrat text-text/45 dark:text-text-dark/45">
            A Note from Our Founders
          </p>
          <blockquote className="text-2xl md:text-3xl font-playfair leading-relaxed">
            &ldquo;We built Coinat because we were collectors first. We know the thrill
            of finding the right coin — and the frustration of uncertainty.
            That feeling drives every decision we make.&rdquo;
          </blockquote>
          <p className="font-montserrat text-sm text-text/60 dark:text-text-dark/60">
            — The Coinat Team, Cairo
          </p>
        </div>
      </FadeIn>

    </div>
  );
}