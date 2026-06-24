"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { QuickActions } from "@/components/QuickActions";
import { FeaturedDishSection } from "@/components/FeaturedDishSection";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuSection } from "@/components/MenuSection";
import { OrderStatusTracker } from "@/components/OrderStatusTracker";
import { TableInfoPanel } from "@/components/TableInfoPanel";
import { StickyCartBar } from "@/components/StickyCartBar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { menuCategories } from "@/lib/data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].name);

  return (
    <main className="min-h-screen pb-20 md:pb-0 relative selection:bg-primary/30">
      <Header />
      <OnboardingModal />

      <HeroSection />

      <QuickActions />

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 mt-8 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <TableInfoPanel />
            <OrderStatusTracker />
          </div>
        </aside>

        {/* Right Main Content */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-10">
          <FeaturedDishSection />
          
          <div className="flex flex-col gap-6">
            <CategoryTabs 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            <MenuSection activeCategory={activeCategory} />
          </div>
        </div>
      </div>

      <Footer />

      <StickyCartBar />
    </main>
  );
}
