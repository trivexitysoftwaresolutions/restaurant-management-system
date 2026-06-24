"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { menuItems } from "@/lib/data";

export function FeaturedDishSection() {
  const featured = menuItems.filter((item) => item.isSignature);

  if (featured.length === 0) return null;

  return (
    <section className="w-full max-w-md mx-auto md:max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cormorant text-2xl font-bold text-foreground">Chef's Signatures</h2>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x">
        {featured.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-w-[280px] md:min-w-[400px] h-72 md:h-80 rounded-3xl overflow-hidden cursor-pointer snap-start"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover object-center group-hover:scale-105 premium-transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm backdrop-blur-sm">
                  Signature
                </span>
                {item.rating && (
                  <span className="bg-background/80 text-foreground text-[10px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm">
                    ★ {item.rating}
                  </span>
                )}
              </div>

              <h3 className="font-cormorant text-2xl font-bold text-foreground leading-tight mb-2">
                {item.name}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2 mb-4 max-w-[85%]">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <span className="font-semibold text-lg text-primary">${item.price.toFixed(2)}</span>
                <button className="bg-white/10 hover:bg-primary hover:text-primary-foreground backdrop-blur-md text-foreground w-10 h-10 rounded-full flex items-center justify-center premium-transition active:scale-95">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
