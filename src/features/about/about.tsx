"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, Award, Globe2, Users } from "lucide-react";

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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-1.5 rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-shadow duration-500 hover:shadow-elevated">
      <p className="font-playfair text-4xl font-bold text-foreground">
        {value}
      </p>
      <p className="text-xs font-montserrat font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function PillarCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group space-y-4 rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow duration-500 hover:shadow-elevated">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto space-y-20 pb-24">
      <section className="pt-6">
        <FadeIn>
          <p className="mb-5 text-xs font-montserrat uppercase tracking-[0.3em] text-muted-foreground">
            Our Story
          </p>
          <h1 className="mb-8 font-playfair text-5xl font-bold leading-[1.1] text-foreground md:text-6xl">
            Where History
            <br />
            <span className="text-primary">Meets Craft</span>
          </h1>
          <p className="max-w-2xl text-lg font-montserrat font-light leading-relaxed text-muted-foreground">
            Coinat was founded on a singular belief: that every coin is a
            witness to history. We created a marketplace where collectors,
            historians, and investors can find authenticated numismatic pieces
            with full confidence in their provenance and condition.
          </p>
        </FadeIn>
      </section>

      <FadeIn>
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-border/70" />
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/45"
              />
            ))}
          </div>
          <div className="h-px flex-1 bg-border/70" />
        </div>
      </FadeIn>

      <section>
        <FadeIn>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard value="2,400+" label="Coins Listed" />
            <StatCard value="180+" label="Countries" />
            <StatCard value="12K+" label="Collectors" />
            <StatCard value="98%" label="Satisfaction" />
          </div>
        </FadeIn>
      </section>

      <section>
        <FadeIn>
          <p className="mb-4 text-xs font-montserrat uppercase tracking-[0.3em] text-muted-foreground">
            Our Mission
          </p>
          <h2 className="mb-6 font-playfair text-3xl font-bold text-foreground md:text-4xl">
            Preserving Numismatic Heritage
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-5 text-base font-montserrat leading-relaxed text-muted-foreground">
            <p>
              For millennia, coins have chronicled the rise and fall of empires,
              the faces of rulers, the iconography of belief systems, and the
              economic structures of civilizations. Each piece in our catalog is
              more than currency - it is a primary source.
            </p>
            <p>
              We partner with leading numismatic experts and grading services to
              ensure every coin is authenticated, accurately graded, and
              honestly described. No surprises. No compromises. Just the real
              thing.
            </p>
          </div>
        </FadeIn>
      </section>

      <section>
        <FadeIn>
          <p className="mb-4 text-xs font-montserrat uppercase tracking-[0.3em] text-muted-foreground">
            What We Stand For
          </p>
          <h2 className="mb-10 font-playfair text-3xl font-bold text-foreground">
            The Coinat Standard
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              icon: Shield,
              title: "Authentication First",
              delay: 0,
              description:
                "Every coin undergoes rigorous expert review. We work with PCGS and NGC certified numismatists to verify authenticity and grade accuracy before any listing goes live.",
            },
            {
              icon: Award,
              title: "Condition Integrity",
              delay: 0.08,
              description:
                "Grades are assigned conservatively. Our photography captures every surface detail - luster, strike, and imperfections - so what you see is exactly what you receive.",
            },
            {
              icon: Globe2,
              title: "Global Reach",
              delay: 0.16,
              description:
                "From Athenian owls to modern bullion, our catalog spans 3,000 years across six continents. We make the world's numismatic heritage accessible from one trusted platform.",
            },
            {
              icon: Users,
              title: "Collector Community",
              delay: 0.24,
              description:
                "Coinat is built for collectors, by collectors. Expert guidance, market insights, and a community of passionate numismatists who share your love of the discipline.",
            },
          ].map((pillar) => (
            <FadeIn key={pillar.title} delay={pillar.delay}>
              <PillarCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      <FadeIn>
        <div className="space-y-5 rounded-2xl bg-primary p-8 text-background shadow-elevated md:p-12">
          <p className="text-xs font-montserrat uppercase tracking-[0.3em] opacity-50">
            A Note from Our Founders
          </p>
          <blockquote className="font-playfair text-2xl leading-relaxed md:text-3xl">
            &ldquo;We built Coinat because we were collectors first. We know the
            thrill of finding the right coin - and the frustration of
            uncertainty. That feeling drives every decision we make.&rdquo;
          </blockquote>
          <p className="text-sm font-montserrat opacity-70">
            - The Coinat Team
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
