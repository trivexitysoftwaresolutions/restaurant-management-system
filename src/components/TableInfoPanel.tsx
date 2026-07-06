"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, User, Clock } from "lucide-react";
import { restaurantData } from "@/lib/data";
import { useCustomer } from "@/context/CustomerContext";

export function TableInfoPanel() {
  const { customer } = useCustomer();

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#1A1A1A] text-white p-6 rounded-3xl border border-[#333] premium-shadow"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-cormorant text-2xl font-bold text-white">Your Session</h3>
            <p className="text-sm text-[#A3A3A3]">Active Digital Ordering Session</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[#A3A3A3]" />
              <span className="text-sm font-medium text-white">{customer?.name || "Guest"}</span>
            </div>
            <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">Diner</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#A3A3A3]" />
              <span className="text-sm font-medium text-white">Session Time</span>
            </div>
            <span className="text-sm font-medium text-white">45 mins</span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#333] bg-[#222]">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Contactless & Hygienic</h3>
            <p className="text-sm text-[#A3A3A3]">Your order goes straight to the kitchen. Collect your food when your token is ready.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
