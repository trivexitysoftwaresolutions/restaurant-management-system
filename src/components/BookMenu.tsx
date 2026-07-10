"use client";

import React, { forwardRef, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Plus } from "lucide-react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { menuCategories, menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const FlipBook = HTMLFlipBook as any;

// Helper to group items by category
const itemsByCategory = menuCategories.reduce((acc, cat) => {
  acc[cat.name] = menuItems.filter((item) => item.category === cat.name);
  return acc;
}, {} as Record<string, typeof menuItems>);

interface PageData {
  category: typeof menuCategories[0];
  items: typeof menuItems;
  part: number;
  totalParts: number;
}

const ITEMS_PER_PAGE = 2;

const generateBookPages = () => {
  const pages: PageData[] = [];
  menuCategories.forEach(category => {
    const items = itemsByCategory[category.name] || [];
    if (items.length === 0) return;
    
    const totalParts = Math.ceil(items.length / ITEMS_PER_PAGE);
    for (let i = 0; i < totalParts; i++) {
      pages.push({
        category,
        items: items.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
        part: i + 1,
        totalParts
      });
    }
  });
  return pages;
};

const bookPages = generateBookPages();

const getCategoryStartPage = (categoryName: string) => {
  const index = bookPages.findIndex(p => p.category.name === categoryName);
  return index >= 0 ? index + 2 : -1;
};

interface PageProps {
  number: number;
  children: React.ReactNode;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ number, children, className = "" }, ref) => {
    return (
      <div
        className={`demoPage bg-[#ffffff] border-l border-r border-[#f0f0f0] shadow-sm flex flex-col overflow-hidden h-full w-full ${className}`}
        ref={ref}
      >
        <div className="flex-1 p-4 md:p-8 relative">
          <div className="relative z-10 h-full flex flex-col">{children}</div>
        </div>
        
        {/* Page Footer */}
        {number > 0 && number < bookPages.length + 2 && (
          <div className="py-3 px-8 flex justify-between items-center border-t border-[#e8dfc8]/50 text-muted-foreground/60 text-xs font-serif">
            <span>Restro</span>
            <span>- {number} -</span>
            <span>Menu</span>
          </div>
        )}
      </div>
    );
  }
);
Page.displayName = "Page";

