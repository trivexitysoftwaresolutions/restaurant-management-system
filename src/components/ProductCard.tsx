"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, Flame, Leaf } from "lucide-react";
import { MenuItem } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  item: MenuItem;
  index: number;
}

export function ProductCard({ item, index }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find((c) => c.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl overflow-hidden flex gap-4 p-3 hover:bg-white/5 premium-transition group h-full"
    >
      <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover object-center group-hover:scale-105 premium-transition"
        />
        {item.isSignature && (
          <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm shadow-md">
            Signature
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 py-1">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1.5">
            {item.isVeg ? (
              <Leaf className="w-3 h-3 text-green-500" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-sm border border-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
            )}
            <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-1">
              {item.name}
            </h3>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">${item.price.toFixed(2)}</span>
            {item.isSpicy && (
              <Flame className="w-3 h-3 text-orange-500" />
            )}
          </div>

          <div className="h-8">
            {quantity > 0 ? (
              <div className="h-full bg-primary rounded-full flex items-center justify-between px-1 min-w-[72px] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-primary-foreground hover:bg-black/40 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-bold text-primary-foreground px-1">{quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-primary-foreground hover:bg-black/40 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground premium-transition active:scale-95 shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
