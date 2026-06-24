"use client";

import { motion } from "framer-motion";
import { Check, ChefHat, CheckCircle2, UtensilsCrossed } from "lucide-react";
import { restaurantData } from "@/lib/data";

import { useCart } from "@/context/CartContext";

export function OrderStatusTracker() {
  const { placedOrders, placedTotalPrice, setIsMyOrdersOpen } = useCart();

  const states = [
    { id: "received", label: "Received", icon: Check },
    { id: "preparing", label: "Preparing", icon: ChefHat },
    { id: "ready", label: "Ready", icon: CheckCircle2 },
    { id: "served", label: "Served", icon: UtensilsCrossed },
  ];

  const currentStateIndex = states.findIndex((s) => s.id === restaurantData.currentOrderState);

  // If they have placed orders, we show the real tracker, else we hide or show empty state
  if (placedOrders.length === 0) return null;

  return (
    <section className="w-full">
      <div 
        onClick={() => setIsMyOrdersOpen(true)}
        className="bg-[#1A1A1A] text-white p-6 rounded-3xl border border-[#333] premium-shadow cursor-pointer hover:bg-[#222] premium-transition"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-cormorant text-2xl font-bold text-white mb-1">Kitchen Tab</h3>
            <p className="text-sm text-primary font-bold">Total: ${(placedTotalPrice * 1.08).toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#A3A3A3] mb-1">Items</p>
            <span className="text-sm font-semibold text-white">{placedOrders.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
        </div>

        <div className="relative">
          {/* Background Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#333] -translate-y-1/2 rounded-full" />

          {/* Active Track */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(currentStateIndex / (states.length - 1)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full"
          />

          <div className="relative flex justify-between">
            {states.map((state, index) => {
              const isCompleted = index <= currentStateIndex;
              const isCurrent = index === currentStateIndex;

              return (
                <div key={state.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, type: "spring" }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-card relative z-10 premium-transition ${isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-110" : ""}`}
                  >
                    <state.icon className="w-4 h-4" />
                  </motion.div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold mt-3 ${isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                  >
                    {state.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