interface BookMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookMenu({ isOpen, onClose }: BookMenuProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const bookRef = useRef<any>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const isMobile = windowWidth < 768;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-6 md:right-6 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors z-[9999] backdrop-blur-md shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl flex justify-center items-center h-[85vh]"
        >
          {/* @ts-ignore */}
          <FlipBook
            ref={bookRef}
            key={isMobile ? "mobile" : "desktop"}
            width={isMobile ? windowWidth - 16 : 450}
            height={isMobile ? Math.max(window.innerHeight * 0.85, 500) : 650}
            size="fixed"
            minWidth={315}
            maxWidth={500}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="book-menu"
          >
            {/* Front Cover */}
            <Page number={0} className="bg-[#0A261D] flex items-center justify-center border-l-[12px] border-[#061711] shadow-2xl">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
               <div className="relative z-10 text-center px-8 py-12 border border-[#D4AF37]/30 rounded-xl m-6 h-[calc(100%-3rem)] flex flex-col justify-center bg-[#0A261D]/90 shadow-sm">
                  <h1 className="text-4xl md:text-5xl font-cormorant font-bold uppercase tracking-[0.2em] mb-4 text-[#D4AF37]">
                    Menu
                  </h1>
                  <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-6"></div>
                  <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37]/80 font-light">
                    Restro
                  </p>
                  <p className="text-xs tracking-widest text-[#D4AF37]/50 mt-12 font-serif italic">
                    Est. 2024
                  </p>
               </div>
            </Page>

            {/* Welcome Page */}
            <Page number={1}>
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl font-cormorant text-[#111] mb-4">Welcome</h2>
                <p className="text-[#666] font-light leading-relaxed max-w-sm text-balance italic">
                  "Culinary excellence meets modern ambiance. We invite you to explore a journey of flavors."
                </p>
                
                <div className="mt-12 w-full text-left">
                  <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-[#0A261D] border-b border-[#0A261D]/20 pb-2">Contents</h3>
                  <ul className="space-y-3 font-serif">
                    {menuCategories.map((cat, idx) => {
                      const startPage = getCategoryStartPage(cat.name);
                      if (startPage === -1) return null;
                      return (
                      <li 
                        key={cat.slug} 
                        className="flex justify-between text-sm items-baseline cursor-pointer text-[#333] hover:text-[#D4AF37] transition-colors relative z-50"
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (bookRef.current) {
                            bookRef.current.pageFlip().turnToPage(startPage);
                          }
                        }}
                      >
                        <span>{cat.name}</span>
                        <span className="flex-1 border-b border-dotted border-[#ccc] mx-2"></span>
                        <span>Pg {startPage}</span>
                      </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Page>

            {/* Category Pages */}
            {bookPages.map((page, index) => {
              const { category, items, part, totalParts } = page;
              return (
                <Page key={`${category.slug}-${part}`} number={index + 2}>
                  <div className="mb-4 flex flex-col items-center shrink-0">
                    {part === 1 && (
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-3 relative shadow-md">
                        <Image 
                          src={category.image} 
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-cormorant font-semibold tracking-wide text-center text-primary uppercase">
                      {category.name} {totalParts > 1 ? <span className="text-sm normal-case text-muted-foreground ml-1">(pt. {part})</span> : ""}
                    </h2>
                    <div className="w-8 h-[2px] bg-primary/40 mt-2 mb-4 mx-auto"></div>
                  </div>

                  <div className="space-y-4 md:space-y-6 flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar pb-2">
                    {items.map((item) => (
                      <div key={item.id} className="group relative bg-white border border-[#eaeaea] p-2.5 md:p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-2.5 md:gap-3 h-full">
                          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden relative shadow-inner border border-[#f0f0f0]">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill 
                              className="object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex justify-between items-start gap-1.5 mb-1">
                                <h3 className="font-semibold text-[#333] font-serif leading-tight text-[13px] md:text-sm flex-1 line-clamp-2">
                                  {item.name}
                                </h3>
                                <span className="font-semibold text-[#D4AF37] shrink-0 text-[13px] md:text-sm">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                              <p className="text-[10px] md:text-[11px] text-[#666] leading-snug font-light line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-1 gap-1">
                               <div className="flex gap-1 flex-wrap">
                                 {item.isSignature && (
                                   <span className="text-[8px] md:text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30 uppercase tracking-wider">
                                     Signature
                                   </span>
                                 )}
                                 {item.isVeg && <span className="text-[8px] md:text-[9px] text-green-600 border border-green-600/30 px-1.5 py-0.5 rounded uppercase">Veg</span>}
                                 {item.isSpicy && <span className="text-[8px] md:text-[9px] text-red-500 border border-red-500/30 px-1.5 py-0.5 rounded uppercase">Spicy</span>}
                               </div>
                               <button 
                                 onPointerDown={(e) => {
                                   e.stopPropagation();
                                 }}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   e.preventDefault();
                                   addToCart(item);
                                 }}
                                 className="shrink-0 text-[10px] md:text-xs bg-[#0A261D] text-[#D4AF37] hover:bg-[#061711] px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg premium-transition flex items-center gap-1 shadow-sm font-medium"
                               >
                                 <Plus className="w-3 h-3" /> Add
                               </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Page>
              );
            })}

            {/* Back Cover */}
            <Page number={bookPages.length + 2} className="bg-[#0A261D] border-r-[12px] border-[#061711]">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-[#D4AF37]/80 px-8 text-center font-serif">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-6 bg-[#0A261D]">
                  <span className="text-[#D4AF37] font-cormorant text-xl">R</span>
                </div>
                <p className="text-sm font-light tracking-wide mb-2 text-[#D4AF37]/70">Thank you for dining with us</p>
                <p className="text-xs text-[#D4AF37]/40 tracking-widest uppercase">Restro</p>
              </div>
            </Page>

          </FlipBook>
          
          <div className="absolute -bottom-8 md:-bottom-12 left-0 right-0 flex justify-center items-center text-white/70 text-sm gap-4 pointer-events-none">
            <span className="flex items-center gap-1"><ChevronLeft className="w-4 h-4"/> Drag to flip</span>
            <span className="flex items-center gap-1">Drag to flip <ChevronRight className="w-4 h-4"/></span>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
