"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";

export function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, totalPrice, totalItems, placeOrder } = useCart();
  const { isRegistered, setIsModalOpen } = useCustomer();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#111] border-l border-[#222] shadow-2xl z-[110] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#222]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-cormorant text-2xl font-bold text-white">Your Order</h2>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#A3A3A3] space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-medium text-lg text-center">Your order is empty</p>
                  <p className="text-sm text-center opacity-70">Add some delicious items from our menu.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A]">
                    <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                      <Image
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-white text-sm line-clamp-2 pr-4">{item.menuItem.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-[#A3A3A3] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-primary">₹{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        
                        <div className="flex items-center gap-3 bg-[#222] rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.menuItem.id, -1)}
                            className="w-6 h-6 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.menuItem.id, 1)}
                            className="w-6 h-6 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#1A1A1A] border-t border-[#222]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-[#A3A3A3]">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#A3A3A3]">
                    <span>Taxes (8%)</span>
                    <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white pt-3 border-t border-[#333]">
                    <span>Total</span>
                    <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 premium-transition shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  onClick={() => {
                    if (!isRegistered) {
                      setIsModalOpen(true);
                      setIsDrawerOpen(false); // Optionally close cart drawer while onboarding
                    } else {
                      placeOrder();
                    }
                  }}
                >
                  Place Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
