"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { menuItems, menuCategories } from "@/lib/data";

interface MenuSectionProps {
  activeCategory: string;
}

export function MenuSection({ activeCategory }: MenuSectionProps) {
  const categoryData = menuCategories.find(c => c.name === activeCategory);
  const allCategoryItems = menuItems.filter((item) => item.category === activeCategory);
  const displayedItems = allCategoryItems.slice(0, 3); // Teaser: only show 3 items

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cormorant text-2xl font-bold text-foreground">{activeCategory}</h2>
        <span className="text-sm font-medium text-muted-foreground px-3 py-1 bg-muted/50 rounded-full">
          {allCategoryItems.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedItems.map((item, index) => (
          <ProductCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {allCategoryItems.length > 3 && categoryData && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <Link 
            href={`/category/${categoryData.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-medium hover:bg-primary hover:text-primary-foreground premium-transition shadow-md active:scale-95"
          >
            <span>View all {allCategoryItems.length} items</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      )}
    </section>
  );
}
