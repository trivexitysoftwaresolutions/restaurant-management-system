"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Flame, Leaf, Star, Clock } from "lucide-react";
import { menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export function DishModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { cart, addToCart, updateQuantity } = useCart();
  
  const dishId = searchParams.get("dishId");
  const dish = menuItems.find((item) => item.id === dishId);

  // Close modal by removing query param
  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("dishId");
    const query = newParams.toString() ? `?${newParams.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dishId) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dishId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (dishId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [dishId]);

  if (!dishId) return null;

  const cartItem = cart.find((c) => c.menuItem.id === dishId);
  const quantity = cartItem?.quantity || 0;

  // Mock details for the modal that we previously had in page
  const calories = Math.floor(Math.random() * 400) + 200;

  return (
    <AnimatePresence>
      {dish && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="relative w-full h-64 shrink-0 bg-[#0a0a0a]">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              
              {dish.isSignature && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-1 rounded-sm shadow-lg">
                  Signature
                </div>
              )}
            </div>

            {/* Content Section (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 custom-scrollbar">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    {dish.isVeg ? (
                      <div className="w-4 h-4 rounded-sm border border-green-500 flex items-center justify-center bg-green-500/10">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-sm border border-red-500 flex items-center justify-center bg-red-500/10">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    )}
                    {dish.isSpicy && (
                      <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Spicy
                      </span>
                    )}
                  </div>
                  <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {dish.name}
                  </h2>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-2xl font-bold text-primary">₹{dish.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#A3A3A3] mb-6">
                {dish.rating && (
                  <div className="flex items-center gap-1 bg-[#1A1A1A] px-2 py-1 rounded-md border border-white/5">
                    <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                    <span className="text-white">{dish.rating}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{dish.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span>{calories} kcal</span>
                </div>
              </div>

              <div className="w-full h-px bg-white/5 mb-6" />

              <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed font-light mb-8">
                {dish.description}
              </p>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 sm:p-5 bg-[#161616] border-t border-white/5 flex items-center justify-between shrink-0">
              <div className="flex flex-col">
                <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-0.5">Total</span>
                <span className="text-xl font-bold text-white">
                  ₹{(dish.price * (quantity > 0 ? quantity : 1)).toFixed(2)}
                </span>
              </div>
              
              <div className="h-12">
                {quantity > 0 ? (
                  <div className="h-full bg-primary rounded-xl flex items-center p-1.5 gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <button
                      onClick={() => updateQuantity(dish.id, -1)}
                      className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center text-primary-foreground hover:bg-black/30 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold text-primary-foreground min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(dish.id, 1)}
                      className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center text-primary-foreground hover:bg-black/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(dish)}
                    className="h-full bg-primary text-primary-foreground font-bold px-8 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
                  >
                    Add to Order
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
