"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, Plus } from "lucide-react";
import { useCustomer } from "@/context/CustomerContext";

export function SessionManager() {
  const { customer, isRegistered, extendSession, clearSession } = useCustomer();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isRegistered || !customer) return;

    const checkTime = () => {
      const now = Date.now();
      const timeRemaining = customer.sessionEndTime - now;

      // If time is up, clear session completely
      if (timeRemaining <= 0) {
        clearSession();
        setShowWarning(false);
        return;
      }

      // If less than 10 seconds remaining (for testing), show warning
      if (timeRemaining <= 10 * 1000) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Check every second
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [customer, isRegistered, clearSession]);

  const handleExtend = (minutes: number) => {
    extendSession(minutes);
    setShowWarning(false);
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-[#1A1A1A] border border-[#333] rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50 animate-pulse" />
            
            <div className="text-center mb-6 mt-2">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <h2 className="font-cormorant text-2xl font-bold text-white mb-2">Session Expiring Soon</h2>
              <p className="text-sm text-[#A3A3A3]">
                Hi {customer?.name.split(" ")[0]}, your table session is about to end. Are you finished with your meal, or would you like to extend your time?
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleExtend(15)}
                className="w-full bg-[#2A2A2A] border border-[#444] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span>Extend by 15 mins</span>
              </button>
              
              <button
                onClick={() => handleExtend(30)}
                className="w-full bg-[#2A2A2A] border border-[#444] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span>Extend by 30 mins</span>
              </button>

              <button
                onClick={() => clearSession()}
                className="w-full mt-2 bg-transparent text-[#A3A3A3] py-3 rounded-xl font-medium hover:text-white transition-colors"
              >
                Yes, I'm finished
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
