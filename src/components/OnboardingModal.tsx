"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, ChevronRight, Lock, X } from "lucide-react";
import { useCustomer } from "@/context/CustomerContext";
import { useCart } from "@/context/CartContext";
import { restaurantData } from "@/lib/data";

export function OnboardingModal() {
  const { isModalOpen, setIsModalOpen, setCustomer } = useCustomer();
  const { placeOrder } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and WhatsApp number are required.");
      return;
    }
    
    // In a real app, this might make an API call to start the session
    setCustomer({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      sessionEndTime: Date.now() + 30 * 1000, // Set to 30 seconds for immediate testing
    });
    setIsModalOpen(false);
    placeOrder();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Deep blur backdrop to lock out the site */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#1A1A1A] border border-[#333] rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Premium top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

            <div className="text-center mb-8 mt-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-cormorant text-3xl font-bold text-white mb-2">Welcome to {restaurantData.name}</h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                To provide a seamless dining experience, please enter your details. We'll send your digital bill and order updates directly to your WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[#A3A3A3]" />
                </div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-[#444] text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#666]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-[#A3A3A3]" />
                </div>
                <input
                  type="tel"
                  placeholder="WhatsApp Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-[#444] text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#666]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[#A3A3A3]" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#2A2A2A] border border-[#444] text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#666]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
              >
                <span>Confirm Details & Place Order</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
            
            <p className="text-[10px] text-center text-[#666] mt-6">
              Your data is secure and used exclusively for your dining session at {restaurantData.name}.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
