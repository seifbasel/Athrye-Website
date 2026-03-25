import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ImageItem {
  src: string;
  alt: string;
  size: "sm" | "md" | "lg";
}

const images: ImageItem[] = [
  { src: "/coin1.jpg", alt: "Coin 1", size: "lg" },
  { src: "/coin1.jpg", alt: "Coin 2", size: "sm" },
  { src: "/coin1.jpg", alt: "Coin 3", size: "md" },
  { src: "/coin1.jpg", alt: "Coin 4", size: "lg" },
  { src: "/coin1.jpg", alt: "Coin 5", size: "sm" },
];
export default function Home() {
  const router = useRouter();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);

      if (!headerRef.current || !textRef.current || !gridRef.current) return;

      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center",
          end: "bottom center",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    };

    initGSAP();
  }, []);

  if (!isClient) return null;

  const getSizeClasses = (size: ImageItem["size"]): string => {
    switch (size) {
      case "lg":
        return "md:col-span-2 md:row-span-2";
      case "md":
        return "md:col-span-1 md:row-span-2";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <section className="py-16 md:py-24">
        <h1
          ref={headerRef}
          className="text-4xl md:text-6xl text-center text-text-dark dark:text-text font-bold mb-6 font-playfair"
        >
          Welcome to Coinat
        </h1>
        <div ref={textRef} className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-base font-light text-wrap  text-text-dark dark:text-text font-montserrat">
            Discover our collection of authentic coins where Each piece tells a
            unique story of civilizations past, preserved for generations to
            come.
          </p>
          <p className="text-base font-light text-text-dark dark:text-text/80 font-montserrat"></p>
          <div className="pt-4">
            <Button
              variant="default"
              className="mx-auto px-8"
              onClick={() => router.push("/catalog")}
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[300px]"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] ${getSizeClasses(
                image.size
              )}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-text text-lg font-semibold">Rare Coin</h3>
                  <p className="text-text/80 text-sm">Historical Artifact</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
