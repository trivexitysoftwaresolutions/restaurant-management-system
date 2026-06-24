"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function OrderSuccessToast() {
  const { showSuccessToast, setShowSuccessToast } = useCart();

  return (
    <AnimatePresence>
      {showSuccessToast && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
          {/* Subtle backdrop that doesn't block clicks outside the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto"
            onClick={() => setShowSuccessToast(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-[#1A1A1A] border border-[#333] shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-3xl p-8 max-w-sm w-full text-center pointer-events-auto overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
            
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
              <CheckCircle2 className="w-10 h-10 text-primary relative z-10" />
            </div>

            <h2 className="font-cormorant text-3xl font-bold text-white mb-2">Order Received</h2>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              Thank you for ordering. Our kitchen is currently preparing your items. Please wait a few moments.
            </p>

            <div className="flex items-center justify-center gap-2 text-primary font-medium bg-primary/5 py-3 rounded-xl border border-primary/10">
              <Clock className="w-4 h-4" />
              <span>Preparing your food...</span>
            </div>
            
            <button
              onClick={() => setShowSuccessToast(false)}
              className="mt-6 w-full text-[#A3A3A3] text-sm hover:text-white transition-colors"
            >
              Dismiss
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
