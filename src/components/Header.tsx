"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, User, Menu, Receipt } from "lucide-react";
import { clsx } from "clsx";
import { restaurantData } from "@/lib/data";
import { useCustomer } from "@/context/CustomerContext";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { customer } = useCustomer();
  const { placedOrders, setIsMyOrdersOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm py-0"
          : "bg-gradient-to-b from-black/60 to-transparent py-2"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
            isScrolled ? "bg-primary/10 border border-primary/20" : "bg-white/10 border border-white/20 backdrop-blur-sm"
          )}>
            <span className={clsx("font-cormorant font-bold text-xl", isScrolled ? "text-primary" : "text-white")}>
              {customer ? customer.name.charAt(0).toUpperCase() : "L"}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className={clsx("font-cormorant text-lg font-semibold leading-tight transition-colors duration-300", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>
              {customer ? `Hi, ${customer.name.split(" ")[0]}` : restaurantData.name}
            </h1>
            <p className={clsx("text-[10px] uppercase tracking-widest font-medium transition-colors duration-300", isScrolled ? "text-muted-foreground" : "text-white/80")}>
              Table {restaurantData.tableNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className={clsx("hover:text-primary premium-transition", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>
            <Search className="w-5 h-5" />
          </button>
          
          {placedOrders.length > 0 && (
            <button 
              onClick={() => setIsMyOrdersOpen(true)}
              className={clsx(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-full premium-transition", 
                isScrolled ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              )}
            >
              <Receipt className="w-4 h-4" />
              <span className="text-xs font-bold hidden md:inline-block">My Tab</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center rounded-full">
                {placedOrders.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          )}

          <button className={clsx("hover:text-primary premium-transition md:hidden", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
