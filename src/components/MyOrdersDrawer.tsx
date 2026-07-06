"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Receipt, Clock } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function MyOrdersDrawer() {
  const { placedOrders, isMyOrdersOpen, setIsMyOrdersOpen, removePlacedOrder, placedTotalItems, placedTotalPrice, orderToken } = useCart();

  return (
    <AnimatePresence>
      {isMyOrdersOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMyOrdersOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-full md:w-[450px] bg-[#111] border-r border-[#222] shadow-2xl z-[110] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#222]">
              <div className="flex items-center gap-3">
                <Receipt className="w-6 h-6 text-primary" />
                <h2 className="font-cormorant text-2xl font-bold text-white">
                  {orderToken ? `Order ${orderToken}` : "Running Tab"}
                </h2>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                  {placedTotalItems}
                </span>
              </div>
              <button 
                onClick={() => setIsMyOrdersOpen(false)}
                className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Placed Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {placedOrders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#A3A3A3] space-y-4">
                  <Clock className="w-16 h-16 opacity-20" />
                  <p className="font-medium text-lg text-center">No active orders</p>
                  <p className="text-sm text-center opacity-70">Items you order will appear here.</p>
                </div>
              ) : (
                placedOrders.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A]">
                    <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 opacity-80">
                      <Image
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-white text-sm line-clamp-2 pr-4">{item.menuItem.name}</h4>
                        <button 
                          onClick={() => removePlacedOrder(item.menuItem.id)}
                          className="text-red-400/80 hover:text-red-400 transition-colors bg-red-400/10 p-1.5 rounded-md"
                          title="Cancel Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-primary">₹{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#A3A3A3] uppercase tracking-wider font-semibold">Qty</span>
                          <span className="text-sm font-bold text-white">{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Total */}
            {placedOrders.length > 0 && (
              <div className="p-6 bg-[#1A1A1A] border-t border-[#222]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-[#A3A3A3]">
                    <span>Tab Subtotal</span>
                    <span>₹{placedTotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white pt-3 border-t border-[#333]">
                    <span>Running Total (inc. tax)</span>
                    <span className="text-primary">₹{(placedTotalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full bg-[#222] text-[#A3A3A3] py-4 rounded-2xl font-bold text-sm text-center">
                  Kitchen is preparing your order
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
