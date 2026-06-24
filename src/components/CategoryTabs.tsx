"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import { menuCategories } from "@/lib/data";

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryTabs({ activeCategory, setActiveCategory }: CategoryTabsProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="font-cormorant text-2xl font-bold text-foreground">Order our best food options</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-6 px-4 pb-4 snap-x">
        {menuCategories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className="flex flex-col items-center gap-3 min-w-[80px] snap-start group"
            >
              <div className={clsx(
                "relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300",
                isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-80 group-hover:opacity-100",
                "shadow-md group-hover:shadow-lg"
              )}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className={clsx(
                "text-sm font-medium whitespace-nowrap transition-colors",
                isActive ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
