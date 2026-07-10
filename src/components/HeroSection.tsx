"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { restaurantData } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden flex items-end pt-32 pb-24 md:pb-32 px-4">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Dining Ambiance"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto md:max-w-5xl flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md mb-8 shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90">
              Active Digital Menu
            </span>
          </div>

          <h1 className="font-cormorant flex flex-col gap-1 mb-6">
            <span className="text-3xl md:text-4xl font-medium tracking-[0.25em] uppercase text-white/90 drop-shadow-lg pl-1">
              Elevate Your
            </span>
            <span className="text-6xl md:text-8xl italic font-light text-primary drop-shadow-[0_4px_24px_rgba(212,175,55,0.4)]">
              Dining Experience
            </span>
          </h1>

          <p className="text-white/80 font-light text-sm md:text-base max-w-sm mb-10 tracking-wide leading-relaxed text-balance drop-shadow-md">
            Explore our curated menu, customize your order, and collect it fresh from the counter.
          </p>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-sm premium-transition hover:scale-105 active:scale-95 shadow-premium"
            >
              Browse Menu
            </button>
            <button className="glass-panel text-foreground px-8 py-3.5 rounded-full font-semibold text-sm premium-transition hover:bg-white/10 active:scale-95">
              Track Order
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 right-4 animate-bounce"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
