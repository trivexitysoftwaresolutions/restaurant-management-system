"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function StickyCartBar() {
  const { totalItems, totalPrice, setIsDrawerOpen, cart } = useCart();

  return (
    <AnimatePresence>
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-80 z-50"
        >
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-full bg-primary text-primary-foreground rounded-2xl p-4 flex items-center justify-between shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold leading-none">View Order</span>
                <span className="text-xs opacity-90 mt-1 font-medium">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-bold bg-black/10 px-3 py-1.5 rounded-full">
              Checkout
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
